<template>
  <div class="login-form">
    <form action="/examples/actions/confirmation.php" @submit.prevent="adminlogin" method="post">
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
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
