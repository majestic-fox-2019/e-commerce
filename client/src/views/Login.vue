<template>
  <div class="login-center">
      <div>
          <img src="../assets/image/logo.png" width="100vw">
      </div>
    <form class="form-signin" @submit.prevent="login">
        <img class="mb-4" src="" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
         required autofocus v-model="UserData.email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control"
         placeholder="Password" required v-model="UserData.password">

        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
      <div class="text-link">
        <router-link to="/register" class="">Not have account? Register</router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      UserData: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.$axios.post('login', {
        email: this.UserData.email,
        password: this.UserData.password,
      })
        .then(({ data }) => {
          const Toast = this.$Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$Swal.stopTimer);
              toast.addEventListener('mouseleave', this.$Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          });
          localStorage.setItem('token', data.token);
          this.$store.dispatch('isLogin');
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          this.$Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'Something went wrong!',
            width: '30vw',
            html: `${error.response.data.message}`,
          });
        });
    },
  },
};
</script>

<style scoped>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.login-center{
    padding-top: 10vh
}
input{
    margin: 10px 0px;
}
.text-link{
  position: relative;
  right: 0px;
  /* transform: translateX(10%); */
}
</style>
