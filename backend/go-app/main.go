package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	port := ":4000"
	r := gin.Default()
	r.GET("/api/tasks", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run(port)
}
