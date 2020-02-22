<template>
  <div id="login">
     <b-form v-if="!isLogin">
       <b-form-group id="input-group-1" label="email:" label-for="input-1"
       >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="enter email"
        >
        </b-form-input>
       </b-form-group>
       <b-form-group id="input-group-2" label="password" label-for="input-2">
         <b-form-input 
            id="input-2" 
            v-model="password" 
            type="password" 
            required>
         </b-form-input>
       </b-form-group>
       <b-row cols="1">
        <b-button type="submit" variant="success">Login</b-button>
       </b-row>
     </b-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
        email: null,
        password: null,
        show: true
    }
  },
  methods: {
    loginUser(){
      const user = {
        email,
        password
      }
      this.$store.dispatch('loginUser', user)
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>

</style>