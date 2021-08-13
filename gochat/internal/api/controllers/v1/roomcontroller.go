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
	input := model.Room{}
	err := c.ShouldBindJSON(&input)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	room := &model.Room{}
	coll := mgm.Coll(room)

	err = coll.First(bson.M{"users": input.Users}, room)

	room.Name = input.Name
	room.Description = input.Description
	room.Users = input.Users
	room.Active = input.Active

	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			err = coll.Create(room)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		err = mgm.Coll(room).Update(room)
	}

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
