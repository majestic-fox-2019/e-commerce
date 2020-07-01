<template>
<div class="bodytemplate">
  <v-app>
    <navbar></navbar>
    <banner v-if="alreadyLogin && !isAdmin && !isDetails"></banner>
    <!-- LOGIN AND REGISTER FORM -->
    <loginregister v-if="!alreadyLogin">
      <!-- <loginregister> -->
    </loginregister>
    <!-- <router-view /> -->
    <showcart v-if="showCart && alreadyLogin"></showcart>
    <update v-if="isUpdated && alreadyLogin"></update>
    <homepageadmin v-if="alreadyLogin"></homepageadmin>
    <prodcutdetails v-if="alreadyLogin && isDetails"></prodcutdetails>
  </v-app>
</div>
</template>

<script>
import loginregister from './components/loginregister.vue';
import navbar from './components/navbar.vue';
import homepageadmin from './components/homepageadmin.vue';
import update from './components/update.vue';
import prodcutdetails from './components/details.vue';
import banner from './components/banner.vue';
import showcart from './components/showCart.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
    isUpdated() {
      return this.$store.state.isUpdate;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    showCart() {
      return this.$store.state.showCart;
    },
    isDetails() {
      return this.$store.state.isDetails;
    },
  },
  components: {
    loginregister,
    showcart,
    navbar,
    homepageadmin,
    update,
    prodcutdetails,
    banner,
  },
};
</script>

<style>
header {
  height: 80px;
};
.container {
  margin-top: 5%;
};
.bodytemplate {
  margin: 0%;
};
</style>
