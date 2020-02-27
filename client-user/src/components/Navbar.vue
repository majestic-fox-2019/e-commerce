<template>
  <v-app-bar fixed tile dense color="#bdc3c7" app>
    <router-link :to="{name: 'Store'}" class="d-flex align-center" style="text-decoration:none">
      <img src="@/assets/icon.png" alt />
      <v-toolbar-title class="ml-3 title-nav" style="color:black">Good Games</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-btn
      :to="{name: 'Activity'}"
      v-if="isLogin"
      style="text-decoration:none"
      class="ma-2"
      color="primary"
    >
      Activity
      <v-icon right>mdi-clipboard-list</v-icon>
    </v-btn>
    <v-btn
      class="ma-2"
      color="primary"
      style="text-decoration:none"
      :to="{name: 'Cart'}"
      v-if="isLogin"
    >
      Cart
      <v-badge color="red" :content="totalCart">
        <v-icon right>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <div class="my-2">
      <v-btn
        class="ma-2"
        style="text-decoration:none"
        color="success"
        v-if="isLogin"
        @click="logout"
      >
        Logout
        <v-icon right>mdi-exit-run</v-icon>
      </v-btn>
      <router-link :to="{name: 'Login'}" style="text-decoration:none;">
        <v-btn class="ma-2" color="success" v-if="!isLogin">Login / Register</v-btn>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script>
import { Toast } from "../api/swal";

export default {
  data() {
    return {
      totalCart: null
    };
  },
  props: ["processcart"],
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch("checkLoginStatus");
      this.$router.push({ name: "Store" }).catch(() => {});

      Toast.fire({
        icon: "success",
        title: "Sign out Success!",
        timer: 1000
      });
    },
    countCart() {
      this.$axios
        .get("/carts", {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          let temp = null;
          res.data.Carts.forEach(el => {
            temp += el.amount;
          });
          this.totalCart = temp;
        })
        .catch(() => {});
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  created() {
    this.countCart();
    this.$store.dispatch("checkLoginStatus");
  },
  watch: {
    processcart() {
      this.processcart ? this.countCart() : null;
      this.$emit("doneCount");
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Acme&display=swap");

.title-nav {
  font-family: "Acme";
  font-size: 25px;
  font-weight: bold;
}

img {
  height: 40px;
  width: 40px;
}
</style>