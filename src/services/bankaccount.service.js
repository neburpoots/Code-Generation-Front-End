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
}

export default new BankAccountService();
