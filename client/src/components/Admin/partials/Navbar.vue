<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="$emit('drawer')" />

      <q-toolbar-title
        @click="$router.push('/admin/dashboard')"
        style="cursor: pointer;"
      >
        PC-Corner Admin Page
      </q-toolbar-title>

      <div class="flex">
        <q-btn outline @click="confirm = true">Logout</q-btn>
      </div>

      <div v-if="confirm">
        <Confirm
          :active="confirm"
          :msg="'Are you sure want to logout?'"
          @OK="logout"
          @cancel="confirm = false"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import Confirm from '../../Confirm'
export default {
  name: 'NavbarAdmin',
  components: {
    Confirm
  },
  data() {
    return {
      confirm: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('GET_LOGOUT')
      this.$router.replace('/')
    }
  }
}
</script>

<style></style>
