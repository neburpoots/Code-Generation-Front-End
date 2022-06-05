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

        let json = JSON.stringify(data);
        
        console.log(json)

        try {
            return api.patch("/users/" + id, json);
        } catch (_error) {
            return Promise.reject(_error);
        }
    }
    async changePassword(currentPassword, newPassword) {

        let data = {currentPassword: currentPassword, newPassword: newPassword}

        let json = JSON.stringify(data);
        
        console.log(json)

        return api.patch("/users/password", json);
    }
    async registerUser(user) {

        let data = {firstname: user.firstname, lastname: user.lastname, email: user.email, password: user.password}

        let json = JSON.stringify(data);
        
        console.log(json)

        return api.post("/users/register", json);
    }
}

export default new UserService();
