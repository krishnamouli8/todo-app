package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"github.com/krishnamouli8/todo-app/handlers"
	"github.com/krishnamouli8/todo-app/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserID    primitive.ObjectID `json:"user_id,omitempty" bson:"user_id,omitempty"`
	Completed bool               `json:"completed"`
	Important bool               `json:"important"`
	Body      string             `json:"body"`
}

var todoCollection *mongo.Collection

// Helper function to extract user ID from JWT token
func getUserIDFromToken(c *fiber.Ctx) (primitive.ObjectID, error) {
	// Get the token from the context
	token := c.Locals("user").(*jwt.Token)
	
	// Extract claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userIDStr, ok := claims["user_id"].(string); ok {
			return primitive.ObjectIDFromHex(userIDStr)
		}
	}
	
	return primitive.ObjectID{}, fmt.Errorf("invalid token claims")
}

func main() {
	fmt.Println("Starting Todo App...")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error in loading the env file.", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	if MONGODB_URI == "" {
		log.Fatal("MONGODB_URI is not set")
	}

	JWT_SECRET := os.Getenv("JWT_SECRET")
	if JWT_SECRET == "" {
		log.Fatal("JWT_SECRET is not set")
	}

	clientoptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientoptions)

	if err != nil {
		log.Fatal("Failed to connect to MongoDB: ", err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")

	database := client.Database("todos")

	userCollection := database.Collection("users")
	todoCollection = database.Collection("todos")

	handlers.InitAuthHandlers(userCollection)
	handlers.InitTodoHandlers(todoCollection)

	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return ctx.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173,https://taskmasterrr.vercel.app",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		AllowCredentials: false,
	}))

	// Authentication routes
	app.Post("/api/signup", handlers.Signup)
	app.Post("/api/login", handlers.Login)
	
	// Protected routes
	app.Use("/api/todos", middleware.JWTMiddleware())

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Patch("/api/todos/:id/important", toggleImportant)
	app.Delete("/api/todos/:id", deleteTodo)

	// Logout route
	app.Post("/api/logout", handlers.Logout)

	// Health check
	app.Get("/api/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}

	fmt.Printf("Server starting on port %s...\n", PORT)
	log.Fatal(app.Listen(":" + PORT))
}

func getTodos(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var todos []Todo
	filter := bson.M{"user_id": userID}
	cursor, err := todoCollection.Find(context.Background(), filter)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to decode todo"})
		}

		todos = append(todos, todo)
	}

	// Return empty array if no todos found
	if todos == nil {
		todos = []Todo{}
	}

	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
	}

	// Set the user ID for the todo
	todo.UserID = userID

	insertResult, err := todoCollection.InsertOne(context.Background(), todo)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create todo"})
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

func updateTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	type UpdateRequest struct {
		Completed bool `json:"completed"`
	}

	var req UpdateRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Only update todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}
	update := bson.M{"$set": bson.M{"completed": req.Completed}}

	result, err := todoCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo updated successfully"})
}

func toggleImportant(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	type UpdateRequest struct {
		Important bool `json:"important"`
	}

	var req UpdateRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Only update todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}
	update := bson.M{"$set": bson.M{"important": req.Important}}

	result, err := todoCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update todo importance"})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo importance updated successfully"})
}

func deleteTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	// Only delete todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}

	result, err := todoCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete todo"})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
}