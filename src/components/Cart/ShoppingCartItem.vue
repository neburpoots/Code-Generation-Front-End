<template>
  <article
    aria-labelledby="theme-label-2"
    class="bvd-theme mb-3"
    
  >
    <div class="shoppingcartItems card bg-light" >
      <!----><!---->
      <div class="row no-gutters" >
        <div aria-hidden="true" class="bg-dark col-md-6 col-lg-4 col-xl-4">
          <div class="b-aspect d-flex h-100 align-items-center">
            <div class="b-aspect-content flex-grow-1 w-100 mw-100">
              <img
                :src=cartItem.product.image
                alt="Image"
                class="rounded-0 card-img"
                
              />
            </div>
          </div>
        </div>
        <div class="d-flex flex-column p-4 col" >
            <div class="titleandclose d-flex justify-content-between">
                <h2 id="theme-label-2" class="h2 mb-3" >
                    {{ cartItem.product.name }}
                </h2>

                <figure @click="removeCartItem(cartItem.product.id)" class="closebtn">
                    <img src="@/assets/icons/close.svg" alt="" class="close">
                </figure>
            </div>
          <p class="card-text text-muted" >
              <button @click="decreaseQuantity(cartItem.product.id)" class="btn"><p class="h2">-</p></button>
            <span
              class="d-block d-lg-inline-block mb-2 mb-lg-0"
              >
              <strong >Amount:</strong> {{cartItem.quantity}}
            </span>
            <button @click="incrementQuantity(cartItem.product)" class="btn"><p class="h2">+</p></button>
          </p>
          <p class="card-text d-flex align-items-center" >
            <span class="text-muted position-relative ml-3" >
                <strong >Price per unit:</strong> €
                {{ cartItem.product.price}}
            </span>
            <span class="ml-auto text-muted position-relative ml-3" >
                <strong >Total price:</strong> €
                {{ totalPrice }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ShoppingCartItem",
  props: {
    cartItem: Object,
  },
  computed: {

      totalPrice() {
          let tPrice = this.cartItem.quantity * this.cartItem.product.price
          return tPrice.toFixed(2);
      }
  },
  methods: {

      removeCartItem(id) {
        this.$store.dispatch("cart/removeProductFromCart", id);
      },

      incrementQuantity(product) {
        this.$store.dispatch("cart/addProductToCart", product);
      },

      decreaseQuantity(id) {
        this.$store.dispatch("cart/decreaseQuantity", id);
      }
      
  }
};
</script>

<style>
</style>