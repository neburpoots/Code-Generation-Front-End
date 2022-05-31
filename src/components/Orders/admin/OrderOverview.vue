<template>
<div class="container pt-5">
<h1 class="title pb-5">Order overview</h1>
<div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
  {{ message }}
</div>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Customer</th>
      <th scope="col">E-mail</th>
      <th scope="col">Orderdate</th>
      <th scope="col">Products</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <order-item-admin
          v-on:content-block-remove="remove"
          v-for="order in orders.data"
          :key="order.id"
          :order="order"
    />
  </tbody>
</table>
    <div class="d-flex justify-content-center">
        <div class="w-25 pagination">
            <div class="prevbutton mr-auto">
                <button v-if="orders.current_page !== 1" @click="prevPage(orders.current_page)" class="btn btn-primary previous">&#x2190;</button>
            </div>
                <p class="h4">Page: {{orders.current_page}}</p>
            
            <div class="prevbutton ml-auto">
                <button v-if="orders.current_page !== orders.last_page" @click="nextPage(orders.current_page)"  class="btn btn-primary next">&#8594;</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import OrderService from "../../../services/order.service";
import OrderItemAdmin from "./OrderItemAdmin";

export default {
  name: "MyOrders",
  components: {
    OrderItemAdmin,
  },
  data() {
    return {
      orders: [],
      successful: false,
      loading: false,
      message: "",
    };
  },
  methods: {
    remove(id) {
      OrderService.deleteOrder(id).then(
        (data) => {
            this.orders.data = this.orders.data.filter(item => item.id !== id);
            this.message = data.data.message;
            this.successful = true;
            this.loading = false;
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

    nextPage(currentPage) {
        currentPage++
        this.getOrdersPagination(currentPage);
    },

    prevPage(currentPage) {
        currentPage--
        this.getOrdersPagination(currentPage);
    },

    getOrdersPagination(id) {
      OrderService.allOrders(id).then(
        (response) => {
            this.orders = response.data.data;
        },
        (error) => {
            this.orders =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
  mounted() {
    this.getOrdersPagination(1);
  }

};
</script>

<style>

</style>