<template>
  <q-header elevated class="bg-indigo-5">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="$emit('open')"
        aria-label="Menu"
        icon="menu"
      />

      <q-toolbar-title
        class="text-h5 text-weight-bold"
        style="cursor: pointer;"
        @click="$router.push('/')"
      >
        PC-Corner
      </q-toolbar-title>

      <div class="flex">
        <div class="q-mr-sm">
          <q-btn flat round icon="shopping_cart" @click="toCart">
            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
              content-class="bg-deep-purple"
            >
              <span class="text-center text-weight-bold text-caption">
                Lihat Keranjang
              </span>
            </q-tooltip>
            <q-badge color="red" align="bottom" floating v-if="isLogin">{{
              cartListAmount
            }}</q-badge>
          </q-btn>
        </div>
        <div style="margin: auto;">
          <q-btn
            outline
            class="text-weight-bold flex justify-center"
            style="margin: auto 0;"
            @click="$router.push('/login')"
            v-if="!isLogin"
          >
            Login
          </q-btn>
          <q-btn
            outline
            class="text-weight-bold flex justify-center"
            style="margin: auto 0;"
            @click="confirm = true"
            v-if="isLogin"
          >
            Logout
          </q-btn>
        </div>
      </div>

      <div v-if="confirm">
        <Confirm
          :active="confirm"
          :msg="'Anda yakin ingin logout?'"
          @OK="logout"
          @cancel="confirm = false"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import Confirm from '../components/Confirm'
export default {
  name: 'Navbar',
  components: {
    Confirm
  },
  data() {
    return {
      leftDrawerOpen: false,
      confirm: false
    }
  },
  created() {
    const { isLogin, cartList } = this.$store.state
    if (!isLogin) {
      this.$store.dispatch('GET_LOGIN_STATUS')
    }

    if (cartList.length == 0) {
      this.$store.dispatch('GET_USER_CART')
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    isAdmin() {
      return this.$store.state.isAdmin
    },
    cartListAmount() {
      return this.$store.state.cartList.length
    }
  },
  methods: {
    toCart() {
      if (!this.isLogin) {
        this.$q.notify({
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'black',
          classes: 'glossy',
          message: 'Login untuk melanjutkan'
        })
        this.$router.push('/login')
      } else {
        this.$router.push('/cart')
      }
    },
    getUserCart() {
      this.$store.dispatch('GET_USER_CART')
    },
    logout() {
      this.$store.dispatch('GET_LOGOUT')
      this.$router.push('/')
      this.$q.notify({
        type: 'positive',
        message: `Logout Success`
      })
    }
  }
}
</script>

<style></style>
