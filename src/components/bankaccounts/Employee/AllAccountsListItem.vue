<template>
    <tr>
      <td scope="row">{{account.account_id}}</td>
      <td>{{account.user.email}}</td>
      <td>{{account.user.firstname}} {{account.user.lastname}}</td>
      <td>€{{account.balance.toFixed(2)}}</td>
      <td>{{account.status ? 'Open' : 'Frozen'}}</td>
      <td>€{{account.absoluteLimit.toFixed(2)}}</td>
      <td>        
        <button class="btn btn-success" @click="accountDetail(account.account_id)">
          Edit
        </button>
        <button class="btn ml-2 btn-primary" @click="accountDetail(account.account_id)">
          Details
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
    accountDetail(id) {
      this.$router.push('/accountdetails/' + id);
    },
  }
};
</script>

<style>

</style>