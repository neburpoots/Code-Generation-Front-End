<template>
  <section>
    <div class="container pt-5">
        <h1 class="orderdate">Order: {{order.id}}</h1>
        <h2 class="orderdate">Order date: {{order.id}}: {{order.order_date}}</h2>
        <div class="products d-flex flex-wrap">
          <order-product 
            v-for="product in order.products"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="total pt-5">
          <p v-if="order.products" class="h2">
            Total: € {{ totalPrice }}
          </p>
        </div>

    </div>
  </section>
</template>

<script>
import OrderService from "../../../services/order.service";
import OrderProduct from "./OrderProduct.vue";

export default {
  name: "OrderDetail",
  components: {
    OrderProduct
  },
  props: {
      id: String,
  },
  data() {
    return {
      order: Object,
    };
  },

  mounted() {
    OrderService.getOneOrder(this.id).then(
      (response) => {
        this.order = response.data.data;
      },
      (error) => {
        this.products =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.order.products.forEach(item => {
            total += item.pivot.quantity * item.price
      });

      return total.toFixed(2);
    }
  },
};
</script>

<style>
</style>