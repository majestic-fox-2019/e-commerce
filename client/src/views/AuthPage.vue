<template>
  <div>
    <div class="form">
      <h1 v-if="!register">Login</h1>
      <h1 v-else>Register</h1>
      <LoginForm v-if="!register" />
      <RegisterForm v-else />
      <h4 v-if="register">
        Already have an account?
        <a href="#" @click.prevent="changeRegisterStatus(false)">Login here</a>
      </h4>
      <h4 v-else>
        Dont have an account?
        <a href="#" @click.prevent="changeRegisterStatus(true)"
          >Register here</a
        >
      </h4>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'AuthPage',
  data() {
    return {}
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    changeRegisterStatus(val) {
      this.$store.commit('CHANGE_REGISTER', val)
    }
  },
  computed: {
    register() {
      return this.$store.state.registerStatus
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.state.loginStatus) {
        next('/')
      } else {
        next()
      }
    })
  },
  mounted() {
    this.$store.dispatch('FETCH_CITY')
  }
}
</script>

<style lang="css" scoped>
div {
  position: relative;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form {
  padding: 5vh 5vw;
  margin-bottom: 0;
  border: 2px solid black;
  width: 50%;
}
.form h1 {
  margin-bottom: 15px;
  text-align: center;
}
.form h4 {
  margin-top: 15px;
}
</style>
