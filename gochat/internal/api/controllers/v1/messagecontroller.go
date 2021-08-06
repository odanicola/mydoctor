package controllers

import (
	"log"
	"net/http"

	"go/chat/internal/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateMessage(c *gin.Context) {
	input := model.Messages{}
	err := c.ShouldBindJSON(&input)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	message := &model.Messages{}
	coll := mgm.Coll(message)
	message.TextID = input.TextID
	message.Room = input.Room
	message.User = input.User
	message.Text = input.Text

	err = coll.Create(message)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, message)
}

func LoadMessages(c *gin.Context) {
	room := c.Query("room")
	log.Println(room)

	messages := []model.Messages{}
	msgColl := mgm.Coll(&model.Messages{})
	msgErr := msgColl.SimpleFind(&messages, bson.M{"room": room})

	if msgErr != nil {
		log.Println(msgErr.Error())
		return
	}
	log.Println(messages)

	c.JSON(http.StatusOK, messages)
}
