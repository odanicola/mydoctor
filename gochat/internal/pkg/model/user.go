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
