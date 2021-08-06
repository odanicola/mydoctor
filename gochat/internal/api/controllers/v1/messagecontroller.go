package controllers

import (
	"log"
	"net/http"

	"go/chat/internal/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
)

func CreateMessage(c *gin.Context) {
	json := model.Messages{}
	err := c.ShouldBindJSON(&json)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	message := &model.Messages{}
	coll := mgm.Coll(message)

	message.RoomId = json.RoomId
	message.UserId = json.UserId
	message.Message = json.Message

	err = coll.Create(message)

	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, message)
}
