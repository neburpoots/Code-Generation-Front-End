<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Videocard webshop v2</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Videocards
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/myorders" class="nav-link">My orders</router-link>
        </li>
        <li v-if="currentUser && adminAccess" class="nav-item">
          <router-link to="/productmanagement" class="nav-link">Product management</router-link>
        </li>
        <li v-if="currentUser && adminAccess" class="nav-item">
          <router-link to="/ordermanagement" class="nav-link">Order management</router-link>
        </li>
      </div>
      <div class="navbar-nav ml-auto">
          <router-link to="/shoppingcart" class="nav-link">
            <font-awesome-icon icon="basket-shopping" /> Shopping cart
          </router-link>
      </div>
      <div v-if="!currentUser" class="navbar-nav">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>
      <div v-if="currentUser" class="navbar-nav">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.user.email }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    currentUser() {
      return this.$store.state.auth.userObject;
    },
    adminAccess() {
      return this.$store.state.auth.userObject.user.is_admin;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>