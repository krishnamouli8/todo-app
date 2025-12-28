package middleware

import (
	"github.com/gofiber/fiber/v2"
)

const (
	// MaxRequestBodySize is the maximum allowed request body size (1MB)
	MaxRequestBodySize = 1 * 1024 * 1024
)

// ValidateRequestSize validates request body size
func ValidateRequestSize() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if len(c.Body()) > MaxRequestBodySize {
			return c.Status(fiber.StatusRequestEntityTooLarge).JSON(fiber.Map{
				"error": "Request body too large. Maximum size is 1MB.",
			})
		}
		return c.Next()
	}
}
