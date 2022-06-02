<template>
  <div class="container mt-5">
    <h1>Account create</h1>
    <div class="card card-container p-3">
      <Form @submit="createProduct" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <Field name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
          </div>
          <div class="previewimage">
            <img class="previewimage" v-if="previewImage" :src=previewImage />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <Field name="price" type="number" class="form-control" />
            <ErrorMessage name="price" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm">
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
import ProductService from "../../../services/product.service";

import * as yup from "yup";
export default {
  name: "AccountCreate",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 50 characters!"),
      price: yup
        .number()
        .required("Price is required!")
        .min(0, "Must be at least 0 euros")
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      previewImage: null,
      FILE_SIZE: 160 * 1024,
      SUPPORTED_FORMATS: ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'],
    };
  },
  methods: {
    createProduct(product) {
      this.message = "";
      this.successful = false;
      this.loading = true; 
      
      ProductService.postProduct(product).then(
        (data) => {
            this.message = data.message;
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
    }
  },
};

</script>
<style scoped>

</style>