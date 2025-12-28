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
	"github.com/krishnamouli8/todo-app/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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
	todoCollection := database.Collection("todos")

	handlers.InitAuthHandlers(userCollection)
	handlers.InitTodoHandlers(todoCollection)

	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}

			// Log the error server-side
			utils.LogError("ErrorHandler", fmt.Sprintf("Path: %s", ctx.Path()), err)

			return ctx.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5174,https://taskmasterrr.vercel.app",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		AllowCredentials: false,
	}))

	// Add request size validation middleware
	app.Use(middleware.ValidateRequestSize())

	// Authentication routes with rate limiting
	app.Post("/api/signup", middleware.RateLimitAuth(), handlers.Signup)
	app.Post("/api/login", middleware.RateLimitAuth(), handlers.Login)

	// Protected routes
	app.Use("/api/todos", middleware.JWTMiddleware())

	app.Get("/api/todos", handlers.GetTodos)
	app.Post("/api/todos", handlers.CreateTodo)
	app.Patch("/api/todos/:id", handlers.UpdateTodo)
	app.Patch("/api/todos/:id/important", handlers.ToggleImportant)
	app.Delete("/api/todos/:id", handlers.DeleteTodo)

	// Logout route (protected)
	app.Post("/api/logout", middleware.JWTMiddleware(), handlers.Logout)

	// Health check
	app.Get("/api/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}

	fmt.Printf("Server starting on port %s...\\n", PORT)
	utils.LogInfo("Server", fmt.Sprintf("Starting server on port %s", PORT))
	log.Fatal(app.Listen(":" + PORT))
}
