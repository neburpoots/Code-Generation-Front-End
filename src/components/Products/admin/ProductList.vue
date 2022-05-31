<template>
<div class="container pt-5">
<div class="pb-5 d-flex justify-content-between">
<h1 class="title">Product overview</h1>
<a href="/productcreate" class="create">
  <button class="btn btn-primary">Create product</button>
</a>
</div>
<div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
  {{ message }}
</div>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
        <product-item-admin
          v-on:content-block-remove="remove"
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
  </tbody>
</table>
</div>

</template>

<script>
import ProductService from "../../../services/product.service";
import ProductItemAdmin from "./ProductItemAdmin.vue";

export default {
  name: "ProductOverview",
  components: {
    ProductItemAdmin,
  },
  data() {
    return {
      products: [],
      successful: false,
      loading: false,
      message: "",
    };
  },
  methods: {
    remove(id) {
      ProductService.deleteProduct(id).then(
        (data) => {
            this.products = this.products.filter(item => item.id !== id);
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
    }
  },
  mounted() {
    ProductService.getPublicContent().then(
      (response) => {
        this.products = response.data.data;
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