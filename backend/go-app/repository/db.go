package repository

import (
	"errors"
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

func getConnectionString() (string, error) {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Println()
		return "", errors.New("error loading .env file")
	}

	return os.Getenv("CONNECTION_STRING"), nil
}

func GetDb() (*gorm.DB, error) {
	dsn, err := getConnectionString()

	if err != nil {
		return nil, err
	}

	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}