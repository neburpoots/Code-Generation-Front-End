<template>
  <div class="container pt-5">
    <h1 class="title">User management</h1>
    <div class="pb-3">
      Items per page:
      <select
        id="selectNumber"
        class="form-control mb-2"
        v-model="this.pageSize"
        @change="getUsers(0)"
      >
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <label for="iban_search">Search by IBAN:</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          name="iban_search"
          id="iban_search"
          placeholder="NL01INHO0000000001"
          v-model="ibansearch"
        />
        <div class="input-group-append">
          <button
            v-if="!searched"
            class="btn btn-primary"
            type="button"
            @click="searchByIban()"
          >
            Search
          </button>
          <button
            v-if="searched"
            class="btn btn-warning"
            type="button"
            @click="searchClear()"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">UUID</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">IBAN</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <User-Item
          v-for="user in users"
          :key="user.user_id"
          :user="user"
          @selected="userSelected"
        />
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <div class="w-25 pagination">
        <div class="prevbutton mr-auto">
          <button
            v-if="!first"
            @click="prevPage()"
            class="btn btn-primary previous"
          >
            &#x2190;
          </button>
        </div>

        <p class="h4">Page: {{ this.pageNo + 1 }}</p>

        <div class="prevbutton ml-auto">
          <button v-if="!last" @click="nextPage()" class="btn btn-primary next">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";
import UserService from "../../../services/user.service";

export default {
  name: "UserList",
  components: {
    UserItem,
  },
  data() {
    return {
      pageNo: 0,
      pageSize: 5,
      totalPages: 0,
      totalElements: 0,
      first: false,
      last: false,
      ibansearch: "",
      firstname: "",
      lastname: "",
      iban: "",
      account: "",
      users: [],
      searched: false,
    };
  },

  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.getUsers(0);
    },
    getUsers(pageNo) {
      this.ibansearch = "";
      this.searched = false;
      UserService.getUsersWithParameters(
        pageNo,
        this.pageSize,
        this.firstname,
        this.lastname,
        this.iban,
        this.account
      )
        .then((response) => {
          this.users = response.data.content;
          this.pageNo = response.data.number;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.first = response.data.first;
          this.last = response.data.last;
        })
        .catch((error) => {
          this.accounts =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    },
    userSelected(id) {
      this.$router.push("/usermanagement/" + id);
    },
    nextPage() {
      this.getUsers(this.pageNo + 1);
    },
    prevPage() {
      this.getUsers(this.pageNo - 1);
    },
    searchByIban() {
      if (this.ibansearch == "") {
        return;
      }
      UserService.getUsersByIban(this.pageNo, this.pageSize, this.ibansearch)
        .then((response) => {
          this.users = response.data.content;
          this.pageNo = response.data.number;
          this.totalElements = response.data.totalElements;
          this.totalPages = response.data.totalPages;
          this.first = response.data.first;
          this.last = response.data.last;
          this.searched = true;
        })
        .catch((error) => {
          this.accounts =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alert("IBAN not found!");
        });
    },
    searchClear() {
      this.ibansearch = "";
      this.searched = false;
      this.loadItems();
    },
  },
};
</script>

<style>
</style>