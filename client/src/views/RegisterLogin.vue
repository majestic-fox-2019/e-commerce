<template>
  <div>
    <div class="bgr"></div>
    <el-row :gutter="20" style="display:flex; justify-content:center">
      <el-col
        :span="8"
        style="background-color: rgba(97, 36, 229, 0.75); margin-top:27vh; padding-top:5vh;"
      >
        <Register v-if="register" />
        <Login @login="loginNya" v-if="login" />
        <button @click.prevent="showRegister">show register</button>
        <button @click.prevent="showLogin">show login</button>
        <button @click.prevent="googleAuth">Google</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import router from '../router'
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
    },
    loginNya() {
      this.$emit('login')
    },
    googleAuth() {
      let email = null
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          console.log('user', GoogleUser.Qt)
          axios({
            method: 'post',
            url: `${this.$store.state.baseUrl}/users/gauth`,
            data: {
              name: GoogleUser.Qt.Ad,
              email: GoogleUser.Qt.zu
            }
          })
            .then(({ data }) => {
              console.log(data, 'ini data google auth')
              email = data.email
              localStorage.setItem('e_musicToken', data.token)
              localStorage.setItem('e_musicEmail', data.email)
              localStorage.setItem('e_musicId', data.id)
              router.push({
                path: '/'
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(error => {
          //on fail do something
          console.log(error)
        })
      this.$store.commit('SET_EMAIL', email)
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
<style scoped>
.bgr {
  background: url('../assets/background.svg');
  background-position: center;
  background-size: cover;
  position: absolute;
  z-index: -10;
  width: 100%;
  height: 95%;
}
</style>
