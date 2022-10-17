package main

import (
	"log"
	"todo/controllers"
	"todo/repository"

	"github.com/gin-gonic/gin"
)

func main() {
	repo, err := repository.GetInstance()

	if err != nil {
		log.Fatal(err)
	}

	port := ":4000"
	router := gin.Default()
	router.GET("/api/tasks", func(c *gin.Context) {
		controllers.GetTasksController(c, repo)
	})
	router.POST("/api/tasks", func(c *gin.Context) {
		controllers.PostTaskController(c, repo)
	})
	router.Run(port)
}
