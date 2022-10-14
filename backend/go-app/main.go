package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type MutateTaskType struct {
	Name        string
	Description string
}

func main() {
	port := ":4000"
	router := gin.Default()
	router.GET("/api/tasks", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	router.POST("/api/tasks", func(c *gin.Context) {
		var requestBody MutateTaskType

		if err := c.BindJSON(&requestBody); err != nil {
			return
		}

		c.IndentedJSON(http.StatusCreated, requestBody)
	})
	router.Run(port)
}
