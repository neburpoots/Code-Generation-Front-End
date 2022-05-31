<template>
  <div class="container mt-5">
    <h1 class="title">Products</h1>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
      <div class="products d-flex justify-content-between flex-wrap">
        <product-item
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
  </div>
</template>

<script>
import ProductService from "../../services/product.service";
import ProductItem from "./ProductItem.vue";

export default {
  name: "ProductOverview",
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [],
      message: "",
    };
  },
  mounted() {
    ProductService.getPublicContent().then(
      (response) => {
        this.products = response.data.data;
      },
      (error) => {
      this.message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            this.successful = false;
            this.loading = false;
      }
    );
  },
};
</script>