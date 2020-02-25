<template>
    <v-app-bar
      app
      color="#007eb8"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink"
          contain
          src="@/assets/o.png"
          transition="scale-transition"
          width="20%"
        />
        <h1 style="margin-left: -20px">Commerce</h1>
      </div>

      <v-spacer></v-spacer>

      <!-- Admin Menu -->
      <div v-if="userLoginData.role == 'Admin'" class="d-inline-flex">
        <router-link :to="{name: 'home'}">
          <v-btn
            text
            v-if="isLogin"
          >
            <v-icon>mdi-home</v-icon>
            <span class="ml-2 menu-text">Home</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'ebooks'}">
          <v-btn
            text
          >
            <v-icon>mdi-notebook</v-icon>
            <span class="ml-2 menu-text">Ebooks</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'tutorials'}">
          <v-btn
            text
          >
            <v-icon>mdi-library-video</v-icon>
            <span class="ml-2 menu-text">Tutorials</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'users'}">
          <v-btn
            text
          >
            <v-icon>mdi-account-details</v-icon>
            <span class="ml-2 menu-text">User</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'banners'}">
          <v-btn
            text
          >
            <v-icon>mdi-format-wrap-square</v-icon>
            <span class="ml-2 menu-text">Banner</span>
          </v-btn>
        </router-link>
      </div>
      <!-- End Admin Menu -->


      <!-- User Menu -->
      <div v-if="userLoginData.role == 'User'" class="d-inline-flex">
        <router-link :to="{name: 'ebooks_front'}">
          <v-btn
            text
          >
            <v-icon>mdi-notebook</v-icon>
            <span class="ml-2 menu-text">Ebooks</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'tutorials_front'}">
          <v-btn
            text
          >
            <v-icon>mdi-library-video</v-icon>
            <span class="ml-2 menu-text">Tutorials</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <v-btn
            text
          >
            <v-icon>mdi-cart-outline</v-icon>
            <span class="ml-2 menu-text">{{carts_total}}</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <v-btn
            text
          >
            <v-icon>mdi-heart-outline</v-icon>
            <span class="ml-2 menu-text">{{loves_total}}</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'cart'}">
          <v-btn
            text
          >
            <v-icon>mdi-bookmark-outline</v-icon>
            <span class="ml-2 menu-text">{{bookmarks_total}}</span>
          </v-btn>
        </router-link>
      </div>
      <!-- End User Menu -->

      <v-btn
        text
        v-if="isLogin"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>
</template>
<script>
import parseJwt from '../helpers/jwtParser';

export default {
  methods: {
    login() {
      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('setIsLogin', false);
      this.login();
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userLoginData() {
      if (this.isLogin) {
        return parseJwt(this.isLogin);
      }
      return {
        role: 'User',
      };
    },
    carts_total() {
      return this.$store.state.carts_total;
    },
    loves_total() {
      return this.$store.state.loves_total;
    },
    bookmarks_total() {
      return this.$store.state.bookmarks_total;
    }
  },
};
</script>
<style scoped>
    .menu-text{
      color: white;
      text-decoration: none;
    }
</style>
