<template>
  <div class="container mt-5">
    <h1>Product edit</h1>
    <div class="card card-container p-3">
      <Form @submit="editProduct" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Name</label>
            <Field v-model="product.name" name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
          </div>
          <div class="previewimage">
            <img class="previewimage" v-if="previewImage" :src=previewImage />
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <Field id="imageinput" name="image" type="file" @change="previewFiles" accept="image/*" class="form-control-file" />
            <ErrorMessage name="image" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <Field v-model="product.price" name="price" type="number" class="form-control" />
            <ErrorMessage name="price" class="error-feedback text-danger" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm">
              </span>
              Edit product
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
  name: "ProductEdit",
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
      name: yup
        .string()
        .required("Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(100, "Must be maximum 50 characters!"),
      image: yup
        .mixed()
        .notRequired()
        .nullable()
        .when('image', {
            is: (value) => value?.length,
            then: (rule) => rule.test('fileType', 'Unsupported File Format', function (value) {
            if(value !== undefined) {
              if(value.length === 0) return;
              const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
              return SUPPORTED_FORMATS.includes(value[0].type)
              
            }
        }),
        }),

      price: yup
        .number()
        .required("Price is required!")
        .min(0, "Must be at least 0 euros")
    }, ['image', 'image']);
    return {
      successful: false,
      product: Object,
      loading: false,
      message: "",
      previewImage: null,
      currentImage: null,
      schema,
    };
  },
  mounted() {
    ProductService.getOneProduct(this.id).then(
      (response) => {
        this.product = response.data.data;
        console.log(this.product);
        this.previewImage = response.data.data.image;
      },
      (error) => {
        this.products =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    editProduct(product) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      if(!this.currentImage) {
        product.image = this.product.image;
      }

      ProductService.putProduct(product, this.product.id).then(
        (data) => {
            this.message = data.data.message;
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
    },
    previewFiles(event) {
      if(event.target.files.length !== 0) {
        this.currentImage = event.target.files[0];
        this.previewImage = URL.createObjectURL(event.target.files[0]);
      } else {
        this.previewImage = null;
        this.currentImage = null;
      }
    }
  },
};
</script>
<style scoped>

</style>