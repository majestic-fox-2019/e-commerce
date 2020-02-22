<template>
  <v-container>
  <div v-if="showLogin">
    <h1>Login</h1>
    <v-form>
      <v-text-field v-model="emailLogin" label="E-mail" required></v-text-field>
      <v-text-field type="password" v-model="passwordLogin"
       label="Password" required>
      </v-text-field>
      <v-btn color="success" class="mr-4" @click="login">Login</v-btn>
      <v-spacer></v-spacer>
      <span>
        Don't have an account?? click for
         <a @click="showothers"> register </a>.
      </span>
      <!-- <router-link to="/register">register</router-link> -->
    </v-form>
  </div>
  <!-------------------      SHOW REGISTER       ----------------->
    <div v-if="showRegister">
      <h1>Register</h1>
    <v-form >
      <v-text-field v-model="usernameReg"
:counter="10" label="Username" required>
      </v-text-field>
      <v-text-field v-model="emailReg" label="E-mail" required>

      </v-text-field>
      <v-text-field type="password" v-model="passwordReg"
 label="Password" required>
      </v-text-field>

      <v-btn color="warning" class="mr-4" @click="register">Register</v-btn>
      <v-spacer></v-spacer>
      <span>
         click here for
         <a @click="showothers"> Login </a>.
         <!-- <router-link to='/login'>login</router-link> -->
      </span>
    </v-form>
  </div>
  <div>
   <v-snackbar
      v-model="erroralert"
      right
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="erroralert = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
  </v-container>
</template>

<script>
// import axios from 'axios';
const superagent = require('superagent');

export default {
  name: 'loginregister',
  data() {
    return {
      showLogin: false,
      showRegister: true,
      usernameReg: null,
      passwordReg: null,
      emailReg: null,
      emailLogin: null,
      passwordLogin: null,
      erroralert: false,
      text: null,
    };
  },
  methods: {
    showothers() {
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
    },
    showhomepage() {
      this.$router.push({ name: 'homepage' });
    },
    login() {
      // alert('masuk gaaa?');
      // console.log(this.emailLogin);
      // console.log(this.passwordLogin);
      superagent
        .post(`${this.$store.state.url_base}/login`)
        .send({
          email: this.emailLogin,
          password: this.passwordLogin,
        })
        .end((err, res) => {
          if (err) {
            this.erroralert = true;
            this.text = res.body;
          } else {
            const { token } = res.body;
            localStorage.setItem('token', token);
            this.$store.commit('loginsetter', token);
            this.showhomepage();
          }
        });
    },
    register() {
      if (!this.emailReg) {
        this.erroralert = true;
        this.text = 'Format Email is Invalid.';
      } else if (!this.passwordReg) {
        this.erroralert = true;
        this.text = 'Password is Invalid.';
      } else if (!this.usernameReg) {
        this.erroralert = true;
        this.text = 'Username cannot be empty.';
      } else {
        superagent
          .post(`${this.$store.state.url_base}/register`)
          .send({
            email: this.emailReg,
            password: this.passwordReg,
            admin: false,
          })
          .end(() => {
            this.erroralert = true;
            this.text = 'Register Success';
            this.showRegister = false;
            this.showLogin = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.v-input {
  width: 70em;
  max-width: 500%;
}

</style>
