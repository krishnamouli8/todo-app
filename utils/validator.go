package utils

import (
	"errors"
	"regexp"
	"strings"
)

var (
	// Email regex pattern
	emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

	// Password must contain at least one uppercase, one lowercase, one number
	uppercaseRegex = regexp.MustCompile(`[A-Z]`)
	lowercaseRegex = regexp.MustCompile(`[a-z]`)
	numberRegex    = regexp.MustCompile(`[0-9]`)
)

// ValidateEmail validates email format
func ValidateEmail(email string) error {
	if email == "" {
		return errors.New("email is required")
	}

	email = strings.TrimSpace(email)

	if len(email) > 254 {
		return errors.New("email is too long")
	}

	if !emailRegex.MatchString(email) {
		return errors.New("invalid email format")
	}

	return nil
}

// ValidatePassword validates password strength
func ValidatePassword(password string) error {
	if password == "" {
		return errors.New("password is required")
	}

	if len(password) < 8 {
		return errors.New("password must be at least 8 characters long")
	}

	if len(password) > 128 {
		return errors.New("password is too long (max 128 characters)")
	}

	if !uppercaseRegex.MatchString(password) {
		return errors.New("password must contain at least one uppercase letter")
	}

	if !lowercaseRegex.MatchString(password) {
		return errors.New("password must contain at least one lowercase letter")
	}

	if !numberRegex.MatchString(password) {
		return errors.New("password must contain at least one number")
	}

	return nil
}

// ValidateName validates user's full name
func ValidateName(name string) error {
	if name == "" {
		return errors.New("name is required")
	}

	name = strings.TrimSpace(name)

	if len(name) < 2 {
		return errors.New("name must be at least 2 characters long")
	}

	if len(name) > 50 {
		return errors.New("name is too long (max 50 characters)")
	}

	return nil
}
