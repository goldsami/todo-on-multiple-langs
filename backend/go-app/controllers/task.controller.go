package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"todo/repository"
)

func GetTasksController(c *gin.Context, repo *repository.Repository)  {
	tasks := repo.GetTasks()
	c.IndentedJSON(http.StatusOK, tasks)
}