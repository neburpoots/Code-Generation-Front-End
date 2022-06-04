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

    getUsersByIban(pageNo, pageSize, iban) {
        return api.get(`users?pageNo=${pageNo}&pageSize=${pageSize}&iban=${iban}`)
    }

    getUser(id) {
        return api.get(`users/${id}`)
    }
    async editUser(user, roles, id) {

        let data = {firstname: user.firstname, lastname: user.lastname, email: user.email, transaction_limit: user.transaction_limit, daily_limit: user.daily_limit, roles}

        let jsonAccount = JSON.stringify(data);
        
        console.log(jsonAccount)

        try {
            return api.patch("/users/" + id, jsonAccount);
        } catch (_error) {
            return Promise.reject(_error);
        }
    }
}

export default new UserService();
