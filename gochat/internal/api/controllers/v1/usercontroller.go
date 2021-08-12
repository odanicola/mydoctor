package controllers

import (
	"log"
	"net/http"

	"go/chat/internal/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateUser(c *gin.Context) {
	input := model.User{}
	err := c.ShouldBindJSON(&input)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := &model.User{}
	coll := mgm.Coll(user)
	err = coll.First(bson.M{"email": input.Email}, user)

	// user := &model.User{}
	user.Name = input.Name
	user.Photo = input.Photo
	user.Type = input.Type
	user.Email = input.Email
	user.Online = input.Online

	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			err = coll.Create(user)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		err = mgm.Coll(user).Update(user)
	}

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func CreateSpecialist(c *gin.Context) {
	input := model.Specialist{}
	err := c.ShouldBindJSON(&input)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	specialist := &model.Specialist{}
	coll := mgm.Coll(specialist)
	err = coll.First(bson.M{"doctorid": input.DoctorID}, specialist)

	specialist.DoctorID = input.DoctorID
	specialist.Name = input.Name
	specialist.Price = input.Price

	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			err = coll.Create(specialist)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		err = mgm.Coll(specialist).Update(specialist)
	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, specialist)
}

func GetSpecialistByDoctorId(c *gin.Context) {
	doctor_id := c.Query("doctor_id")
	log.Println("doctor_id", doctor_id)

	specialist := &model.Specialist{}
	coll := mgm.Coll(specialist)
	err := coll.First(bson.M{"doctorid": doctor_id}, specialist)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, specialist)
}

func GetDoctors(c *gin.Context) {
	user := []model.User{}
	coll := mgm.Coll(&model.User{})
	err := coll.SimpleFind(&user, bson.M{"online": "true", "type": "doctor"})

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}
