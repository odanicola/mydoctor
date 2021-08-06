package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type StructID struct {
	ID primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
}
