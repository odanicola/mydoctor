package controllers

import (
	"log"
	"net/http"

	"go/chat/internal/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateRoom(c *gin.Context) {
	json := model.Room{}
	err := c.ShouldBindJSON(&json)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	room := &model.Room{}
	coll := mgm.Coll(room)
	room.Name = json.Name
	room.Description = json.Description
	room.Users = json.Users

	err = coll.Create(room)

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, room)
}

func GetRoomById(c *gin.Context) {
	room_id := c.Param("id")
	log.Println(room_id)

	room := model.Room{}
	coll := mgm.Coll(&room)
	err := coll.FindByID(room_id, &room)

	if err != nil {
		log.Println(err.Error())
		return
	}

	messages := []model.Messages{}
	msgColl := mgm.Coll(&model.Messages{})
	msgErr := msgColl.SimpleFind(&messages, bson.M{"roomid": room_id})

	if msgErr != nil {
		log.Println(msgErr.Error())
		return
	}
	log.Println(messages)

	c.JSON(http.StatusOK, model.GetRoomById{ID: room.ID.Hex(), Name: room.Name, Description: room.Description, Users: room.Users, Messages: messages})
}
