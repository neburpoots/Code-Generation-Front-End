import api from './api';

class BankAccountService {

    getAllBankAccounts() {
        return api.get('accounts')
    }

    getBankAccountsForUser(id) {
        return api.get(`accounts?user_id=${id}`)
    }
}

export default new BankAccountService();
