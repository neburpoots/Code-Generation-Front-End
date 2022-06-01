<template>
  <div class="container mt-5">
    <h1 class="title">Your bank accounts</h1>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
      <div class="products d-flex justify-content-between flex-wrap">
        <bank-account-card
          v-for="bankaccount in bankaccounts"
          :key="bankaccount.id"
          :bankAccount="bankaccount"
        />
      </div>
      </div>
</template>

<script>
import bankaccountService from "../../services/bankaccount.service";
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
  const currentUser = this.$store.state.auth.userObject;
  bankaccountService.getBankAccountsForUser(currentUser.user_id).then(
      (response) => {
        console.log(response)
        this.bankaccounts = response.data;
      },
      (error) => {
        this.bankaccounts =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>