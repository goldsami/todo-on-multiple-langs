package repository

import "gorm.io/gorm"

type Repository struct {
	db *gorm.DB
}

func (self *Repository) GetTasks() []Task {
	var tasks []Task
	self.db.Find(&tasks)
	return tasks
}

func (self *Repository) CreateTask(task Task) Task {
	self.db.Create(&task)
	return task
}

func GetInstance() (*Repository, error) {
	db, err := GetDb()

	if err != nil {
		return nil, err
	}

	return &Repository{
		db: db,
	}, nil
}
