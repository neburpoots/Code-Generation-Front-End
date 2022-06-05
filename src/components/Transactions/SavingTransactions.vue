<template>
  <div>
    <h2>Primary Account Transactions</h2>
    {{ this.accountExists }}
    {{ this.savingAccountIban }}

    <h1>Transactions</h1>
    <div v-if="this.accountExists">
      <div v-for="t in this.transactions" :key="t.transaction_id">
        <p>
          <strong>$ {{ t.amount }}</strong> - {{ t.date }} -
          {{ t.transaction_type }}
        </p>
      </div>
      <button @click="loadMore">Load More Transactions</button>
    </div>
    <h2 v-else>You have no primary account.</h2>

    <h1 @click="openForm">Make transaction</h1>

    <form
      v-if="this.transactionShow"
      class="mx-5"
      @submit.prevent="createTransaction"
    >
      <label id="labelTitle" for="title">Amount: </label>

      <input
        type="text"
        v-model="this.newTransaction.amount"
        id="amount"
        placeholder="e.g 20.00"
      />

      <button type="submit" class="btn btn-primary m-2">
        Transfer to primary account
      </button>
    </form>
  </div>
</template>

<script>
import TransactionService from "./../../services/transaction.service";
export default {
  name: "PrimaryTransactions",
  data() {
    return {
      transactions: [],
      pageSize: 5,
      accountExists: false,
      removeToAccount: true,
      transactionShow: false,
      newTransaction: {
        fromAccount: "",
        toAccount: "",
        amount: "",
        type: Number,
      },
    };
  },
  methods: {
    openForm() {
      if (this.transactionShow == true) this.transactionShow = false;
      else this.transactionShow = true;
    },
    createTransaction() {
      if (
        isNaN(this.newTransaction.amount) ||
        this.newTransaction.amount === ""
      ) {
        this.newTransaction.amount = "";
        alert("Amount must be a number");
      } else {
        TransactionService.createSavingsTransaction(this.newTransaction);
      }
    },
    loadMore() {
      this.pageSize += 5;
      TransactionService.getAllTransactionsForAccount(
        this.savingAccountIban,
        this.pageSize
      ).then((res) => {
        this.transactions = res.data;
        console.log(res.data);
      });
    },
  },
  mounted() {
    TransactionService.getAllAccounts().then((res) => {
      for (let i = 0; i < res.data.content.length; i++) {
        if (res.data.content[i].accountType === "SAVINGS") {
          this.accountExists = true;
          this.savingAccountIban = res.data.content[i].account_id;
          this.newTransaction.fromAccount = this.savingAccountIban;
        } else {
          this.newTransaction.toAccount = res.data.content[i].account_id;
          console.log(this.newTransaction.toAccount);
        }
      }

      TransactionService.getAllTransactionsForAccount(
        this.savingAccountIban
      ).then((res) => {
        this.transactions = res.data;
        console.log(res.data);
      });
    });
  },
};
</script>

<style scoped>
</style>