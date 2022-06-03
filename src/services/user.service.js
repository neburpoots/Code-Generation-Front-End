import api from './api';

class UserService {
    getUserContent() {
        return api.get('user')
    }

    getUsersForCreateBankAccount(page, size, filterforNoBankAccount) {
        let queryString = `users?pageNo=${page}&pageSize=${size}`;

        if(filterforNoBankAccount) {
            queryString += '&account=false'
        }

        return api.get(queryString);
    }
}

export default new UserService();
