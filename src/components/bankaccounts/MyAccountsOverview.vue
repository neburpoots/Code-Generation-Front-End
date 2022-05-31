<template>
  <div class="container mt-5">
    <h1 class="title">Your bank accounts</h1>
    <!-- <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    > -->
      {{ message }}
    </div>
      <div class="products d-flex justify-content-between flex-wrap">
        <bank-account-card
          v-for="bankaccount in bankaccounts"
          :key="bankaccount.id"
          :bankAccount="bankaccount"
        />
      </div>
</template>

<script>
import BankAccountCard from "./BankAccountCard.vue";

export default {
  name: "MyAccountsOverview",
  components: {
    BankAccountCard,
  },
  data() {
    return {
      bankaccounts: [],
      message: "",
    };
  },
  mounted() {

    if(this.$store.getters['bankAccount/getBankAccounts'].length === 0) {
        this.$store.dispatch("bankAccount/getOwnBankAccounts");
    }

    this.bankaccounts = this.$store.getters["bankAccount/getBankAccounts"];
  },
};
</script>