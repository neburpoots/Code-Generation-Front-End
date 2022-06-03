<template>
  <div class="container mt-5">
    <h1>User edit</h1>
    <h2>Editing user: {{ user.firstname }} {{ user.lastname }}</h2>
    <Form @submit="editUser" :validation-schema="schema">
      <div v-if="!successful">
        <div class="form-group">
          <label for="firstname">First name</label>
          <Field
            v-model="user.firstname"
            name="firstname"
            type="text"
            class="form-control"
          />
          <ErrorMessage name="firstname" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
          <label for="lastname">Last name</label>
          <Field
            v-model="user.lastname"
            name="lastname"
            type="text"
            class="form-control"
          />
          <ErrorMessage name="lastname" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <Field
            v-model="user.email"
            name="email"
            type="email"
            class="form-control"
            :disabled="ownInfo"
          />
          <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>

        <label for="roles">Roles: </label>
        <div class="form-check" id="roles">
          <input
            class="form-check-input"
            type="checkbox"
            value="1"
            id="customer"
            v-model="customer"
            :disabled="ownInfo"
          />
          <label class="form-check-label" for="customer"> Customer </label>
          <br />
          <input
            class="form-check-input"
            type="checkbox"
            value="1"
            id="employee"
            v-model="employee"
            :disabled="ownInfo"
          />
          <label class="form-check-label" for="employee"> Employee </label>
        </div>
        <div class="form-group">
          <label class="mt-3" for="daily_limit">Daily limit</label>
          <Field
            v-model="user.daily_limit"
            name="daily_limit"
            type="daily_limit"
            class="form-control"
          />
          <ErrorMessage name="daily_limit" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
          <label class="mt-3" for="transaction_limit">Daily limit</label>
          <Field
            v-model="user.transaction_limit"
            name="transaction_limit"
            type="transaction_limit"
            class="form-control"
          />
          <ErrorMessage
            name="transaction_limit"
            class="error-feedback text-danger"
          />
        </div>
        <button class="btn btn-primary btn-block mt-4 mb-2" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm">
          </span>
          Edit User
        </button>
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
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "../../../services/user.service";
import * as yup from "yup";

export default {
  name: "UserEdit",
  props: {
    id: String,
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("First name is required")
        .nullable(false),
      lastname: yup.string().required("Last name is required").nullable(false),
      email: yup
        .string()
        .required("Email is required")
        .nullable(false)
        .email("Not a valid email"),
    });
    return {
      user: Object,
      customer: false,
      employee: false,
      ownInfo: false,
      loading: false,
      successful: false,
      message: "",
      schema,
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.getUser();
    },
    getUser() {
      UserService.getUser(this.id)
        .then((response) => {
          this.user = response.data;
          console.log(response.data);
          this.setRoles(this.user.role);
          this.checkOwn();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setRoles(roles) {
      roles.forEach((role) => {
        if (role.role_id == 1) {
          this.customer = true;
        }
        if (role.role_id == 2) {
          this.employee = true;
        }
      });
    },
    checkOwn() {
      if (this.user.user_id == this.$store.state.auth.userObject.user_id) {
        this.ownInfo = true;
      }
    },
    editUser() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(this.user);
      let roles = [];
      if (this.customer) {
        roles.push(1);
      }
      if (this.employee) {
        roles.push(2);
      }
      UserService.editUser(this.user, roles, this.id).then(
        () => {
          this.successful = true;
          this.loading = false;
          this.message = "User edited";
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
    },
  },
};
</script>

<style scoped>
input[type="checkbox"],
input[type="radio"] {
  width: fit-content;
}
</style>