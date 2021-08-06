package model

import (
	"github.com/kamva/mgm/v3"
)

type Room struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string   `json:"name" binding:"required"`
	Description      string   `json:"description" binding:"required"`
	Users            []string `json:"users" binding:"required"`
}

type GetRoomById struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Users       []string   `json:"users"`
	Messages    []Messages `json:"messages"`
}
