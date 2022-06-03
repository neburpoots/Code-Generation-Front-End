import api from './api';

class BankAccountService {

    getAllBankAccounts(page) {
        return api.get(`accounts?page=${page}`)
    }

    getBankAccountsForUser(id) {
        return api.get(`accounts?user_id=${id}`)
    }

    getSingleBankAccount(id) {
        return api.get(`accounts/${id}`)
    }

    async editAccount(account, id) {

        let data = {absolute_limit: account.absoluteLimit, status: account.status}

        let jsonAccount = JSON.stringify(data);
        
        console.log(jsonAccount)

        try {
            return api.patch("/accounts/" + id, jsonAccount);
        } catch (_error) {
            return Promise.reject(_error);
        }
    }
}

export default new BankAccountService();
