<template>
  <div class="loginForm">
    <div class="container">
      <h1 style="text-align:center">Login</h1>
      <form method="POST" v-on:submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="formLogin.email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="formLogin.password"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary text-center">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      formLogin: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: {
          email: this.formLogin.email,
          password: this.formLogin.password,
        },
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('UserId', data.data.id);
          localStorage.setItem('role', data.data.role);
          if (localStorage.role === 'admin') {
            this.$router.push({ name: 'tableProduct' });
          } else {
            this.$router.push({ name: 'homePage' });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scope>
.loginForm {
  background-image: url("https://images.unsplash.com/photo-1521012012373-6a85bade18da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80");
  height: 800px;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  display: flex;
  align-items: center;
}
.container {
  width: 400px;
  background-color: gray;
  color: black;
}
</style>
