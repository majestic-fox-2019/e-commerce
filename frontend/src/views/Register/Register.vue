<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-4 offset-md-4 register">
        <h4>DAFTAR</h4>
        <b-form @submit.prevent="doRegister">
          <b-form-group>
            <label for="name">Name</label>
            <b-form-input
              id="name"
              v-model="formRegister.name"
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="email">Email</label>
            <b-form-input
              id="email"
              v-model="formRegister.email"
              type="email"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="password">Password</label>
            <b-form-input
              id="password"
              type="password"
              v-model="formRegister.password"
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" class="btn-beli mt-2">Register</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { url } from '@/mixins/mixins'

export default {
  mixins: [url],
  data(){
    return {
      formRegister: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    doRegister(){
      if(this.formRegister.name === null || this.formRegister.email === null || this.formRegister.password === null){
        this.$vToastify.notifError('Form harus semua terisi', 'Gagal!')
      }else{
        let dataRegist = {
          name: this.formRegister.name,
          email: this.formRegister.email,
          password: this.formRegister.password
        }
        axios.post(`${this.url}/register`, dataRegist)
        .then(res => {
          this.$vToastify.notifSuccess('Registrasi berhasil sialhkan login!', "Yeah!")
          this.clearForm(this.formRegister)
        })
        .catch(err => {
          this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
        })
      }
    },
    clearForm(form){
      for(let key in form){
        form[key] = null
      }
    }
  },
}
</script>

<style scoped>

</style>