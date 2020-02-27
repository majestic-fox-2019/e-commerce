<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
      <b-navbar-brand to="/" class="logo-header">
        <img src="@/assets/icons/logo-nike.png">
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown class="ml-3 mr-3" text="Kategori" left>
            <b-dropdown-item v-for="cat in getCategories" :key="cat.id" @click="getToCategory(cat)">{{ cat.name }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto right-nav">
          <b-nav-item @click="goCart">
            <span><i class="fa fa-shopping-cart"></i></span>
            <b-badge class="badge-cart" variant="danger">{{ getCarts.length }}</b-badge>
          </b-nav-item>
          <b-nav-form class="ml-4 res-center" v-if="!statusLogin">
            <b-button size="sm" class="mr-2" variant="dark" @click="goDaftar">Sign Up</b-button>
            <b-button size="sm" variant="outline-dark" @click="openModal">Login</b-button>
          </b-nav-form>
          <b-nav-item-dropdown class="ml-4" left v-if="statusLogin">
            <template v-slot:button-content>
              <span>{{ name }}</span>
            </template>
            <b-dropdown-item @click="goSetting"><i class="fa fa-cog"></i>&nbsp;Setting</b-dropdown-item>
            <b-dropdown-item @click="doLogout"><i class="fa fa-sign-out-alt"></i>&nbsp;Keluar</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal v-model="getModal" size="sm" centered no-close-on-backdrop no-close-on-esc hide-header-close>
      <h5 class="mb-4 text-center">Masuk</h5>
      <b-form-group>
        <label for="email-login">Email</label>
        <b-form-input
          id="email-login"
          v-model="formLogin.email"
          type="email"
          placeholder="Enter email"
          @keydown.native="keyLogin"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <label for="email-login">Password</label>
        <b-form-input
          id="email-login"
          v-model="formLogin.password"
          type="password"
          placeholder="Enter password"
          @keydown.native="keyLogin"
        ></b-form-input>
      </b-form-group>
      <template v-slot:modal-footer>
        <div class="w-100 text-center mt-3">
          <div class="action-footer">
            <b-button variant="secondary" size="sm" class="mr-1" @click="setCloseModal">Cancel</b-button>
            <b-button class="btn-beli" size="sm" @click="doLogin">Masuk</b-button>
          </div>
          <p class="daftar-p mt-3">Belum punya akun nike store ? <span class="daftar" @click="goDaftar">Daftar</span></p>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { url } from '@/mixins/mixins'

export default {
  mixins: [url],
  data(){
    return {
      statusLogin: false,
      formLogin: {
        email: null,
        password: null
      }
    }
  },
  created(){
    this.checkLogin()
    this.getAllCart()
    this.getAllCategories()
  },
  computed: {
    name(){
      let yourname = JSON.parse(localStorage.getItem('user')).name
      return yourname
    },
    getCategories(){
      return this.$store.state.categories
    },
    getCarts(){
      return this.$store.state.carts
    },
    getModal(){
      return this.$store.state.modalLogin
    },
  },
  methods: {
    checkLogin(){
      if(localStorage.getItem('token')){
        this.statusLogin = true
      }
    },
    openModal(){
      this.$store.commit('SET_MODAL', true)
    },
    setCloseModal(){
      this.$store.commit('SET_MODAL', false)
      this.clearForm(this.formLogin)
    },
    getAllCategories(){
      this.$store.dispatch('getCategories')
    },
    getAllCart(){
      if(localStorage.getItem('token')){
        this.$store.dispatch('getCart')
      }
    },
    getToCategory(cat){
      this.$router.push({ name: `CategoryName`, params: { catname: cat.name, id: cat.id }}).catch(err => {})
    },
    goSetting(){
      this.$router.push({ name: 'Setting' })
    },
    goCart(){
      if(localStorage.getItem('token')){
        this.$router.push({ name: 'Cart' })
      }else{
        this.$store.commit('SET_MODAL', true)
      }
    },
    goDaftar(){
      this.modal = false
      this.$router.push({ name: 'Register' })
    },
    doLogin(){
      if(this.formLogin.email === null || this.formLogin.password === null){
        this.$vToastify.notifError('Form harus semua terisi', 'Gagal!')
      }else{
        let objData = {
          email: this.formLogin.email,
          password: this.formLogin.password
        }
        axios.post(`${this.url}/login`, objData)
        .then(res => {
          this.$store.commit('SET_ISLOGIN', true)
          this.$vToastify.notifSuccess('Login berhasil!', "Yeah!")
          this.$store.commit('SET_MODAL', false)
          this.clearForm(this.formLogin)
          localStorage.setItem('token', res.data.payload.Token)
          localStorage.setItem('user', JSON.stringify(res.data.payload.users))
          this.$router.go(this.$router.push({ name: 'Home' }))
        })
        .catch(err => {
          this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
        })
      }
    },
    doLogout(){
      localStorage.clear()
      this.$router.go()
    },
    clearForm(form){
      for(let key in form){
        form[key] = null
      }
    },
    keyLogin(event) {
      if(event.which === 13) {
        this.doLogin()
      }
    },
  }
}
</script>

<style scoped>

</style>