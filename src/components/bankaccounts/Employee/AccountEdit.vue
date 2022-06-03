<template>
  <div class="container mt-5">
    <h1>Account edit</h1>
    <h2>Editing account {{ account.account_id }}</h2>
    <div class="card card-container p-3">
      <Form @submit="accountEdit" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Absolute limit</label>
            <Field
              v-model="account.absoluteLimit"
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
            <label for="status"
              >Account active? (uncheck to freeze account)</label
            >
            <input
              name="status"
              type="checkbox"
              v-model="account.status"
              class="form-control"
            />
            <ErrorMessage name="status" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm">
              </span>
              Edit Account
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
import BankAccountService from "../../../services/bankaccount.service";
import * as yup from "yup";

export default {
  name: "AccountEdit",
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
      absolute_limit: yup
        .number()
        .required("Absolute limit is required")
        .nullable(false)
        .min(-10000, "Absolute limit can't be lower then 10000")
        .max(0, "Absolute limit has to be 0 or lower"),
      status: yup.boolean(),
    });
    return {
      successful: false,
      account: Object,
      user: Object,
      loading: false,
      message: "",
      schema,
    };
  },

  mounted() {
    BankAccountService.getSingleBankAccount(this.id).then(
      (response) => {
        this.user = response.data.user;
        this.account = response.data;
      },
      (error) => {
        this.account =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    accountEdit() {
      this.message = "";
      this.successful = false;
      this.loading = true;

      BankAccountService.editAccount(
        this.account,
        this.account.account_id
      ).then(
        (data) => {
          this.user = data.data.user;
          this.account = data.data;
          this.successful = true;
          this.loading = false;
          this.message = "Account edited";
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