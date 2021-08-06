package model

import (
	"github.com/kamva/mgm/v3"
)

type Messages struct {
	mgm.DefaultModel `bson:",inline"`
	RoomId           string `json:"room_id" binding:"required"`
	UserId           string `json:"user_id" binding:"required"`
	Message          string `json:"message" binding:"required"`
}
