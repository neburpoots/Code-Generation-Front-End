// import CartService from '../services/cart.service';
// const cartLocal = JSON.parse(localStorage.getItem('cart'));

// const initialState = cartLocal
//   ? { bankaccounts: cartLocal.products }
//   : { products: [] };

import bankaccountService from "../services/bankaccount.service";

export const bankAccount = {
  namespaced: true,
  state: {
    bankaccounts: [],
  },

  getters: {

    getBankAccounts(state) {
      return state.bankaccounts;
    }


  },
  actions: {

    getAll ({ commit }) {
      const retrievedBankAccounts = bankaccountService.getAllBankAccounts();
      commit('pushBankAccounts', { retrievedBankAccounts });
    },

    getOwnBankAccounts({ state, rootState }) {
      const user = rootState.auth.userObject;
      console.log(user)
      const retrievedBankAccounts = bankaccountService.getBankAccountsForUser(user.user_id);
      state.bankAccounts = retrievedBankAccounts;
    }
  },
  mutations: {
    pushBankAccounts(state, retrievedBankAccounts) {
      state.bankAccounts = state.bankAccounts.concat(retrievedBankAccounts.filter((item) => state.bankAccounts.indexOf(item) < 0));
    }
  }
};