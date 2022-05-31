<template>
    <tr>
      <th scope="row">{{order.id}}</th>
      <td>{{order.order_date}}</td>
      <td>
        <div v-for="product in order.products" :key="product.id" class="products">
          {{product.name}},
        </div>
      </td>
      <td>        
        <button class="btn btn-primary" @click="orderDetail(order.id)">
          Details
        </button>
      </td>
    </tr>
</template>


<script>
export default {
  name: "OrderItem",
  props: {
    order: Object,
  },
  methods: {
    orderDetail(id) {
      this.$router.push('/orderdetail/' + id);
    },
  }
};
</script>

<style>

</style>