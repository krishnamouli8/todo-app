package handlers

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/krishnamouli8/todo-app/models"
	"github.com/krishnamouli8/todo-app/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var todoCollection *mongo.Collection

func InitTodoHandlers(collection *mongo.Collection) {
	todoCollection = collection

	// Create indexes for better performance
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create index on user_id for faster queries
	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{Key: "user_id", Value: 1},
			{Key: "created_at", Value: -1},
		},
	}

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		utils.LogWarning("InitTodoHandlers", "Failed to create index: "+err.Error())
	}
}

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

func GetTodos(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("GetTodos", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	// Parse pagination parameters
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit, _ := strconv.Atoi(c.Query("limit", "50"))

	// Validate pagination parameters
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 50
	}

	skip := (page - 1) * limit

	// Build filter
	filter := bson.M{"user_id": userID}

	// Add completed filter if provided
	if completedStr := c.Query("completed"); completedStr != "" {
		if completed, err := strconv.ParseBool(completedStr); err == nil {
			filter["completed"] = completed
		}
	}

	// Add important filter if provided
	if importantStr := c.Query("important"); importantStr != "" {
		if important, err := strconv.ParseBool(importantStr); err == nil {
			filter["important"] = important
		}
	}

	// Add search filter if provided
	if search := c.Query("search"); search != "" {
		filter["body"] = bson.M{"$regex": search, "$options": "i"}
	}

	// Add category filter if provided
	if category := c.Query("category"); category != "" {
		filter["category"] = category
	}

	// Add filter for "My Day" (tasks created today or due today)
	if myDay := c.Query("myDay"); myDay == "true" {
		now := time.Now()
		startOfDay := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
		endOfDay := startOfDay.Add(24 * time.Hour)

		todayDateStr := startOfDay.Format("2006-01-02")

		filter["$or"] = []bson.M{
			{
				"created_at": bson.M{
					"$gte": startOfDay,
					"$lt":  endOfDay,
				},
			},
			{
				"due_date": todayDateStr,
			},
		}
	}

	// Add filter for "Planned" (tasks with due dates)
	if planned := c.Query("planned"); planned == "true" {
		filter["due_date"] = bson.M{"$ne": "", "$exists": true}
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Get total count
	total, err := todoCollection.CountDocuments(ctx, filter)
	if err != nil {
		utils.LogError("GetTodos", "Failed to count documents", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}

	// Find todos with pagination
	findOptions := options.Find()
	findOptions.SetLimit(int64(limit))
	findOptions.SetSkip(int64(skip))
	findOptions.SetSort(bson.D{{Key: "created_at", Value: -1}}) // Sort by created_at descending

	cursor, err := todoCollection.Find(ctx, filter, findOptions)
	if err != nil {
		utils.LogError("GetTodos", "Failed to find documents", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch todos"})
	}
	defer cursor.Close(ctx)

	var todos []models.Todo
	for cursor.Next(ctx) {
		var todo models.Todo
		if err := cursor.Decode(&todo); err != nil {
			utils.LogError("GetTodos", "Failed to decode todo", err)
			continue
		}
		todos = append(todos, todo)
	}

	// Return empty array if no todos found
	if todos == nil {
		todos = []models.Todo{}
	}

	// Check if pagination was requested
	if c.Query("page") != "" || c.Query("limit") != "" {
		return c.JSON(models.PaginatedResponse{
			Data:  todos,
			Page:  page,
			Limit: limit,
			Total: total,
		})
	}

	// Return simple array for backward compatibility
	return c.JSON(todos)
}

func CreateTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("CreateTodo", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	todo := new(models.Todo)

	if err := c.BodyParser(todo); err != nil {
		utils.LogError("CreateTodo", "Failed to parse request body", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
	}

	if len(todo.Body) > 500 {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body is too long (max 500 characters)"})
	}

	// Set the user ID and timestamps for the todo
	todo.UserID = userID
	now := time.Now()
	todo.CreatedAt = now
	todo.UpdatedAt = now

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	insertResult, err := todoCollection.InsertOne(ctx, todo)
	if err != nil {
		utils.LogError("CreateTodo", "Failed to insert todo", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create todo"})
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	utils.LogInfo("CreateTodo", fmt.Sprintf("Created todo for user %s", userID.Hex()))

	return c.Status(201).JSON(todo)
}

func UpdateTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("UpdateTodo", "Failed to get user ID from token", err)
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
		utils.LogError("UpdateTodo", "Failed to parse request body", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Build update document
	updateDoc := bson.M{
		"completed":  req.Completed,
		"updated_at": time.Now(),
	}

	// Set completed_at timestamp if completed
	if req.Completed {
		now := time.Now()
		updateDoc["completed_at"] = &now
	} else {
		updateDoc["completed_at"] = nil
	}

	// Only update todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}
	update := bson.M{"$set": updateDoc}

	result, err := todoCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		utils.LogError("UpdateTodo", "Failed to update todo", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update todo"})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo updated successfully"})
}

func ToggleImportant(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("ToggleImportant", "Failed to get user ID from token", err)
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
		utils.LogError("ToggleImportant", "Failed to parse request body", err)
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Only update todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}
	update := bson.M{"$set": bson.M{
		"important":  req.Important,
		"updated_at": time.Now(),
	}}

	result, err := todoCollection.UpdateOne(ctx, filter, update)
	if err != nil {
		utils.LogError("ToggleImportant", "Failed to update todo importance", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update todo importance"})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo importance updated successfully"})
}

func DeleteTodo(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("DeleteTodo", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Only delete todos that belong to the authenticated user
	filter := bson.M{"_id": objectID, "user_id": userID}

	result, err := todoCollection.DeleteOne(ctx, filter)
	if err != nil {
		utils.LogError("DeleteTodo", "Failed to delete todo", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete todo"})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Todo not found"})
	}

	utils.LogInfo("DeleteTodo", fmt.Sprintf("Deleted todo %s for user %s", id, userID.Hex()))

	return c.Status(200).JSON(fiber.Map{"message": "Todo deleted successfully"})
}

// ClearCompleted deletes all completed todos for a user
func ClearCompleted(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("ClearCompleted", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Delete all completed todos that belong to the authenticated user
	filter := bson.M{"user_id": userID, "completed": true}

	result, err := todoCollection.DeleteMany(ctx, filter)
	if err != nil {
		utils.LogError("ClearCompleted", "Failed to delete completed todos", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to clear completed todos"})
	}

	utils.LogInfo("ClearCompleted", fmt.Sprintf("Deleted %d completed todos for user %s", result.DeletedCount, userID.Hex()))

	return c.JSON(fiber.Map{
		"message": "Completed todos cleared successfully",
		"count":   result.DeletedCount,
	})
}

// GetDailyStats returns statistics for daily goal progress
func GetDailyStats(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("GetDailyStats", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	now := time.Now()
	startOfDay := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())
	endOfDay := startOfDay.Add(24 * time.Hour)

	// Filter for tasks created or due today
	filter := bson.M{
		"user_id": userID,
		"$or": []bson.M{
			{
				"created_at": bson.M{
					"$gte": startOfDay,
					"$lt":  endOfDay,
				},
			},
			{
				"due_date": bson.M{
					"$gte": startOfDay,
					"$lt":  endOfDay,
				},
			},
		},
	}

	// Get total tasks for today
	total, err := todoCollection.CountDocuments(ctx, filter)
	if err != nil {
		utils.LogError("GetDailyStats", "Failed to count total tasks", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stats"})
	}

	// Get completed tasks for today
	filter["completed"] = true
	completed, err := todoCollection.CountDocuments(ctx, filter)
	if err != nil {
		utils.LogError("GetDailyStats", "Failed to count completed tasks", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch stats"})
	}

	// Calculate percentage
	percentage := 0
	if total > 0 {
		percentage = int((float64(completed) / float64(total)) * 100)
	}

	return c.JSON(fiber.Map{
		"total":      total,
		"completed":  completed,
		"percentage": percentage,
	})
}

// GetAchievements returns user achievements
func GetAchievements(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("GetAchievements", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Count total completed tasks
	totalCompleted, err := todoCollection.CountDocuments(ctx, bson.M{
		"user_id":   userID,
		"completed": true,
	})
	if err != nil {
		utils.LogError("GetAchievements", "Failed to count completed tasks", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch achievements"})
	}

	// Calculate streak (consecutive days with at least one completed task)
	streak := 0
	currentDate := time.Now()

	for i := 0; i < 365; i++ { // Check up to a year
		startOfDay := time.Date(currentDate.Year(), currentDate.Month(), currentDate.Day(), 0, 0, 0, 0, currentDate.Location())
		endOfDay := startOfDay.Add(24 * time.Hour)

		count, err := todoCollection.CountDocuments(ctx, bson.M{
			"user_id":   userID,
			"completed": true,
			"completed_at": bson.M{
				"$gte": startOfDay,
				"$lt":  endOfDay,
			},
		})

		if err != nil || count == 0 {
			break
		}

		streak++
		currentDate = currentDate.Add(-24 * time.Hour)
	}

	achievements := []fiber.Map{
		{
			"id":          "task_master",
			"name":        "Task Master",
			"icon":        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcUkbqNmfwBqcxlccmR0sFJBrhlbkaYiJFtXSBEpz4VhX5mzGUazqS1WdevKPPXMQjMeebMkyzgtqt787X_RWYJRTe1-3_cDaXkpwUefFbBe1ENDnKe-053l3SBtIRL6J9zkhOjrZWhifZvicm5fvv5irCVrWP6lzCo6_ClQnh2oHJX8M1GBNKP8UVs4i2aXss0wsHat5iY8FjndGGZf7mbskjOwtcUV1o_cw_Kwl4LD5Vz42KiXwtbA_XdNh9MpjMzVgMubQ99Qc",
			"description": fmt.Sprintf("%d tasks done", totalCompleted),
			"unlocked":    totalCompleted >= 50,
			"progress":    totalCompleted,
			"goal":        50,
		},
		{
			"id":          "on_fire",
			"name":        "On Fire",
			"icon":        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbPDnj1hx4Y2GYAMtEp4Psx0lBnHzvcmU58_h-nNMd6AUX6vAKtjuoNn7ppFkmLwl3YzSdabnFcRRdd-NcOhIQLPkmRDeJs58BRkpMax4y8XoVBjiykMUPvJh0_z-ZEfakxnYhuIyLiDjhKlwvI5y__cIGVbQy6jc9IEYRvr-5D_yTm4QLhcVmzOK34mpxRBXEEOY1YOH5WhXTZUjzXU4v1YZemiz6slYHLQTTN071UfL2lWRLnZHPM31daluHwB0Ok8mFY3BPlkg",
			"description": fmt.Sprintf("%d day streak", streak),
			"unlocked":    streak >= 7,
			"progress":    streak,
			"goal":        7,
		},
	}

	return c.JSON(fiber.Map{
		"achievements":    achievements,
		"total_completed": totalCompleted,
		"current_streak":  streak,
	})
}

// GetCategoryStats returns task counts grouped by category
func GetCategoryStats(c *fiber.Ctx) error {
	userID, err := getUserIDFromToken(c)
	if err != nil {
		utils.LogError("GetCategoryStats", "Failed to get user ID from token", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Define default categories
	categories := []string{"Design Work", "Groceries", "Personal"}
	categoryCounts := make(map[string]int64)

	for _, category := range categories {
		count, err := todoCollection.CountDocuments(ctx, bson.M{
			"user_id":   userID,
			"category":  category,
			"completed": false, // Only count incomplete tasks
		})

		if err != nil {
			utils.LogError("GetCategoryStats", fmt.Sprintf("Failed to count category %s", category), err)
			continue
		}

		categoryCounts[category] = count
	}

	return c.JSON(fiber.Map{
		"categories": categoryCounts,
	})
}
