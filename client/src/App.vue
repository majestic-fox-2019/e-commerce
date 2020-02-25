<template>
<div class="bodytemplate">
  <v-app>
    <navbar></navbar>
    <!-- LOGIN AND REGISTER FORM -->
    <loginregister v-if="!alreadyLogin">
      <!-- <loginregister> -->
    </loginregister>
    <update v-if="isUpdated && alreadyLogin"></update>
    <homepage></homepage>
  </v-app>
</div>
</template>

<script>
import loginregister from './components/loginregister.vue';
import navbar from './components/navbar.vue';
import homepage from './components/homepage.vue';
import update from './components/update.vue';

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
  },
  components: {
    loginregister,
    navbar,
    homepage,
    update,
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
