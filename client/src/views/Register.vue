<template>
  <div class="mt-5 mainPart">
    <div class="registContainer">
      <div v-if="$store.state.loading.wholePageLoading" class="loader">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" variant="light" type="grow"></b-spinner>
      </div>
        <div class="firstForm">
            <div style="display:flex;width:100%;height:100%;">
                <div class="bgImg">
                    <img id="theregistimg" src="../assets/regist.svg" alt="registPic">
                </div>
                <div class="formOne">
                    <h1>Registration</h1>
                    <div class="forForm mt-5 px-3">
                    <form @submit.prevent="register">
                        <label for="name">Name:</label>
                        <br>
                        <input required class="RegistInput px-3" v-model="form.name" type="text" placeholder="Enter your full name">
                        <br>
                        <label class="mt-3" for="name">Email:</label>
                        <br>
                        <input required class="RegistInput px-3" v-model="form.email" type="text" placeholder="Enter your email address">
                        <br>
                        <label class="mt-3" for="name">Address:</label>
                        <br>
                        <input required class="RegistInput px-3" v-model="form.address" type="text" placeholder="Enter your home address">
                        <br>
                        <label class="mt-3" for="name">Phone:</label>
                        <br>
                        <input required class="RegistInput px-3" v-model="form.phone" type="text" placeholder="Enter your phone number">
                        <br>
                        <label class="mt-3" for="name">Shop Name:</label>
                        <br>
                        <input class="RegistInput px-3" v-model="form.shopName" type="text" placeholder="Enter password">
                        <br>
                        <label class="mt-3" for="password">Password:</label>
                        <br>
                        <input required class="RegistInput px-3" v-model="form.password" :type="passwordField" placeholder="Enter password">
                        <br>
                        <input type="checkbox" @click="seePass()">Show Password
                        <br>
                        <b-button class="mt-5" type="submit">Continue<i class="fas fa-arrow-right"></i></b-button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        shopName: null
      },
      passwordField: 'password'
    }
  },
  methods: {
    seePass () {
      if (this.passwordField === 'password') {
        this.passwordField = 'text'
      } else {
        this.passwordField = 'password'
      }
    },
    register () {
      Swal.fire({
        title: 'Are you sure you have the correct registration data?',
        text: "You won't be able to change this especially your Shop name",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes I'm sure"
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('register', {
            name: this.form.name,
            email: this.form.email,
            address: this.form.address,
            phone: this.form.phone,
            shopName: this.form.shopName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.loader {
  width: 100%;
  height: 88%;
  background: #66666683;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
}
.RegistInput {
    width: 25vw;
    height: 4vh;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    border-radius: 7px;
}
#theregistimg {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
.mainPart {
    height: 83vh;
    width: 100vw;
}
.registContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.firstForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: 100%;
    background-color: #ffc14fb0;
    border-radius: 15px;
}
.bgImg {
    width: 50%;
    height: 100%;
    background-color: #fada9fb0;
    border-radius: 15px;
}
.forForm {
    display: flex;
    justify-content: start;
    text-align: left;
}
</style>
