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
        <v-btn text @click.prevent="showCart">
          <v-badge color="red" :content="carts.length">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </v-btn>

        <v-btn text @click="openShop">
          <h2>Sell Item</h2>
        </v-btn>

        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  color="green"
                  style="color: white; width: 100%;"
                  @click.prevent="transaction"
                >
                  Your Transaction
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  color="red"
                  style="color: white; width: 100%;"
                  @click.prevent="logout"
                  >Logout</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <CreateShop />
  </div>
</template>

<script>
import CreateShop from '@/components/CreateShop'
import Swal from 'sweetalert2'

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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        if (result.value) {
          this.$router.push('/')
          this.$store.dispatch('LOGOUT')
        }
      })
    },
    openShop() {
      if (this.$store.state.userProfile.role === 'basic') {
        this.$store.commit('DIALOG_CHANGE_SHOP', true)
      } else {
        this.$router.push('/panel')
      }
    },
    showCart() {
      this.$router.push('/carts')
    },
    transaction() {
      console.log('HEHEHEHE')
      this.$router.push('/user/transaction')
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus
    },
    carts() {
      return this.$store.state.userCarts
    },
    userProfile() {
      return this.$store.state.userProfile
    }
  }
}
</script>

<style lang="css" scoped></style>
