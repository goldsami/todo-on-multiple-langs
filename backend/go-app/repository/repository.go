package repository

import "gorm.io/gorm"

type Repository struct {
	db *gorm.DB
}

func (self *Repository) GetUsers() []User {
	var users []User
	self.db.Find(&users)
	return users
}

func (self *Repository) GetTasks() []Task {
	var tasks []Task
	self.db.Model(&Task{}).Preload("User").Where("status != 'deleted'").Find(&tasks)
	return tasks
}

func (self *Repository) CreateTask(task Task) Task {
	self.db.Create(&task)
	return task
}

func(self *Repository) UpdateTask(id int, task Task) Task {
	var res Task
	self.db.First(&res, id).UpdateColumns(task)
	return res
}

func (self *Repository) DeleteTask(id int) Task {
	var task Task
	self.db.First(&task, id).UpdateColumn("status", "deleted")
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
