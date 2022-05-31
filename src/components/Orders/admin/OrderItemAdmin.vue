<template>
    <tr>
      <td scope="row">{{order.id}}</td>
      <td>{{order.user.name}}</td>
      <td>{{order.user.email}}</td>
      <td>{{order.order_date}}</td>
      <td>
        <div v-for="product in order.products" :key="product.id" class="products">
          {{product.name}},
        </div>
      </td>
      <td>        
        <button class="btn btn-danger" @click="orderDelete(order.id)">
          Delete
        </button>
      </td>
    </tr>
</template>


<script>
export default {
  name: "OrderItemAdmin",
  props: {
    order: Object,
  },
  methods: {
    orderDelete(id) {
      this.$emit('content-block-remove', id);
    }
  }
};
</script>

<style>

</style>