<template>
<div class="mt-5">
  <div class="card" style="width: 18rem">
    <img class="card-img-top" :src="product.image" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">€{{ product.price }}</p>
      <button href="#" @click="addToCart(product)" class="btn btn-primary">Add to cart</button>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "ProductListItem",
  props: {
    product: Object,
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("cart/addProductToCart", product).then(
        () => {
          this.$router.push("/shoppingcart");
        }
      );
    }
  }
};
</script>