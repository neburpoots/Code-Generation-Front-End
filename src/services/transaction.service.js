import api from './api';
import tokenService from './token.service';

class TransactionService {

    getAllTransactions(pageSize = 5) {
        return api.get(`transactions?pageSize=${pageSize}`)
    }

    getAllTransactionsWithFilter(filter, pageSize = 5){

        let query = "";
        query += (filter.toAccount !== "") ? "&to_iban=" + filter.toAccount : "";
        query += (filter.fromAccount !== "") ? "&from_iban=" + filter.fromAccount : "";
        query += (filter.date !== "") ? `&date=${filter.date.substring(8, 10)}-${filter.date.substring(5, 7)}-${filter.date.substring(0, 4)}` : "";
        query += (filter.asEq !== "") ? "&as_eq=" + filter.asEq : "";
        query += (filter.asLt !== "") ? "&as_lt=" + filter.asLt : "";
        query += (filter.asMt !== "") ? "&as_mt=" + filter.asMt : "";

        return api.get(`transactions?pageSize=${pageSize}` + query)
    }

    getAllTransactionsForAccount(accountId, pageSize = 5) {
        return api.get(`transactions/${accountId}?pageSize=${pageSize}`)
    }

    getAllAccounts() {
        var userId = tokenService.getUser().user_id;
        return api.get(`accounts/?user_id=` + userId)
    }

    getIbanAddresses() {
        return api.get(`accounts`)
    }

    createTransaction(ownIban, transaction) {
        console.log("Creating new transaction" + ownIban + "---------- To Account: " + transaction.toAccount + transaction.amount + "TYPE: " + transaction.type)
        const type = parseInt(transaction.type)
        let data = { fromAccount: ownIban, toAccount: transaction.toAccount, amount: transaction.amount, type : type }
        return api.post(`transactions`, JSON.stringify(data))
    }

    createSavingsTransaction(transaction){
        const tAmount = parseInt(transaction.amount)
        let data = {fromAccount : transaction.fromAccount, toAccount: transaction.toAccount, amount: tAmount, type : 0}
        return api.post(`transactions`, JSON.stringify(data)) 
    }
}
export default new TransactionService();