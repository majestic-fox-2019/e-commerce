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
        @click="$emit('open')"
      >
        PC-Corner
      </q-toolbar-title>

      <div class="flex">
        <div class="q-mr-sm">
          <q-btn flat round icon="shopping_cart">
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
            @click="logout"
            v-if="isLogin"
          >
            Logout
          </q-btn>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  created() {
    this.$store.dispatch('GET_LOGIN_STATUS')
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('GET_LOGOUT')
      this.$q.notify({
        type: 'positive',
        message: `Logout Success`
      })
    }
  }
}
</script>

<style></style>
