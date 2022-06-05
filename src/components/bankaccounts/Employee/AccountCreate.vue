<template>
  <div class="container mt-5">
    <h1>Account create</h1>
    <div class="card card-container p-3">
      <div class="form-group">
      <input class="mr-2" type="checkbox" id="checkbox" v-model="searchForNoAccountUsers" @change="toggleSearch()" />
      <label for="checkbox">Filter for users who have no bank account</label>
      </div>
      <div>
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">User id</th>
              <th scope="col">E-mail</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <User-List-Item
              v-on:selectUser="selectUser"
              v-for="user in users.content"
              :key="user.user_id"
              :user="user"
              :selected="isSelected(user.user_id)"
            />
          </tbody>
        </table>
        <div class="d-flex justify-content-center">
        <div class="w-25 pagination">
            <div class="prevbutton mr-auto">
                <button v-if="pageable.pageNumber !== 0" @click="prevPage()" class="btn btn-primary previous">&#x2190;</button>
            </div>
                <p class="h4">Page: {{pageable.pageNumber + 1}}</p>
            
            <div class="prevbutton ml-auto">
                <button v-if="pageable.pageNumber + 1 !== users.totalPages" @click="nextPage()"  class="btn btn-primary next">&#8594;</button>
            </div>
        </div>
        </div>
      </div>
      <Form @submit="createAccount" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Absolute limit</label>
            <Field
              v-model="absoluteLimit"
              name="absolute_limit"
              type="number"
              class="form-control"
            />
            <ErrorMessage
              name="absolute_limit"
              class="error-feedback text-danger"
            />
          </div>
          <div class="form-group">
            <label for="accounttype">Account type</label>
            <Field
              v-model="selected"
              name="accounttype"
              as="select"
              class="form-control"
            >
              <option selected value="PRIMARY">PRIMARY</option>
              <option value="SAVINGS">SAVINGS</option>
            </Field>
            <ErrorMessage
              name="accounttype"
              class="error-feedback text-danger"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm">
              </span>
              Create product
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";

import * as yup from "yup";
import userService from "../../../services/user.service";
import UserListItem from "./UserListItem.vue";
import bankaccountService from "../../../services/bankaccount.service";
export default {
  name: "AccountCreate",
  components: {
    Form,
    Field,
    ErrorMessage,
    UserListItem,
  },
  data() {
    const schema = yup.object().shape({
      absolute_limit: yup
        .number()
        .required("Absolute limit is required")
        .nullable(false)
        .min(-10000, "Absolute limit can't be lower then -10000")
        .max(0, "Absolute limit has to be 0 or lower"),
      accounttype: yup.mixed().oneOf(["PRIMARY", "SAVINGS"]).defined(),
    });
    return {
      successful: false,
      loading: false,
      selected: "PRIMARY",
      absoluteLimit: 0,
      users: [],
      selectedUser: Object,
      message: "",
      schema,
      page: 0,
      pageable: Object,
      size: 5,
      searchForNoAccountUsers: false
    };
  },
  computed: {

  },
  methods: {
    createAccount() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      console.log(this.selected)

      if(this.selectedUser.user_id) {
        bankaccountService.createAccount(this.selectedUser.user_id, this.selected, this.absoluteLimit).then(
          () => {
            this.message = "Succesfully created account";
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
          }
        );
      } else {
        this.message = "Select a user";
        this.successful = false;
        this.loading = false;
      }
    },

    toggleSearch() {
      console.log(this.searchForNoAccountUsers);
      this.getUsers();
    },

    nextPage() {
      this.page++;
      this.getUsers();
    },

    prevPage() {
      this.page--;
      this.getUsers();
    },

    selectUser(id) {
      this.selectedUser = this.users.content.find(item => item.user_id === id)
    },

    getUsers() {
      userService.getUsersForCreateBankAccount(this.page, this.size, this.searchForNoAccountUsers).then(
        (response) => {
          this.users = response.data;
          this.pageable = response.data.pageable;
          console.log(this.users);
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
    },
    isSelected(id) {
      if(this.selectedUser) {
        if(this.selectedUser.user_id === id) {
          return true;
        }
      }
      return false;
    }
  },

  mounted() {
    this.getUsers();
  },
};
</script>
<style scoped>
</style>