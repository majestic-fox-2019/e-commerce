<template>
   <div class="signInPart">
       <b-button v-b-modal.modal-center>Login</b-button>

       <b-modal id="modal-center" size="lg" centered hide-footer hide-header>
           <b-row style="height:50vh;">
               <b-col class="right-side-form">
                   <img id="SignInImg" src="../assets/signPic.svg" alt="SignIn Pic">
               </b-col>
               <b-col class="FormCol">
                   <form @submit.prevent="signIn" style="text-align:center;">
                        <h2>Sign In</h2>
                        <input class="my-2 px-2 loginForm" v-model="form.email" type="text" placeholder="Email">
                        <input class="my-2 px-2 loginForm" v-model="form.password" type="password" placeholder="Password">
                        <p class="my-2">Not yet a member? <a href="#" @click.prevent="toRegister">Register here</a></p>
                        <b-button type="submit">Sign In</b-button>
                    </form>
               </b-col>
           </b-row>
        </b-modal>
   </div>
</template>

<script>
export default {
  name: 'SignInButton',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      })
    },
    toRegister () {
      this.$bvModal.hide('modal-center')
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
#SignInImg {
    height: 100%;
    width: 100%;
}
.right-side-form {
    height: 100%;
}
.FormCol {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.loginForm {
    width: 80%;
    border: none;
    border-radius: 8px;
    background: rgb(172, 172, 172);
}
.signInPart {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
