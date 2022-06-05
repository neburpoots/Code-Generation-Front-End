<template>
  <div class="container pt-5">
    <h1 class="title">Change Password</h1>

    <Form @submit="changePassword" :validation-schema="schema">
      <div v-if="!successful">
        <div>
          <label for="current_password">Current password</label>
          <Field
            v-model="currentPassword"
            name="current_password"
            type="password"
            class="form-control"
          />
          <ErrorMessage
            name="current_password"
            class="error-feedback text-danger"
          />
        </div>
        <div>
          <label for="new_password">New password </label>
          <Field
            v-model="newPassword"
            name="new_password"
            type="password"
            class="form-control"
          />
          <ErrorMessage
            name="new_password"
            class="error-feedback text-danger"
          />
          <p>New password must contain:</p>
          <ul>
            <li>A lower letter</li>
            <li>A capital letter</li>
            <li>A number</li>
            <li>A special character</li>
          </ul>
        </div>
        <div>
          <label for="new_password_check">Confirm new password </label>
          <Field
            name="new_password_check"
            type="password"
            class="form-control"
          />
          <ErrorMessage
            name="new_password_check"
            class="error-feedback text-danger"
          />
        </div>
        <button class="btn btn-primary btn-block mt-4 mb-2" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm">
          </span>
          Change password
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
import UserService from "../../services/user.service";
import * as yup from "yup";

export default {
  name: "ChangePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\S+$).{8,20}$/;
    const schema = yup.object().shape({
      current_password: yup.string().required("Password is required"),
      new_password: yup
        .string()
        .required("This field is required")
        .nullable(false)
        .matches(regex, "Password does not meet the requirements."),
      new_password_check: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("new_password"), null], "Passwords must match"),
    });
    return {
      currentPassword: "",
      newPassword: "",
      loading: false,
      successful: false,
      message: "",
      schema,
    };
  },

  mounted() {},
  methods: {
    changePassword() {
      this.message = "";
      this.successful = false;
      this.loading = true;
      console.log(this.currentPassword);
      console.log(this.newPassword);

      UserService.changePassword(this.currentPassword, this.newPassword)
        .then(() => {
          this.successful = true;
          this.loading = false;
          this.message = "Password changed";
        })
        .catch((error) => {
          console.log(error);
          this.message = error.response.data.message;
          this.successful = false;
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>