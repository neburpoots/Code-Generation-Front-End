<template>
    <tr>
      <td scope="row">{{account.account_id}}</td>
      <td>{{account.user.email}}</td>
      <td>{{account.user.firstname}} {{account.user.lastname}}</td>
      <td>{{account.balance.toFixed(2)}}</td>
      <td>{{account.status ? 'Open' : 'Frozen'}}</td>
      <td>{{account.absoluteLimit.toFixed(2)}}</td>
      <td>        
        <button class="btn btn-warning" @click="orderDelete(order.id)">
          Edit
        </button>
      </td>
    </tr>
</template>


<script>
export default {
  name: "AllAcountsListItem",
  props: {
    account: Object,
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