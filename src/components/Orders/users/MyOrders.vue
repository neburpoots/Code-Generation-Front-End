<template>
<div class="container pt-5">
<h1 class="title pb-5">Your orders</h1>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Orderdate</th>
      <th scope="col">Products</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
    <order-item
          v-for="order in orders"
          :key="order.id"
          :order="order"
    />
  </tbody>
</table>
</div>

</template>

<script>
import OrderService from "../../../services/order.service";
import OrderItem from "./../OrderItem";
export default {
  name: "MyOrders",
  components: {
    OrderItem,
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    OrderService.getMyOrders().then(
      (response) => {
        this.orders = response.data.data;
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
};
</script>

<style>

</style>