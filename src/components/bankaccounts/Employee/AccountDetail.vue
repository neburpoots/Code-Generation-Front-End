<template>
  <section>
    <div class="container pt-5">
        <h1 class="orderdate">Iban: {{account.account_id}}</h1>
        <h2 class="orderdate">Balance: €{{account.balance}}</h2>
        <h3 class="pt-5 orderdate">Absolute limit: €{{account.absoluteLimit}}</h3>
        <h3 class="orderdate">Account type: {{account.accountType}}</h3>
        <h3 class="orderdate">Status: {{account.status ? 'Open' : 'Frozen'}}</h3>
        <h4 class="pt-5 orderdate">Name of the owner: {{user.firstname + " " + user.lastname}}</h4>
        <h4 class="orderdate">Email: {{user.email}}</h4>
        <h4 class="orderdate">Daily limit of total transactions: {{user.daily_limit}}</h4>
        <h4 class="orderdate">Limit of a single transaction: {{user.transaction_limit}}</h4>
    </div>
  </section>
</template>

<script>
import BankAccountService from "../../../services/bankaccount.service";

export default {
  name: "AccountDetail",
  props: {
      id: String,
  },
  data() {
    return {
      account: Object,
      user: Object,
      message: String
    };
  },

  mounted() {
    BankAccountService.getSingleBankAccount(this.id).then(
      (response) => {
          this.user = response.data.user;
        this.account = response.data;
                  console.log(this.user)

      },
      (error) => {
        this.products =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style>
</style>