<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-toolbar-title
        ><router-link
          to="/"
          style="color: white; font-weight: 500; font-size: 24px; text-decoration: none;"
          >Mashumarket</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="notLogin" v-show="!loginStatus">
        <v-btn text @click.prevent="changeRegisterStatus(true)">
          <h2>Register</h2>
        </v-btn>

        <v-btn text @click.prevent="changeRegisterStatus(false)">
          <h2>Login</h2>
        </v-btn>
      </div>

      <div class="isLogin" v-show="loginStatus">
        <v-btn text @click="openShop">
          <h2>Sell Item</h2>
        </v-btn>

        <v-btn text @click.prevent="logout">
          <h2>Logout</h2>
        </v-btn>
      </div>
    </v-app-bar>
    <CreateShop />
  </div>
</template>

<script>
import CreateShop from '@/components/CreateShop'

export default {
  name: 'HeaderNav',
  data() {
    return {}
  },
  components: {
    CreateShop
  },
  methods: {
    changeRegisterStatus(val) {
      if (this.$router.currentRoute.name === 'Home') {
        this.$router.push('/auth')
      }
      this.$store.commit('CHANGE_REGISTER', val)
    },
    logout() {
      this.$router.push('/')
      this.$store.dispatch('LOGOUT')
    },
    openShop() {
      if (this.$store.state.userProfile.role === 'basic') {
        this.$store.commit('DIALOG_CHANGE_SHOP', true)
      } else {
        this.$router.push('/panel')
      }
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style lang="css" scoped></style>
