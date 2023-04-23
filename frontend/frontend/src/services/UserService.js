import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users"; //Creo que cambiar
const LOGIN_API_BASE_URL = "http://localhost:8080/api/v1/login";

class UserService {

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUsersEmail() {
        return axios.get(USER_API_BASE_URL + '/emailList');
    }

    getUsersId() {
        return axios.get(USER_API_BASE_URL + '/idList');
    }

    getLastUser() {
        return axios.get(USER_API_BASE_URL + '/lastUser');
    }

    createUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId) {
        return axios.get(USER_API_BASE_URL + `/${userId}`);
    }

    updateUser(user, userId) {
        return axios.put(USER_API_BASE_URL + `/${userId}`, user);
    }

    updatePassword(user, userId) {
        return axios.put(USER_API_BASE_URL + `/${userId}/updatePassword`, user);
    }

    deleteUser(userId) {
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    queryUser(userId, password) {
        return axios.get(`${LOGIN_API_BASE_URL}?userId=${userId}&password=${password}`);
    }

}


export default new UserService()