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

    getUsersWithParameters(pageNo, pageSize, firstname, lastname, iban, account) {
        return api.get(`users?pageNo=${pageNo}&pageSize=${pageSize}&firstname=${firstname}&lastname=${lastname}&iban=${iban}&account=${account}`)
    }
}

export default new UserService();
