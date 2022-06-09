<template>
  <h1>Transaction Administration</h1>
  <h2>Filtering</h2>
From:
  <select v-model="this.searchParams.fromAccount" id="fromAccount" name="fromAccount">
      <option
        v-for="address in this.addressBook"
        :key="address.iban"
        :value="address.iban"
      >
        {{ address.name }}
      </option>
  </select>
To: 
  <select v-model="this.searchParams.toAccount" id="toAccount" name="toAccount">
      <option
        v-for="address in this.addressBook"
        :key="address.iban"
        :value="address.iban"
      >
        {{ address.name }}
      </option>
  </select>
  <p> Date: 
    <input v-model="this.searchParams.date" type="date" placeholder="dd-mm-yyyy" />
  </p>
<p> Amount Equals: 
    <input v-model="this.searchParams.asEq" type="text" placeholder="e.g 200" />
  </p>
<p> Amount Less Than: 
    <input v-model="this.searchParams.asLt" type="text" placeholder="e.g 200" />
  </p>
<p> Amount Greater Than: 
    <input v-model="this.searchParams.asMt" type="text" placeholder="e.g 200" />
  </p>


<button @click="filterTransactions"><h4>Filter</h4></button>
  <h1>Transactions</h1>
  <div v-for="t in this.transactions" :key="t.transaction_id">
    <p>
      <strong>€ {{ t.amount }}</strong> - {{ t.date }} -
      {{ t.transaction_type }} - from: {{ t.fromAccount }} - To:
      {{ t.toAccount }}
    </p>
  </div>
  <button @click="loadMore">Load More</button>
  <button @click="loadLess">show less</button>
</template>

<script>
import TransactionService from "./../../services/transaction.service";
export default {
  name: "TransactionsAdmin",
  data() {
    return {
      searchParams: {
        fromAccount: "",
        toAccount: "",
        date: "",
        asEq: "",
        asLt: "",
        asMt: ""
      },
      accounts: [],
      transactions: [],
      pageSize: 5,
      addressBook: [],
    };
  },
  methods: {
    filterTransactions(){
            TransactionService.getAllTransactionsWithFilter(this.searchParams, this.pageSize).then((res) => {
        this.transactions = res.data;
      });
      console.log(this.searchParams);
    },
    loadMore() {
      this.pageSize += 5;
      TransactionService.getAllTransactionsWithFilter(this.searchParams, this.pageSize).then((res) => {
        this.transactions = res.data;
      });
    },
    loadLess() {
      this.pageSize = 5;
      TransactionService.getAllTransactionsWithFilter(this.searchParams, this.pageSize).then((res) => {
        this.transactions = res.data;
      });
    },
  },
  mounted() {
    TransactionService.getAllTransactionsWithFilter(this.searchParams, this.pageSize).then((res) => {
      this.transactions = res.data;
    });
    console.log(this.transactions);

    TransactionService.getIbanAddresses().then((res) => {
      for (let i = 0; i < res.data.content.length; i++) {
        this.addressBook.push({
          name: res.data.content[i].user.firstname,
          iban: res.data.content[i].account_id,
        });
        console.log(res.data.content[i].user.firstname);
      }
    });
  },
};
</script>

<style scoped>
</style>