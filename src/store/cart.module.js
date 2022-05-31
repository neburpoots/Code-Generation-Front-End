import CartService from '../services/cart.service';
const cartLocal = JSON.parse(localStorage.getItem('cart'));

const initialState = cartLocal
  ? { products: cartLocal.products }
  : { products: [] };

export const cart = {
  namespaced: true,
  state: {
    products: initialState.products,
  },
  getters: {

    getProducts(state) {
      return state.products;
    },

    getTotalPrice(state) {
          let totalPrice = 0;
          state.products.forEach(item => {
            totalPrice += item.quantity * item.product.price
          })
          return totalPrice.toFixed(2);
    }

  },
  actions: {

    clearShoppingCart({state, commit}) {
      if(state.products.length !== 0) {
        commit('clearShoppingCart');
      }
    },

    decreaseQuantity({ state, commit }, id) {
      const cartItem = state.products.find(item => item.product.id === id)

      if (cartItem.quantity > 1) {
        commit('decreaseQuantity', { id })
      } else {
        commit('removeProductFromCart', { id })
      }
    },

    removeProductFromCart ({ state, commit }, id) {
      const cartItem = state.products.find(item => item.product.id === id)
      if (cartItem) {
        commit('removeProductFromCart', { id })
      }
    },

    addProductToCart ({ state, commit }, product) {
      const cartItem = state.products.find(item => item.product.id === product.id)
      if (!cartItem) {
        commit('pushProductToCart', { product })
      } else {
        commit('incrementItemQuantity', { product })
      }      
    }

  },
  mutations: {

    clearShoppingCart(state) {
      CartService.clearShoppingCart();
      state.products = [];
    },

    decreaseQuantity(state, {id}) {
      CartService.decreaseQuantity(id);
      const cartItem = state.products.find(item => item.product.id === id)
      cartItem.quantity--
    },

    removeProductFromCart(state, { id }) {
      CartService.removeProductFromCart(id);
      state.products = state.products.filter(item => item.product.id !== id);
    },
    
    pushProductToCart (state, { product }) {
      CartService.addToCartStorage(product);
      state.products.push({
        product,
        quantity: 1,
      })
    },

    incrementItemQuantity (state, { product }) {
      CartService.incrementAmount(product.id);
      const cartItem = state.products.find(item => item.product.id === product.id)
      cartItem.quantity++
    },
  
  }
};