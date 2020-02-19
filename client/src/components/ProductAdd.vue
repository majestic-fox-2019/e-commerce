<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-html">
      <h1><i class="fas fa-bolt"></i> ARDUISHOP <i class="fas fa-bolt"></i></h1>
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
        <label for="tab-1" class="tab">Sign In</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up">
        <label for="tab-2" class="tab">Sign Up</label>
        <div class="login-form">
          <div class="sign-in-htm">
            <form @submit.prevent="login">
              <div class="group">
                <label for="user" class="label">Email</label>
                <input v-model="formLogin.email" id="user" type="text" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input v-model="formLogin.password" id="pass" type="password"
                class="input" data-type="password">
              </div>
              <div class="group">
                <input type="submit" class="button" style="cursor: pointer" value="Sign In">
              </div>
            </form>
            <div class="hr"></div>
          </div>
          <div class="sign-up-htm">
            <form @submit.prevent="register">
              <div class="group">
                <label for="user" class="label">Name</label>
                <input v-model="formRegis.name" id="user" type="text" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Email Address</label>
                <input v-model="formRegis.email" id="pass" type="text" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input v-model="formRegis.password" id="pass"
                type="password" class="input" data-type="password">
                </div>
              <div class="group">
                <input type="submit" class="button" style="cursor: pointer" value="Sign Up">
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

}
</script>

<style>

</style>