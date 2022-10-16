package main

import (
	"log"
	"net/http"
	"todo/repository"

	"github.com/gin-gonic/gin"
)

type MutateTaskType struct {
	Name        string
	Description string
	UserId      string
	Time        string
}

func main() {
	repo, err := repository.GetInstance()

	if err != nil {
		log.Fatal(err)
	}

	port := ":4000"
	router := gin.Default()
	router.GET("/api/tasks", func(c *gin.Context) {
		tasks := repo.GetTasks()
		c.IndentedJSON(http.StatusOK, tasks)
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
