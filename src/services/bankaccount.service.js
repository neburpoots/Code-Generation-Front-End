import api from './api';

class BankAccountService {

    getAllBankAccounts(page) {
        return api.get(`accounts?page=${page}`)
    }

    getBankAccountsForUser(id) {
        return api.get(`accounts?user_id=${id}`)
    }
}

export default new BankAccountService();
