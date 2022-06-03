<template>
  <div class="container pt-5">
    <h1 class="title pb-5">User management</h1>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">IBAN</th>
        </tr>
      </thead>
      <tbody>
        <User-Item
          v-for="user in users"
          :key="user.user_id"
          :user="user"
    />
      </tbody>
    </table>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";
import userService from "../../../services/user.service";

export default {
  name: "UserList",
  components: {
    UserItem,
  },
  data() {
    return {
      pageNo: 0,
      pageSize: 20,
      firstname: "",
      lastname: "",
      iban: "",
      account: "",
      users: [],
    };
  },

  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.getUsers();
    },
    getUsers() {
      userService
        .getUsersWithParameters(
          this.pageNo,
          this.pageSize,
          this.firstname,
          this.lastname,
          this.iban,
          this.account
        )
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>