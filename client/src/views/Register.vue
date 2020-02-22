<template>
  <div class="q-pa-md background">
    <q-card
      elevated
      class="q-pa-lg q-mx-auto shadow-10 bg-grey-2"
      style="width: 50%; margin-top:10%;"
    >
      <form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
        class="q-gutter-md justify-center flex-column animated fadeIn slow"
      >
        <h4 class="text-weight-bold text-center">REGISTER</h4>
        <!-- username email password phone -->
        <q-input
          ref="username"
          v-model="username"
          type="text"
          label="Username"
          hint="Min. 6 characters"
          color="purple-12"
          filled
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Username is required',
            (val) => val.length > 5 || 'Username min. 6 characters'
          ]"
        />

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
          v-model="password"
          filled
          :type="isPwd ? 'password' : 'text'"
          label="Password *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Password is required',
            (val) => val.length > 5 || 'Password min. 6 characters'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          ref="phone"
          v-model="phone"
          type="text"
          label="Phone Number"
          color="purple-12"
          filled
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Phone number is required',
            (val) =>
              (val.length > 10 && val.length < 13) ||
              'Phone number length must be either 11 or 12 characters'
          ]"
        />

        <div class="flex justify-end">
          <q-btn
            flat
            rounded
            to="/login"
            class="text-body1 text-right text-blue-10 q-ma-none"
            >Sign In</q-btn
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
      </form>
    </q-card>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  name: 'Register',
  data() {
    return {
      username: null,
      email: null,
      password: null,
      phone: null,
      loading: false,
      isPwd: true
    }
  },

  methods: {
    onSubmit() {
      this.$refs.username.validate()
      this.$refs.email.validate()
      this.$refs.password.validate()
      this.$refs.phone.validate()
      this.loading = true

      if (
        this.$refs.username.hasError ||
        this.$refs.password.hasError ||
        this.$refs.email.hasError ||
        this.$refs.phone.hasError
      ) {
        this.formHasError = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      } else {
        axios({
          method: 'POST',
          url: '/register',
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            phone: this.phone
          }
        })
          .then(({ data }) => {
            this.loading = false
            // token,username,email
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('email', data.email)
            this.$store.state.isLogin = true
            this.$router.replace('/')
            this.$q.notify({
              type: 'positive',
              message: 'Submitted'
            })
          })
          .catch((err) => {
            this.loading = false
            this.$q.notify({
              type: 'negative',
              message: err.response.data.msg.toUpperCase()
            })
          })
      }
    },

    onReset() {
      this.username = null
      this.email = null
      this.password = null
      this.phone = null
      this.$refs.username.resetValidation()
      this.$refs.email.resetValidation()
      this.$refs.password.resetValidation()
      this.$refs.phone.resetValidation()
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
