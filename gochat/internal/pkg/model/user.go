package model

import (
	"github.com/kamva/mgm/v3"
)

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string `json:"name" binding:"required"`
	Photo            string `json:"photo" binding:"required"`
	Type             string `json:"type" binding:"required"`
	Email            string `json:"email" binding:"required"`
	Online           string `json:"online" binding:"required"`
}

type Doctors struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Photo      string `json:"photo"`
	Type       string `json:"type"`
	Email      string `json:"email"`
	Online     string `json:"online"`
	Specialist string `json:"specialist"`
	Price      string `json:"price"`
}
