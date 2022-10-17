package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"todo/repository"
)

func GetTasksController(c *gin.Context, repo *repository.Repository) {
	tasks := repo.GetTasks()
	c.IndentedJSON(http.StatusOK, tasks)
}

func PostTaskController(c *gin.Context, repo *repository.Repository) {
	var requestBody repository.Task

	if err := c.BindJSON(&requestBody); err != nil {
		return
	}

	task := repo.CreateTask(requestBody)

	c.IndentedJSON(http.StatusCreated, task)
}
