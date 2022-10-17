package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

func PutTaskController(c *gin.Context, repo *repository.Repository) {
	strId := c.Param("id")
	var requestBody repository.Task

	if err := c.BindJSON(&requestBody); err != nil {
		return
	}

	id, err := strconv.Atoi(strId)

	if err != nil {
		return
	}

	task := repo.UpdateTask(id, requestBody)

	c.IndentedJSON(http.StatusCreated, task)
}
