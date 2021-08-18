package model

import (
	"github.com/kamva/mgm/v3"
)

type Specialist struct {
	mgm.DefaultModel `bson:",inline"`
	DoctorID         string `json:"doctor_id" binding:"required"`
	Name             string `json:"name" binding:"required"`
	Price            string `json:"price" binding:"required"`
}
