package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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
	Completed bool               `json:"completed"`
	Important bool               `json:"important"`
	Body      string             `json:"body"`
}

var todoCollection *mongo.Collection

func main() {
	fmt.Println("Starting Todo App...")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error in loading the env file.", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")

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

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		// AllowOrigins: "http://localhost:5173",
		AllowOrigins: "https://taskmasterrr.vercel.app/",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
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

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}

	log.Fatal(app.Listen(":" + PORT))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo
	cursor, err := todoCollection.Find(context.Background(), bson.M{})

	if err != nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}

		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).SendString("Body is required")
	}

	insertResult, err := todoCollection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"completed": true}}

	_, err = todoCollection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return c.JSON(fiber.Map{"message": "Todo updated successfully"})
}

func toggleImportant(c *fiber.Ctx) error {
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

    filter := bson.M{"_id": objectID}
    update := bson.M{"$set": bson.M{"important": req.Important}}

    _, err = todoCollection.UpdateOne(context.Background(), filter, update)

    if err != nil {
        return err
    }

    return c.JSON(fiber.Map{"message": "Todo importance updated successfully"})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	filter := bson.M{"_id": objectID}

	_, err = todoCollection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
}
