<template>
  <div>
    <h2>Primary Account Transactions</h2>
    {{ this.accountExists }}
    {{ this.primaryAccountIban }}

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

    <h1>Make transaction</h1>

    <form
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

      <div>
        <select
          v-if="this.removeToAccount"
          v-model="this.newTransaction.toAccount"
          id="toAccount"
          name="toAccount"
        >
          <option
            v-for="address in this.addressBook"
            :key="address.iban"
            :value="address.iban"
          >
            {{ address.name }}
          </option>
        </select>
      </div>

      <label for="type">Choose type of transaction:</label>
      <select
        v-model="this.newTransaction.type"
        id="cars"
        name="cars"
        @input="checkTypeOfTransaction($event)"
      >
        <option value="0" selected>Regular Transaction</option>
        <option value="1">Withdraw</option>
        <option value="2">Deposit</option>
      </select>
      <button type="submit" class="btn btn-primary m-2">
        Create Transaction
      </button>
    </form>
  </div>
</template>

<script>
import TransactionService from "./../../services/transaction.service";
import tokenService from "./../../services/token.service";

export default {
  name: "PrimaryTransactions",
  data() {
    return {
      firstname: "",
      primaryAccountIban: "",
      transactions: [],
      pageSize: 5,
      addressBook: [],
      accountExists: false,
      removeToAccount: true,
      newTransaction: {
        toAccount: "",
        amount: "",
        type: Number,
      },
    };
  },
  methods: {
    checkTypeOfTransaction(event) {
      if (event.target.value === "0") {
        this.removeToAccount = true;
        this.newTransaction.type = 0;
      } else {
        this.newTransaction.type = parseInt(event.target.value);
        this.removeToAccount = false;
        this.newTransaction.toAccount = this.primaryAccountIban;
      }
      console.log("Changed: " + event.target.value);
    },
    createTransaction() {
      if (
        isNaN(this.newTransaction.amount) ||
        this.newTransaction.amount === ""
      ) {
        this.newTransaction.amount = "";
        alert("Amount must be a number");
      } else {
        TransactionService.createTransaction(
          this.primaryAccountIban,
          this.newTransaction
        );
      }
    },
    loadMore() {
      this.pageSize += 5;
      TransactionService.getAllTransactionsForAccount(
        this.primaryAccountIban,
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
        if (res.data.content[i].accountType === "PRIMARY") {
          this.accountExists = true;
          this.primaryAccountIban = res.data.content[i].account_id;
          console.log(res.data.content[i]);
        }
      }

      TransactionService.getAllTransactionsForAccount(
        this.primaryAccountIban
      ).then((res) => {
        this.transactions = res.data;
        console.log(res.data);
      });

      TransactionService.getIbanAddresses().then((res) => {
        var username = tokenService.getUser().firstname;
        for (let i = 0; i < res.data.content.length; i++) {

          if(res.data.content[i].accountType == "PRIMARY" || res.data.content[i].user.firstname == username){
          this.addressBook.push({
            name: res.data.content[i].user.firstname + " - (" + res.data.content[i].accountType + ")",
            iban: res.data.content[i].account_id,
          });
          }
          console.log(res.data.content[i]);


        }
      });
    });
  },
};
</script>

<style scoped>
</style>