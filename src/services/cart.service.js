class CartService {

    addToCartStorage(product) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if(cart) {
        cart.products.push({
            product,
            quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        const cart = { products: [] };

        cart.products.push({
            product,
            quantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    incrementAmount(id) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const cartItem = cart.products.find(item => item.product.id === id)
        cartItem.quantity++
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    decreaseQuantity(id) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const cartItem = cart.products.find(item => item.product.id === id)
      cartItem.quantity--
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    removeProductFromCart(id) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.products = cart.products.filter(item => item.product.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    clearShoppingCart() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart.products = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }
  export default new CartService();