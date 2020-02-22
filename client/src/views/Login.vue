<template>
  <div class="q-pa-md background">
    <q-card
      elevated
      class="q-pa-lg q-mx-auto shadow-10 bg-grey-2"
      style="width: 50%; margin-top:10%;"
    >
      <form
        @submit.prevent.stop="onSubmit"
        @reset.prevent.stop="onReset"
        class="q-gutter-md justify-center flex-column animated fadeIn slow"
      >
        <h4 class="text-weight-bold text-center">LOGIN</h4>
        <q-input
          ref="email"
          v-model="email"
          type="email"
          label="Email *"
          color="purple-12"
          filled
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
        />

        <q-input
          ref="password"
          filled
          type="password"
          v-model="password"
          label="Password *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Password is required'
          ]"
        />

        <div class="flex justify-end">
          <q-btn
            flat
            rounded
            to="/register"
            class="text-right text-blue-10 q-ma-none"
            >Create an account</q-btn
          >
        </div>

        <div class="flex justify-center">
          <q-btn
            :loading="loading"
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="negative"
            outline
            class="q-ml-sm"
          />
        </div>
        <div class="flex-column full-width text-center">
          <p class="text-center">-OR-</p>
          <q-btn
            label="Google"
            :loading="loading2"
            type="button"
            color="primary"
            @click="gSignIn"
          />
        </div>
      </form>
    </q-card>
  </div>
</template>

<script>
import axios from '../axios'
import firebase from 'firebase'
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      loading2: false
    }
  },

  methods: {
    onSubmit() {
      this.loading = true
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (this.$refs.email.hasError || this.$refs.password.hasError) {
        this.formHasError = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } else {
        axios({
          method: 'POST',
          url: '/login',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then(({ data }) => {
            // console.log(data)
            this.loading = true
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('email', data.email)
            this.$store.state.isLogin = true
            console.log(data.isAdmin)
            if (data.isAdmin) {
              localStorage.setItem('isAdmin', data.isAdmin)
              this.$router.replace('/admin/dashboard')
            } else {
              this.$router.replace('/')
            }
            this.$store.dispatch('GET_LOGIN_STATUS')
            this.$q.notify({
              type: 'positive',
              message: `Welcome ${data.username}`
            })
          })
          .catch((err) => {
            this.loading = false
            // console.log(err.response.data)
            this.$q.notify({
              type: 'negative',
              message: err.response.data.msg.toUpperCase()
            })
          })
      }
    },
    gSignIn() {
      this.loading2 = true
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          const token = result.credential.accessToken
          const user = result.user
          // console.log(user)
          return axios({
            method: 'POST',
            url: '/g-sign-in',
            data: {
              username: user.displayName,
              email: user.email
            }
          })
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          this.$store.state.isLogin = true
          this.$router.replace('/')
          this.loading2 = false
          this.$q.notify({
            type: 'positive',
            message: `Welcome ${data.username}`
          })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          const email = error.email
          const credential = error.credential
          this.loading2 = false
          this.$q.notify({
            type: 'negative',
            message: errorMessage
          })
        })
    },
    onReset() {
      this.email = null
      this.password = null

      this.$refs.email.resetValidation()
      this.$refs.password.resetValidation()
    }
  }
}
</script>

<style scoped>
.background {
  background: url('https://picsum.photos/1920/1440?random=1');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  min-height: 100%;
}
</style>
