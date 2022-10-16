package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type MutateTaskType struct {
	Name        string
	Description string
	UserId      string
	Time        string
}

type Task struct {
	Name        string
	Description string
	UserId      string
	Time        string
}

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	dsn := os.Getenv("CONNECTION_STRING")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return
	}

	port := ":4000"
	router := gin.Default()
	router.GET("/api/tasks", func(c *gin.Context) {
		var tasks []Task
		db.Find(&tasks)
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
