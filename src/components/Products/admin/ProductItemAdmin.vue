<template>
    <tr>
      <td scope="row">{{product.id}}</td>
      <td class="productoverviewImage"><img :src=product.image alt="Product image" /></td>
      <td>
        {{product.name}}
      </td>
      <td>
        € {{product.price}}
      </td>
      <td class="d-flex justify-content-between">        
        <button class="btn btn-primary" @click="edit(product.id)">
          Edit
        </button>
        <button class="btn btn-danger" @click="deleteProduct(product.id)">
          Delete
        </button>
      </td>
    </tr>
</template>
<script>

export default {
  name: "ProductItemAdmin",
  props: {
    product: Object,
  },
  methods: {
    edit(id) {
      this.$router.push('/productedit/' + id);
    },
    deleteProduct(id) {
      this.$emit('content-block-remove', id);
    },
  }
};
</script>