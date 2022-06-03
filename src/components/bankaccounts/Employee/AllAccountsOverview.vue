<template>
<div class="container pt-5">
<h1 class="title pb-5">Bank account management</h1>
<a href="/accountcreate" class="create">
  <button class="btn mb-5 btn-primary">Create account</button>
</a>
<div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
  {{ message }}
</div>
<table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Iban</th>
      <th scope="col">E-mail</th>
      <th scope="col">Name</th>
      <th scope="col">Balance</th>
      <th scope="col">Status</th>
      <th scope="col">Account type</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <All-Acounts-List-Item
          v-on:content-block-remove="remove"
          v-for="account in accounts.content"
          :key="account.account_id"
          :account="account"
    />
  </tbody>
</table>
    <div class="d-flex justify-content-center">
        <div class="w-25 pagination">
            <div class="prevbutton mr-auto">
                <button v-if="pageable.pageNumber !== 0" @click="prevPage(pageable.pageNumber)" class="btn btn-primary previous">&#x2190;</button>
            </div>
                <p class="h4">Page: {{pageable.pageNumber + 1}}</p>
            
            <div class="prevbutton ml-auto">
                <button v-if="pageable.pageNumber + 1 !== accounts.totalPages" @click="nextPage(pageable.pageNumber)"  class="btn btn-primary next">&#8594;</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import bankaccountService from "../../../services/bankaccount.service";
import AllAcountsListItem from "./AllAccountsListItem";

export default {
  name: "AllAccountsOverview",
  components: {
    AllAcountsListItem,
  },
  data() {
    return {
      accounts: [],
      pageable: Object,
      successful: false,
      loading: false,
      message: "",
    };
  },
  methods: {
    remove() {
      // OrderService.deleteOrder(id).then(
      //   (data) => {
      //       this.orders.data = this.orders.data.filter(item => item.id !== id);
      //       this.message = data.data.message;
      //       this.successful = true;
      //       this.loading = false;
      //   },
      //   (error) => {
      //     this.products =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //   }
      // );
    },

    nextPage(currentPage) {
        currentPage++
        this.getOrdersPagination(currentPage);
    },

    prevPage(currentPage) {
        currentPage--
        this.getOrdersPagination(currentPage);
    },

    getOrdersPagination(page) {
      bankaccountService.getAllBankAccounts(page).then(
        (response) => {
            this.accounts = response.data;
            this.pageable = response.data.pageable;
            console.log(this.accounts)

            console.log(this.pageable);
          },
        (error) => {
            this.accounts =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
  mounted() {
    this.getOrdersPagination(0);
  }

};
</script>

<style>

</style>