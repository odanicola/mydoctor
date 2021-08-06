package controllers

import (
	"net/http"

	variable "go/chat/internal/pkg/config"

	"github.com/gin-gonic/gin"
)

type AppInfo struct {
	Version  string
	Deployed string
}

// GetVersion return version number
func GetVersion(c *gin.Context) {
	info := AppInfo{
		Version:  variable.Version,
		Deployed: variable.BuildTime,
	}
	c.JSON(http.StatusOK, info)
}
