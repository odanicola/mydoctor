package model

import (
	"github.com/kamva/mgm/v3"
)

type Messages struct {
	mgm.DefaultModel `bson:",inline"`
	TextID           string       `json:"_id" binding:"required"`
	Room             string       `json:"room" binding:"required"`
	User             MessagesUser `json:"user" binding:"required"`
	Text             string       `json:"text" binding:"required"`
}

type MessagesUser struct {
	ID   string `json:"_id" binding:"required"`
	Name string `json:"name" binding:"required"`
}
