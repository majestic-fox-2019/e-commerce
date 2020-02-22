<template>
<div>
  <div class="login-form" v-if="showLogin">
    <form @submit.prevent="adminlogin" method="post">
      <div class="avatar">
        <i class="material-icons">&#xE7FF;</i>
      </div>
      <h4 class="modal-title">Login to Admin Account</h4>
      <div class="form-group">
        <input
          type="text"
          v-model="email"
          class="form-control"
          placeholder="email"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="password"
          required="required"
        />
      </div>
      <div class="form-group small clearfix"></div>
        <button type="submit" class="btn btn-primary btn-block btn-lg">LOGIN
        </button>
    </form>
        <div class="text-center small">new admin ?
        <a style="cursor:pointer;" @click="showregister" >Sign up</a></div>
  </div>
  <div class="login-form" v-if="showRegister">
    <form  @submit.prevent="adminregister" method="post">
      <div class="avatar">
        <i class="material-icons">&#xE85E;</i>
      </div>
      <h4 class="modal-title">Register to Admin Account</h4>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="name"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="email"
          placeholder="email"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="password"
          required="required"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="secretkey"
          class="form-control"
          placeholder="Secret Key"
          required="required"
        />
      </div>
      <div class="form-group small clearfix"></div>
        <button type="submit" class="btn btn-primary btn-block btn-lg">REGISTER
        </button>
    </form>
        <div class="text-center small">already have account ?
          <a style="cursor:pointer;" @click="showregister">Sign in</a></div>
  </div>
</div>

</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      secretkey: '',
      showLogin: true,
      showRegister: false,

    };
  },
  methods: {
    adminlogin() {
      const dataLogin = {
        email: this.email,
        password: this.password,
      };
      this.$axios({
        method: 'POST',
        url: '/login',
        data: dataLogin,
      })
        .then((result) => {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('role', result.data.role);
          this.$router.push({ name: 'product' });
        });
    },

    adminregister() {
      const dataregister = {
        name: this.name,
        email: this.email,
        password: this.password,
        secretkey: this.secretkey,
      };
      this.$axios({
        method: 'POST',
        url: '/register',
        data: dataregister,
      })
        .then(() => {
          this.showregister();
        });
    },

    showregister() {
      this.showLogin = !this.showLogin;
      this.showRegister = !this.showRegister;
    },
  },
};
</script>
