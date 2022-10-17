package repository

type Task struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	UserId      int    `json:"user_id"`
	Time        string `json:"time"`
}
