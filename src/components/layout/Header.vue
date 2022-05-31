<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Swaggerbank</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link v-if="currentUser" to="/mybankaccounts" class="nav-link">My Bank accounts</router-link>
        </li>
        <li v-if="currentUser && employeeAccess" class="nav-item">
          <router-link to="/productmanagement" class="nav-link">Bank account management</router-link>
        </li>
        <li v-if="currentUser && employeeAccess" class="nav-item">
          <router-link to="/ordermanagement" class="nav-link">User management</router-link>
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
            {{ currentUser.email }}
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
    employeeAccess() {
      return this.$store.state.auth.userObject.role.filter(role => role.name === "ROLE_EMPLOYEE").length > 0;
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