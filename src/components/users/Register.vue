<template>
  <div class="container mt-5">
    <h1>Register</h1>
    <div class="card card-container p-3">
      <Form @submit="registerUser" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="firstname">First name</label>
            <Field name="firstname" type="text" class="form-control" />
            <ErrorMessage name="firstname" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <label for="lastname">Last name</label>
            <Field name="lastname" type="text" class="form-control" />
            <ErrorMessage name="lastname" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
            <p>Password must contain:</p>
            <ul>
              <li>A lower letter</li>
              <li>A capital letter</li>
              <li>A number</li>
              <li>A special character</li>
            </ul>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Password repeat</label>
            <Field
              name="password_confirmation"
              type="password"
              class="form-control"
            />
            <ErrorMessage
              name="password_confirmation"
              class="error-feedback text-danger"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
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
import UserService from "../../services/user.service";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}$/;
    const schema = yup.object().shape({
      firstname: yup
        .string()
        .required("Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 50 characters!"),
      lastname: yup
        .string()
        .required("Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 50 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(100, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!")
        .matches(regex, "Password does not meet the requirements."),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match!")
        .required("Password confirmation is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    registerUser(user) {
      console.log(user);
      UserService.registerUser(user).then(
        () => {
          this.successful = true;
          this.loading = false;
          this.message = "User registered";
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
</style>