/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await seedUsers(knex)
  await seedTasks(knex)
  await seedUserTasks(knex)
};

async function seedUsers(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 0, name: 'Audrey Hepburn', description: 'Housekeeper', image_url: 'https://m.media-amazon.com/images/M/MV5BMTM4MTY3NTQyMF5BMl5BanBnXkFtZTYwMTk2MzQ2._V1_UX214_CR0,0,214,317_AL_.jpg'},
    {id: 1, name: 'Daniel Day-Lewis', description: 'Butler', image_url: 'https://m.media-amazon.com/images/M/MV5BMjE2NDY2NDc1Ml5BMl5BanBnXkFtZTcwNjAyMjkwOQ@@._V1_UY209_CR9,0,140,209_AL_.jpg'},
    {id: 2, name: 'Anthony Hopkins', description: 'Owner', image_url: 'https://m.media-amazon.com/images/M/MV5BMTg5ODk1NTc5Ml5BMl5BanBnXkFtZTYwMjAwOTI4._V1_UY209_CR5,0,140,209_AL_.jpg'},
    {id: 3, name: 'Sean Penn', description: 'Chef', image_url: 'https://m.media-amazon.com/images/M/MV5BMTc1NjMzMjY3NF5BMl5BanBnXkFtZTcwMzkxNjQzMg@@._V1_UY209_CR1,0,140,209_AL_.jpg'},
    {id: 4, name: 'Clint Eastwood', description: 'Driver', image_url: 'https://m.media-amazon.com/images/M/MV5BMTg3MDc0MjY0OV5BMl5BanBnXkFtZTcwNzU1MDAxOA@@._V1_UY317_CR10,0,214,317_AL_.jpg'},
  ])
}

async function seedTasks(knex) {
  await knex('task').del()
  await knex('task').insert([
    {id: 0, name: 'Make the dinner', description: 'Cook pasta', status: 'open', time: '2022-09-07T10:29:41.386Z'},
    {id: 1, name: 'Take Daniel to office', description: 'Take a car', status: 'open', time: '2022-09-15T9:00:41.386Z'},
    {id: 2, name: 'Clean the house', description: 'Also clean up the roof', status: 'open', time: '2022-09-21T10:29:41.386Z'},
    {id: 3, name: 'Plan the party', description: '15 guests invited', status: 'done', time: '2022-08-07T10:29:41.386Z'},
    {id: 4, name: 'Create report', description: '', status: 'done', time: '2022-09-06T17:29:41.386Z'},
  ])
}

async function seedUserTasks(knex) {
  await knex('user_task').del()
  await knex('user_task').insert([
    {user_id: 0, task_id: 0},
    {user_id: 1, task_id: 2},
    {user_id: 0, task_id: 2},
    {user_id: 4, task_id: 1},
    {user_id: 3, task_id: 4},
  ])
}
