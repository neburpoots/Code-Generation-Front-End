<template>
  <div class="container mt-5">
    <h1 class="title mb-5">Shopping cart</h1>
      <div class="mb-5 products d-flex justify-content-between flex-wrap">
        <shopping-cart-item
          v-for="cartItem in cartItems"
          :key="cartItem.product.id"
          :cartItem="cartItem"
        />
      </div>
      <div class="totalprice">
        <h2 class="mb-5">Total price: € {{totalPrice}}</h2>
      </div>
      <div class="checkoutButton">
        <button v-if="cartItems.length !== 0" @click="order" class="p-3 btn btn-primary"><p class="h2">Order videocards!</p></button>
      </div>
  </div>
</template>

<script>
import ShoppingCartItem from "./ShoppingCartItem.vue";
import OrderService from "../../services/order.service";

export default {
  name: "ShoppingCart",
  components: {
    ShoppingCartItem,
  },
  computed: {
      cartItems() {
          return this.$store.getters['cart/getProducts'];
      },
      totalPrice() {
          return this.$store.getters['cart/getTotalPrice'];
      },
      currentUser() {
        return this.$store.state.auth.userObject;
      },
  },
  methods: {

    order() {

      if (!this.currentUser) {
          this.$router.push('/login');
          return;
      }

      OrderService.orderItems(this.$store.getters['cart/getProducts']).then(
        (response) => {
          this.$store.dispatch("cart/clearShoppingCart");
          
          this.$router.push({ name: 'ThanksForOrdering', params: {Id: response.data.data.id }})
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
};
</script>