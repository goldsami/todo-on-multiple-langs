package repository

import (
	"time"
)

type Task struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description *string `json:"description"`
	Status string `json:"status"`
	UserId      *int    `json:"user_id"`
	User *User `json:"user"`
	Time        *time.Time `json:"time"`
}

type User struct {
	Id int `json:"id"`
	Name        string `json:"name"`
	Description *string `json:"description"`
	ImageUrl *string `json:"image_url"`
}
