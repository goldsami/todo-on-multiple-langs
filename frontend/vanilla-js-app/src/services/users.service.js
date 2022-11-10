import axios from "axios";

class UsersService {
  getUsers() {
    return axios.get('http://localhost:4000/api/users')
  }
}

export const usersService = new UsersService()
