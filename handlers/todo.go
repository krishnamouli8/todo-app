package handlers

import (
	"go.mongodb.org/mongo-driver/mongo"
)

var todoCollection *mongo.Collection

func InitTodoHandlers(collection *mongo.Collection) {
	todoCollection = collection
}
