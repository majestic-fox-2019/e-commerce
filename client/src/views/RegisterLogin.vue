<template>
  <div>
    <el-row :gutter="20" style="display:flex; justify-content:center">
      <el-col
        :span="8"
        style="background-color: grey; margin-top:27vh; padding-top:5vh;"
      >
        <Register v-if="register" />
        <Login v-if="login" />
        <button @click.prevent="showRegister">show register</button>
        <button @click.prevent="showLogin">show login</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'registerLogin',
  components: {
    Register,
    Login
  },
  data() {
    return {
      register: true,
      login: false
    }
  },
  methods: {
    showLogin() {
      this.register = false
      this.login = true
    },
    showRegister() {
      this.login = false
      this.register = true
    }
  },
  created() {
    if (localStorage.e_musicToken) {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style scoped></style>
