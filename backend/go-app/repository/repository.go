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

func(self *Repository) UpdateTask(id int, task Task) Task {
	var res Task
	self.db.First(&res, id).UpdateColumns(task)
	return res
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
