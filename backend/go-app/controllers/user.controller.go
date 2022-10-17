package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"todo/repository"
)

func GetUsersController(c *gin.Context, repo *repository.Repository) {
	users := repo.GetUsers()
	c.IndentedJSON(http.StatusOK, users)
}
