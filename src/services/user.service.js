import api from './api';

class UserService {
    getUserContent() {
        return api.get('user')
    }

    getUsersForCreateBankAccount(page, size) {
        return api.get(`users?pageNo=${page}&pageSize=${size}`)
    }
}

export default new UserService();
