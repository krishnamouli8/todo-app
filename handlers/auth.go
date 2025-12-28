package handlers

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/krishnamouli8/todo-app/middleware"
	"github.com/krishnamouli8/todo-app/models"
	"github.com/krishnamouli8/todo-app/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection

func InitAuthHandlers(collection *mongo.Collection) {
	userCollection = collection

	// Create indexes for better performance
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create unique index on email
	indexModel := mongo.IndexModel{
		Keys:    bson.D{{Key: "email", Value: 1}},
		Options: options.Index().SetUnique(true),
	}

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		utils.LogWarning("InitAuthHandlers", "Failed to create email index: "+err.Error())
	}
}

func Signup(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		utils.LogError("Signup", "Failed to parse request body", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate full name
	if err := utils.ValidateName(user.FullName); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Validate email
	if err := utils.ValidateEmail(user.Email); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Validate password
	if err := utils.ValidatePassword(user.Password); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Check if user already exists
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	var existingUser models.User
	err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)
	if err == nil {
		utils.LogAuthEvent("SIGNUP_FAILED", user.Email, "User already exists")
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.LogError("Signup", "Failed to hash password", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error creating user",
		})
	}
	user.Password = string(hashedPassword)

	// Set timestamps and defaults
	now := time.Now()
	user.CreatedAt = now
	user.UpdatedAt = now
	user.IsActive = true
	user.FailedLoginAttempts = 0

	// Insert user
	result, err := userCollection.InsertOne(ctx, user)
	if err != nil {
		utils.LogError("Signup", "Failed to insert user", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error creating user",
		})
	}

	// Get the inserted ID
	userID := result.InsertedID.(primitive.ObjectID)

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID.Hex(),
		"email":   user.Email,
		"iat":     now.Unix(),
		"exp":     now.Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		utils.LogError("Signup", "Failed to generate token", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error generating token",
		})
	}

	utils.LogAuthEvent("SIGNUP_SUCCESS", user.Email, "User created successfully")

	return c.Status(fiber.StatusCreated).JSON(models.AuthResponse{
		Token:    tokenString,
		FullName: user.FullName,
		Message:  "User created successfully",
	})
}

func Login(c *fiber.Ctx) error {
	var loginUser models.LoginUser
	if err := c.BodyParser(&loginUser); err != nil {
		utils.LogError("Login", "Failed to parse request body", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate email
	if err := utils.ValidateEmail(loginUser.Email); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Validate password is not empty
	if loginUser.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Password is required",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	var user models.User
	err := userCollection.FindOne(ctx, bson.M{"email": loginUser.Email}).Decode(&user)
	if err != nil {
		utils.LogAuthEvent("LOGIN_FAILED", loginUser.Email, "User not found")
		// Don't reveal whether the user exists or not
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Check if account is locked
	if user.IsLocked() {
		utils.LogAuthEvent("LOGIN_BLOCKED", loginUser.Email, "Account is locked")
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "Account is locked due to multiple failed login attempts. Please try again later.",
		})
	}

	// Verify password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginUser.Password))
	if err != nil {
		// Track failed login attempt
		attempts, locked := middleware.TrackFailedLogin(loginUser.Email)

		// Update user's failed attempts in database
		user.IncrementFailedAttempts()
		update := bson.M{
			"$set": bson.M{
				"failed_login_attempts": user.FailedLoginAttempts,
				"locked_until":          user.LockedUntil,
			},
		}
		userCollection.UpdateOne(ctx, bson.M{"_id": user.ID}, update)

		utils.LogAuthEvent("LOGIN_FAILED", loginUser.Email, fmt.Sprintf("Invalid password (attempt %d)", attempts))

		if locked {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"error": "Too many failed login attempts. Account is locked for 15 minutes.",
			})
		}

		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Reset failed login attempts on successful login
	middleware.ResetFailedLogin(loginUser.Email)
	user.ResetFailedAttempts()

	// Update last login time
	now := time.Now()
	user.LastLoginAt = &now
	user.UpdatedAt = now

	update := bson.M{
		"$set": bson.M{
			"last_login_at":         user.LastLoginAt,
			"updated_at":            user.UpdatedAt,
			"failed_login_attempts": 0,
			"locked_until":          nil,
		},
	}
	_, err = userCollection.UpdateOne(ctx, bson.M{"_id": user.ID}, update)
	if err != nil {
		utils.LogWarning("Login", "Failed to update last login time: "+err.Error())
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID.Hex(),
		"email":   user.Email,
		"iat":     now.Unix(),
		"exp":     now.Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		utils.LogError("Login", "Failed to generate token", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error generating token",
		})
	}

	utils.LogAuthEvent("LOGIN_SUCCESS", user.Email, "Login successful")

	return c.JSON(models.AuthResponse{
		Token:    tokenString,
		FullName: user.FullName,
	})
}

func Logout(c *fiber.Ctx) error {
	// In JWT, logout is typically handled client-side by removing the token
	// We could implement token blacklisting here in the future
	utils.LogInfo("Logout", "User logged out")
	return c.JSON(fiber.Map{
		"message": "Logged out successfully",
	})
}
