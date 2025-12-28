package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                  primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FullName            string             `json:"full_name" bson:"full_name" validate:"required,min=2,max=50"`
	Email               string             `json:"email" bson:"email" validate:"required,email"`
	Password            string             `json:"password,omitempty" bson:"password" validate:"required,min=8"`
	CreatedAt           time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt           time.Time          `json:"updated_at" bson:"updated_at"`
	LastLoginAt         *time.Time         `json:"last_login_at,omitempty" bson:"last_login_at,omitempty"`
	FailedLoginAttempts int                `json:"-" bson:"failed_login_attempts"`
	LockedUntil         *time.Time         `json:"-" bson:"locked_until,omitempty"`
	IsActive            bool               `json:"is_active" bson:"is_active"`
}

// IsLocked checks if the user account is currently locked
func (u *User) IsLocked() bool {
	if u.LockedUntil == nil {
		return false
	}
	return time.Now().Before(*u.LockedUntil)
}

// IncrementFailedAttempts increments failed login attempts and locks if necessary
func (u *User) IncrementFailedAttempts() {
	u.FailedLoginAttempts++
	if u.FailedLoginAttempts >= 5 {
		lockUntil := time.Now().Add(15 * time.Minute)
		u.LockedUntil = &lockUntil
	}
}

// ResetFailedAttempts resets failed login attempts and unlocks the account
func (u *User) ResetFailedAttempts() {
	u.FailedLoginAttempts = 0
	u.LockedUntil = nil
}

type LoginUser struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}
