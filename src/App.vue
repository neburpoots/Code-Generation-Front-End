<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script>
import EventBus from "./common/EventBus";
import Footer from './components/layout/Footer.vue';
import Header from './components/layout/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  beforeUnmount() {
      EventBus.remove("logout");
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
}
</script>

<style src="@/assets/styles.css">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

</style>