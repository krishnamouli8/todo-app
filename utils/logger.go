package utils

import (
	"fmt"
	"log"
	"time"
)

// LogRequest logs incoming requests
func LogRequest(method, path, userID string) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	if userID != "" {
		log.Printf("[%s] REQUEST: %s %s | User: %s\n", timestamp, method, path, userID)
	} else {
		log.Printf("[%s] REQUEST: %s %s\n", timestamp, method, path)
	}
}

// LogError logs errors with context
func LogError(context, message string, err error) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	if err != nil {
		log.Printf("[%s] ERROR [%s]: %s - %v\n", timestamp, context, message, err)
	} else {
		log.Printf("[%s] ERROR [%s]: %s\n", timestamp, context, message)
	}
}

// LogAuthEvent logs authentication-related events
func LogAuthEvent(event, email, details string) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	log.Printf("[%s] AUTH [%s]: %s | %s\n", timestamp, event, email, details)
}

// LogInfo logs general information
func LogInfo(context, message string) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	log.Printf("[%s] INFO [%s]: %s\n", timestamp, context, message)
}

// LogWarning logs warnings
func LogWarning(context, message string) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	log.Printf("[%s] WARNING [%s]: %s\n", timestamp, context, message)
}

// Custom error formatter
func FormatError(context string, err error) string {
	return fmt.Sprintf("[%s] %v", context, err)
}
