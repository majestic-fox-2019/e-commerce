<template>
  <div id="register">
    <div id="back">
      <canvas id="canvas" class="canvas-back"></canvas>
      <div class="backRight"></div>
      <div class="backLeft"></div>
    </div>
    <div id="slideBox">
      <div class="topLayer">
        <div class="right">
          <div class="content">
            <h2>Register</h2>
            <form id="form-register" @submit.prevent="registerSubmit">
              <div class="form-element form-stack">
                <label for="name-register" class="form-label">Name</label>
                <input id="name-register" type="text" name="name" v-model="name" required/>
              </div>
              <div class="form-element form-stack">
                <label for="email" class="form-label">Email</label>
                <input id="email" type="email" name="email" v-model="email" required/>
              </div>
              <div class="form-element form-stack">
                <label for="password-register" class="form-label">Password</label>
                <input id="password-register" type="password" name="password" v-model="password" required minlength="6"/>
              </div>
              <div class="form-element form-submit">
                <button id="signUp" class="signup" type="submit" name="signup">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    registerSubmit() {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
    }
  }
};
</script>

<style lang="scss" scoped>
$theme-signup: #03a9f4;
$theme-signup-darken: #0288d1;
$theme-signup-background: #2c3034;
$theme-login: #673ab7;
$theme-login-darken: #512da8;
$theme-login-background: #f9f9f9;
$theme-dark: #212121;
$theme-light: #e3e3e3;
$font-default: "Roboto", sans-serif;

$success: #5cb85c;
$error: #d9534f;

body {
  margin: 0;
  height: 100%;
  overflow: hidden;
  width: 100% !important;
  box-sizing: border-box;
  font-family: $font-default;
}

.backRight {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background: $theme-signup;
}

.backLeft {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  background: $theme-login;
}

#back {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -999;
}

.canvas-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

#slideBox {
  width: 50%;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
  margin-left: 50%;
  position: absolute;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.topLayer {
  width: 200%;
  height: 100%;
  position: relative;
  left: 0;
  left: -100%;
}

label {
  font-size: 0.8em;
  text-transform: uppercase;
}

input {
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 1em;
  padding: 8px 1px;
  margin-top: 0.1em;
}

.right {
  width: 50%;
  height: 100%;
  overflow: scroll;
  background: $theme-login-background;
  right: 0;
  position: absolute;
  label {
    color: $theme-dark;
  }
  input {
    border-bottom: 1px solid $theme-dark;
    &:focus,
    &:active {
      border-color: $theme-login;
    }
    &:-webkit-autofill {
      box-shadow: 0 0 0 30px $theme-login-background inset;
      -webkit-text-fill-color: $theme-dark;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  width: 80%;
  margin: 0 auto;
  position: relative;
}

.content h2 {
  font-weight: 300;
  font-size: 2.6em;
  margin: 0.2em 0 0.1em;
}

.left .content h2 {
  color: $theme-signup;
}

.right .content h2 {
  color: $theme-login;
}

.form-element {
  margin: 1.6em 0;
  &.form-submit {
    margin: 1.6em 0 0;
  }
}

.form-stack {
  display: flex;
  flex-direction: column;
}

button {
  padding: 0.8em 1.2em;
  margin: 0 10px 0 0;
  width: auto;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1em;
  color: #fff;
  line-height: 1em;
  letter-spacing: 0.6px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 0;
  outline: 0;
  transition: all 0.25s;
  &.signup {
    background: $theme-signup;
  }
  &.login {
    background: $theme-login;
  }
  &.off {
    background: none;
    box-shadow: none;
    margin: 0;

    &.signup {
      color: $theme-signup;
    }
    &.login {
      color: $theme-login;
    }
  }
}

button:focus,
button:active,
button:hover {
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  &.signup {
    background: $theme-signup-darken;
  }
  &.login {
    background: $theme-login-darken;
  }
  &.off {
    box-shadow: none;
    &.signup {
      color: $theme-signup;
      background: $theme-dark;
    }
    &.login {
      color: $theme-login-darken;
      background: $theme-light;
    }
  }
}

@media only screen and (max-width: 768px) {
  #slideBox {
    width: 80%;
    margin-left: 20%;
  }
  .signup-info,
  .login-info {
    display: none;
  }
}

</style>