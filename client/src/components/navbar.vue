<template>
<div>
      <v-app-bar class="grey darken-4" app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.pixabay.com/photo/2016/12/24/01/49/coffee-1928249_960_720.png"
          transition="scale-transition"
          width="40"
        />
        <p>
        Coffee Break
        </p>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div v-if="alreadyLogin">
       <v-btn v-if="!isAdmin" text @click="showCart">
        <span class="mr-2"></span>
        <v-icon>mdi-open-in-new</v-icon>
        Look Your Items: {{$store.state.carts.length}}
      </v-btn>
      </div>
      <v-spacer></v-spacer>
      <h2 v-if="alreadyLogin">
        Heyhoo, {{$store.state.username}}
        </h2>
      <div v-if="alreadyLogin">
       <v-btn text @click="logoutHidden">
        <span class="mr-2"></span>
        <v-icon>mdi-open-in-new</v-icon>
        Logout
      </v-btn>
      </div>
      <!-- <buttonlogout></buttonlogout> -->
    </v-app-bar>
</div>
</template>

<script>

export default {
  name: 'navbar',
  data() {
    return {
      cartItems: this.$store.state.carts,
    };
  },
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
  beforeCreate() {
    return this.$store.dispatch('getCart');
  },
  // watch: {
  //   cartItems:
  // },
  methods: {
    login() {
      if (this.$router.path !== '/') {
        this.$router.push('/');
      }
    },
    logoutHidden() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('username');
      this.$store.commit('loginsetter', false);
      this.$store.commit('logoutupdate', false);
      this.login();
    },
    showCart() {
      this.$store.commit('showCart', true)
    }
  },
};
</script>

<style scoped>

</style>
