package router

import (
	controllers "go/chat/internal/api/controllers/v1"

	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	app := gin.New()

	v1 := app.Group("/v1")

	// Routes
	v1.GET("/isActive", controllers.GetVersion)

	// Room
	v1.POST("/room", controllers.CreateRoom)
	v1.GET("/room/:id", controllers.GetRoomById)

	// Messages
	v1.POST("/message", controllers.CreateMessage)
	v1.GET("/message", controllers.LoadMessages)
	return app
}
