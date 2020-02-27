<template>
<div>
  <div class="signup-form" v-if="login">
    <form @submit.prevent="userLogin" method="post">
    <h2>Login</h2>
        <div class="form-group">
          <input type="email" v-model="email" class="form-control" name="email" placeholder="Email" required="required">
        </div>
    <div class="form-group">
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
    <div class="form-group">
            <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required">
        </div>
    <div class="form-group">
          <b-button type="submit" pill block variant="outline-secondary">SIGN IN</b-button>
        </div>
    </form>
  <div class="text-center">Don't have an account? <a @click="showRegister" style="text-decoration:none; color:blue">Sign Up</a></div>
</div>

  <div class="signup-form" v-if="register">
    <form @submit.prevent="userRegister" method="post">
    <h2>REGISTER</h2>
    <p class="hint-text">Create your account. It's free and only takes a minute.</p>
        <div class="form-group">
      <div class="form-group">
        <input type="text" class="form-control" v-model="name" name="name" placeholder="Name" required="required"></div>
        </div>
        <div class="form-group">
          <input type="email" v-model="email" class="form-control" name="email" placeholder="Email" required="required">
        </div>
    <div class="form-group">
            <input type="password" v-model="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
    <div class="form-group">
            <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required">
        </div>
        <!-- <div class="form-group">
      <label class="checkbox-inline"><input type="checkbox" required="required"> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
    </div> -->
    <div class="form-group">
          <b-button type="submit" pill block variant="outline-secondary">REGISTER</b-button>
        </div>
    </form>
  <div class="text-center">Already have an account? <a @click="showRegister" style="text-decoration:none; color:blue">Sign in</a></div>
</div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      login: true,
      register: false
    }
  },
  methods: {
    userLogin () {
      const dataLogin = {
        email: this.email,
        password: this.password
      }
      this.$axios({
        method: 'POST',
        url: '/user-login',
        data: dataLogin
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('role', result.data.role)
          localStorage.setItem('name', result.data.name)
          localStorage.setItem('id', result.data.id)
          this.$router.push({ name: 'Home' })
          this.$router.push({ name: 'Product' })
        })
        .catch(err => {
          this.toast('b-toaster-top-center', false, 'WRONG EMAIL OR PASSWORD', 'ATTENTION', 'danger')
          console.log(err)
        })
    },
    userRegister () {
      const dataRegister = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$axios({
        method: 'POST',
        url: '/user-register',
        data: dataRegister
      })
        .then(result => {
          this.toast('b-toaster-top-center', false, 'SUCCESS REGISTER !', 'SUCCESS', 'success')
          this.showRegister()
        })
        .catch(err => {
          this.toast('b-toaster-top-center', false, 'WRONG EMAIL OR PASSWORD', 'ATTENTION', 'danger')
          console.log(err)
        })
    },
    toast (toaster, append, desc, title, variant) {
      this.$bvToast.toast(desc, {
        title,
        toaster: toaster,
        variant,
        solid: true,
        appendToast: append
      })
    },
    showRegister () {
      this.login = !this.login
      this.register = !this.register
    }
  }
}
</script>
<style scoped>
body{
    color: #fff;
    background: #63738a;
    font-family: 'Roboto', sans-serif;
  }
    .form-control{
    height: 40px;
    box-shadow: none;
    color: #969fa4;
  }
  .form-control:focus{
    border-color: #5cb85c;
  }
    .form-control, .btn{
        border-radius: 3px;
    }
  .signup-form{
    width: 400px;
    margin: 0 auto;
    padding: 30px 0;
  }
  .signup-form h2{
    color: #636363;
        margin: 0 0 15px;
    position: relative;
    text-align: center;
    }
  .signup-form h2:before, .signup-form h2:after{
    content: "";
    height: 2px;
    width: 30%;
    background: #d4d4d4;
    position: absolute;
    top: 50%;
    z-index: 2;
  }
  .signup-form h2:before{
    left: 0;
  }
  .signup-form h2:after{
    right: 0;
  }
    .signup-form .hint-text{
    color: #999;
    margin-bottom: 30px;
    text-align: center;
  }
    .signup-form form{
    color: #999;
    border-radius: 3px;
      margin-bottom: 15px;
        background: #f2f3f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
  .signup-form .form-group{
    margin-bottom: 20px;
  }
  .signup-form input[type="checkbox"]{
    margin-top: 3px;
  }
  .signup-form .btn{
        font-size: 16px;
        font-weight: bold;
    min-width: 140px;
        outline: none !important;
    }
  .signup-form .row div:first-child{
    padding-right: 10px;
  }
  .signup-form .row div:last-child{
    padding-left: 10px;
  }
    .signup-form a{
    color: #fff;
    text-decoration: underline;
  }
    .signup-form a:hover{
    text-decoration: none;
  }
  .signup-form form a{
    color: #5cb85c;
    text-decoration: none;
  }
  .signup-form form a:hover{
    text-decoration: underline;
  }

</style>
