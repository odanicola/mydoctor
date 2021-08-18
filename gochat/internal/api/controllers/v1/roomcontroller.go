package controllers

import (
	"log"
	"net/http"

	"go/chat/internal/pkg/model"

	"github.com/gin-gonic/gin"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
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

func GetRoomByUserId(c *gin.Context) {
	user_id := c.Param("id")
	log.Println("userid", user_id)

	room := []model.Room{}
	coll := mgm.Coll(&model.Room{})
	err := coll.SimpleFind(&room, bson.M{"users": user_id})

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := []model.GetRoomByUserId{}

	if len(room) > 0 {
		log.Println("lenght", len(room))
		for i := 0; i < len(room); i++ {
			if room[i].Users[0] == user_id {
				patient_id := room[i].Users[1]
				user := model.User{}
				coll = mgm.Coll(&user)
				err = coll.FindByID(patient_id, &user)

				if err != nil {
					log.Println("patient err", err.Error())
				}

				message := []model.Messages{}
				coll = mgm.Coll(&model.Messages{})

				limit := 1
				var i64 int64
				i64 = int64(limit)

				err = coll.SimpleFind(&message, bson.M{"room": room[i].ID.Hex()}, &options.FindOptions{
					Sort:  bson.M{"$natural": -1},
					Limit: &i64,
				})

				// err = coll.Find(mgm.Ctx(), bson.M{})
				// err = coll.SimpleFind(&message, bson.M{"room": room[i].ID.Hex()})

				// err = coll.Find(context.TODO(), bson.M{})
				// log.Println("message", message)
				// return

				if err != nil {
					log.Println("message err", err.Error())
				}

				log.Println("message", message)

				if len(message) > 0 {
					result = append(result, model.GetRoomByUserId{
						ID:          room[i].ID.Hex(),
						Name:        room[i].Name,
						Description: room[i].Description,
						Users:       room[i].Users,
						Recipient:   user,
						LatestMessage: model.Messages{
							DefaultModel: message[0].DefaultModel,
							TextID:       message[0].TextID,
							Text:         message[0].Text,
							Room:         message[0].Room,
							User:         message[0].User,
						},
					})
				} else {
					result = append(result, model.GetRoomByUserId{
						ID:            room[i].ID.Hex(),
						Name:          room[i].Name,
						Description:   room[i].Description,
						Users:         room[i].Users,
						Recipient:     user,
						LatestMessage: model.Messages{},
					})
				}

			}
		}
	}

	c.JSON(http.StatusOK, result)
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
