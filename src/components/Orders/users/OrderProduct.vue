<template>
<div class="mt-5">
  <div class="card" style="width: 18rem">
    <img class="card-img-top" :src="product.image" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="d-flex justify-content-between">
        <p class="card-text">€{{ product.price }}</p>
        <p class="card-text">Amount: {{ product.pivot.quantity }}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p class="card-text">Total Price: €{{ totalPrice }}</p>
      </div>

    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "OrderProduct",
  props: {
    product: Object,
  },
  computed: {
    totalPrice() {
      let total = this.product.pivot.quantity * this.product.price;
      return total.toFixed(2);
    }
  }
};
</script>