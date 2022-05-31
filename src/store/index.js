import { createStore } from "vuex";
import { auth } from "./auth.module";
import { bankAccount } from "./bankaccount.module";
import { cart } from './cart.module';

const store = createStore({
    modules: {
        auth: auth,
        cart: cart,
        bankAccount: bankAccount,
    },
});

export default store;