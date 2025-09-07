// package handlers

// import (
// 	"context"
// 	"os"
// 	"time"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/golang-jwt/jwt/v5"
// 	"go.mongodb.org/mongo-driver/bson"
// 	"go.mongodb.org/mongo-driver/mongo"
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// 	"golang.org/x/crypto/bcrypt"
// 	"github.com/krishnamouli8/todo-app/models"
// )

// var userCollection *mongo.Collection

// func InitAuthHandlers(collection *mongo.Collection) {
// 	userCollection = collection
// }

// func Signup(c *fiber.Ctx) error {
// 	var user models.User
// 	if err := c.BodyParser(&user); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"error": "Cannot parse JSON",
// 		})
// 	}

// 	// Check if user already exists
// 	existingUser := userCollection.FindOne(context.Background(), bson.M{"email": user.Email})
// 	if existingUser.Err() == nil {
// 		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
// 			"error": "User already exists",
// 		})
// 	}

// 	// Hash password
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": "Error hashing password",
// 		})
// 	}
// 	user.Password = string(hashedPassword)

//        // Insert user
//        insertResult, err := userCollection.InsertOne(context.Background(), user)
//        if err != nil {
// 	       return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 		       "error": "Error creating user",
// 	       })
//        }

//        user.ID = insertResult.InsertedID.(primitive.ObjectID)

//        token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 	       "user_id": user.ID,
// 	       "email":   user.Email,
// 	       "exp":     time.Now().Add(time.Hour * 24).Unix(),
//        })
//        tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
//        if err != nil {
// 	       return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 		       "error": "Error generating token",
// 	       })
//        }

//        return c.Status(fiber.StatusCreated).JSON(fiber.Map{
// 	       "token":     tokenString,
// 	       "full_name": user.FullName,
// 	       "_id":      user.ID.Hex(),
//        })
// }

// func Login(c *fiber.Ctx) error {
// 	var loginUser models.LoginUser
// 	if err := c.BodyParser(&loginUser); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"error": "Cannot parse JSON",
// 		})
// 	}

// 	var user models.User
// 	err := userCollection.FindOne(context.Background(), bson.M{"email": loginUser.Email}).Decode(&user)
// 	if err != nil {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"error": "Invalid credentials",
// 		})
// 	}

// 	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginUser.Password))
// 	if err != nil {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"error": "Invalid credentials",
// 		})
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"user_id": user.ID,
// 		"email":   user.Email,
// 		"exp":     time.Now().Add(time.Hour * 24).Unix(),
// 	})

// 	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": "Error generating token",
// 		})
// 	}

//        return c.JSON(fiber.Map{
// 	       "token":     tokenString,
// 	       "full_name": user.FullName,
// 	       "_id":      user.ID.Hex(),
//        })
// }

// func Logout(c *fiber.Ctx) error {
// 	// In JWT, logout is typically handled client-side by removing the token
// 	return c.JSON(fiber.Map{
// 		"message": "Logged out successfully",
// 	})
// }


























package handlers

import (
	"context"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"github.com/krishnamouli8/todo-app/models"
)

var userCollection *mongo.Collection

func InitAuthHandlers(collection *mongo.Collection) {
	userCollection = collection
}

func Signup(c *fiber.Ctx) error {
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate required fields
	if user.FullName == "" || user.Email == "" || user.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Full name, email and password are required",
		})
	}

	// Check if user already exists
	var existingUser models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&existingUser)
	if err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error hashing password",
		})
	}
	user.Password = string(hashedPassword)

	// Insert user
	result, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error creating user",
		})
	}

	// Generate JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": result.InsertedID,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error generating token",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"token":     tokenString,
		"full_name": user.FullName,
		"message":   "User created successfully",
	})
}

func Login(c *fiber.Ctx) error {
	var loginUser models.LoginUser
	if err := c.BodyParser(&loginUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate required fields
	if loginUser.Email == "" || loginUser.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Email and password are required",
		})
	}

	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": loginUser.Email}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginUser.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID.Hex(),
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error generating token",
		})
	}

	return c.JSON(fiber.Map{
		"token":     tokenString,
		"full_name": user.FullName,
	})
}

func Logout(c *fiber.Ctx) error {
	// In JWT, logout is typically handled client-side by removing the token
	return c.JSON(fiber.Map{
		"message": "Logged out successfully",
	})
}