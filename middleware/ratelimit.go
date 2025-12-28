package middleware

import (
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
)

type rateLimitEntry struct {
	count       int
	resetTime   time.Time
	lockedUntil time.Time
}

type rateLimiter struct {
	mu      sync.RWMutex
	entries map[string]*rateLimitEntry
}

var (
	authLimiter = &rateLimiter{
		entries: make(map[string]*rateLimitEntry),
	}
)

func init() {
	// Start cleanup goroutine to prevent memory leaks
	go cleanupRateLimitEntries()
}

// cleanupRateLimitEntries removes old entries every 30 minutes
func cleanupRateLimitEntries() {
	ticker := time.NewTicker(30 * time.Minute)
	defer ticker.Stop()

	for range ticker.C {
		authLimiter.mu.Lock()
		now := time.Now()
		for key, entry := range authLimiter.entries {
			// Remove entries older than 1 hour
			if now.Sub(entry.resetTime) > time.Hour {
				delete(authLimiter.entries, key)
			}
		}
		authLimiter.mu.Unlock()
	}
}

// RateLimitAuth limits authentication endpoints
// 5 requests per 15 minutes
func RateLimitAuth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Use IP address as the key
		key := c.IP()

		authLimiter.mu.Lock()
		defer authLimiter.mu.Unlock()

		now := time.Now()
		entry, exists := authLimiter.entries[key]

		if !exists {
			// First request from this IP
			authLimiter.entries[key] = &rateLimitEntry{
				count:     1,
				resetTime: now.Add(15 * time.Minute),
			}
			return c.Next()
		}

		// Check if locked
		if now.Before(entry.lockedUntil) {
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"error": "Too many requests. Please try again later.",
			})
		}

		// Check if reset time has passed
		if now.After(entry.resetTime) {
			entry.count = 1
			entry.resetTime = now.Add(15 * time.Minute)
			entry.lockedUntil = time.Time{} // Reset lock
			return c.Next()
		}

		// Increment count
		entry.count++

		// Check if limit exceeded
		if entry.count > 5 {
			entry.lockedUntil = now.Add(15 * time.Minute)
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"error": "Too many requests. Please try again in 15 minutes.",
			})
		}

		return c.Next()
	}
}

// TrackFailedLogin tracks failed login attempts per email
func TrackFailedLogin(email string) (int, bool) {
	authLimiter.mu.Lock()
	defer authLimiter.mu.Unlock()

	now := time.Now()
	entry, exists := authLimiter.entries["login:"+email]

	if !exists {
		authLimiter.entries["login:"+email] = &rateLimitEntry{
			count:     1,
			resetTime: now.Add(15 * time.Minute),
		}
		return 1, false
	}

	// Check if locked
	if now.Before(entry.lockedUntil) {
		return entry.count, true
	}

	// Check if reset time has passed
	if now.After(entry.resetTime) {
		entry.count = 1
		entry.resetTime = now.Add(15 * time.Minute)
		entry.lockedUntil = time.Time{}
		return 1, false
	}

	// Increment count
	entry.count++

	// Lock if exceeded 5 attempts
	if entry.count >= 5 {
		entry.lockedUntil = now.Add(15 * time.Minute)
		return entry.count, true
	}

	return entry.count, false
}

// ResetFailedLogin resets failed login attempts for an email
func ResetFailedLogin(email string) {
	authLimiter.mu.Lock()
	defer authLimiter.mu.Unlock()

	delete(authLimiter.entries, "login:"+email)
}
