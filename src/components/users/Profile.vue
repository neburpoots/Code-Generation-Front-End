<template>
  <div class="container pt-5">
    <header class="jumbotron">
      <h3 class="text-dark">
        Profile: <strong>{{currentUser.firstname + " " + currentUser.lastname}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.user_id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <p>
      <strong>Transaction limit:</strong>
      € {{currentUser.transaction_limit.toFixed(2)}}
    </p>
    <p>
      <strong>Daily limit:</strong>
      € {{currentUser.daily_limit.toFixed(2)}}
    </p>
    <p>
      <strong>Roles: </strong>
      <ul>
        <li v-for="role in currentUser.role" :key="role">{{role.role_id + ": " + role.name}}</li>
      </ul>    
    </p>
    <a href="/changepassword" class="btn mb-5 btn-warning">Change password</a>
  </div>
</template>
<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.userObject;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>