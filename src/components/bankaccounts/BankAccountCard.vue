<template>
<div class="mt-5">
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h2 class="card-title">{{bankAccount.accountType === "PRIMARY" ? "Primary Account" : "Savings Account"}}</h2>
      <h5 class="pt-2 card-text">{{ bankAccount.account_id }}</h5>
      <h3 class="pt-2 card-title">Balance: €{{ bankAccount.balance }}</h3>
      <button href="#" @click="goToTransactionOverview(bankAccount)" class="mt-5 btn btn-primary">View transactions</button>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "BankAccountCard",
  props: {
    bankAccount: Object,
  },
  methods: {
    goToTransactionOverview() {

    }
  }
};
</script>