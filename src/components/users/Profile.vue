<template>
  <div class="container pt-5">
    <header class="jumbotron">
      <h3 class="text-dark">
        Profile: <strong>{{currentUser.user.name}}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.user.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.user.email}}
    </p>
    <p>
      <strong>Role: </strong>
      {{currentUser.user.is_admin ? "Admin" : "Normal user"}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.userObject;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>