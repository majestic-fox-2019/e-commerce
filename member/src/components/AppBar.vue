<template>
  <v-app-bar app color="teal" dark>
    <div class="d-flex align-center" @click.prevent="$router.push('/')">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="40"
      />
      <h2>Outdoors</h2>
    </div>
    <v-spacer></v-spacer>

    <div v-if="loginStatus">
      <v-btn class="mr-5" @click.prevent="$router.push('/carts')" text>
        <v-icon>mdi-heart</v-icon>
        <span class="mr-2">0</span>
      </v-btn>
      <v-btn class="mr-5" @click.prevent="$router.push('/carts').catch(err => null)" text>
        <v-icon>mdi-cart</v-icon>
        <span class="mr-2">{{Array.isArray(carts) ? carts.length : 0}}</span>
      </v-btn>
      <!-- <v-btn href target="_blank" text> -->
      <span>{{user && user}}</span>
      <v-icon class="mr-4">mdi-account-circle</v-icon>
      <!-- </v-btn> -->
      <v-btn text @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </div>

    <v-btn v-else text @click="$router.push('/login')">
      <span class="mr-2">login</span>
      <v-icon>mdi-account-box</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import swal from "sweetalert2";
export default {
  data() {
    return {};
  },
  computed: {
    loginStatus() {
      return this.$store.state.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
    carts() {
      return this.$store.state.carts;
    }
  },
  methods: {
    logout() {
      swal.fire("", "Are you sure?", "warning").then(result => {
        if (result.value) {
          this.$store.commit("logout");
          this.$router.push("/");
        }
      });
    },
    login() {
      this.$store.commit("login");
    }
  }
};
</script>

<style>
</style>