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
	router.GET("/api/users", func(c *gin.Context) {
		controllers.GetUsersController(c, repo)
	})
	router.GET("/api/tasks", func(c *gin.Context) {
		controllers.GetTasksController(c, repo)
	})
	router.POST("/api/tasks", func(c *gin.Context) {
		controllers.PostTaskController(c, repo)
	})
	router.PUT("/api/tasks/:id", func(c *gin.Context) {
		controllers.PutTaskController(c, repo)
	})
	router.Run(port)
}
