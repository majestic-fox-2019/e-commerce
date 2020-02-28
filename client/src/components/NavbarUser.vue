<template>
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
      <a class="navbar-brand skin-type touch-cursor" @click="goHome" style="font-family: 'Pacifico', cursive; color:#90F0B4">SkinType</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item  active">
            <a class="nav-link" href=""  role="button"  aria-haspopup="true" aria-expanded="false">
             <router-link to="/user-profile"><i class="fab fa-pagelines" style="color:#90F0B4"></i> Welcome {{name}}</router-link>
            </a>
          </li>
          <li class="nav-item  active">
            
          </li>
        </ul>
        <div v-show="isLogin">
            <a class="navbar skin-type touch-cursor ml-3" @click="logout()"><i class="fas fa-sign-out-alt" style="color:#90F0B4"></i>  Logout</a>
        </div>
        <div v-show="!isLogin">
          <a class="navbar skin-type touch-cursor ml-3"><router-link to="/"><i class="fas fa-sign-out-alt"></i>  Login</router-link></a>
        </div>
        <a class="nav-link" href=""  role="button"  aria-haspopup="true" aria-expanded="false">
              <div v-if="dataCart">
             <router-link to="/user-cart"><i class="fas fa-shopping-cart"  style=" color:#90F0B4"></i><span class="badge badge-pill badge-danger">{{dataCart.length}}</span></router-link>
              </div>
              <div v-else>
                <router-link to="/user-cart"><i class="fas fa-shopping-cart"  style=" color:#90F0B4"></i><span class="badge badge-pill badge-danger"></span></router-link>
              </div>
            </a>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: "NavbarUser",
  data(){
    return {
      isLogin: false,
      name:null,
      dataCart:null
    }
  },
  methods:{
    goHome(){
      this.$router.push("/user")
    },
    logout() {
      Swal.fire({
          title: 'Are you sure want to logout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout'
        }).then((result) => {
          if (result.value) {
             localStorage.clear()
             this.isLogin = false
            // this.$router.push('/user')
            Swal.fire(
              'Logged Out!'
            )
            this.getData()
            this.cekLogin()
            this.$router.push('/user')
          }
        })
    },
    cekLogin(){
      console.log("ceklogin")
      if(localStorage.getItem("token")){
        this.isLogin = true
      }else {
        this.isLogin = false
      }
    },
    getData(){
      this.name = localStorage.getItem("name")
      axios({
        url:`https://e-commers-skin-type.herokuapp.com/products-user`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.dataCart = res.data.Products
        console.log(res.data.Products)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  mounted(){
    this.cekLogin()
    this.getData()
  },
  watch: {
    isLogin(){
      this.cekLogin()
    },
    name(){
      this.getData()
    }
  }
}
</script>

<style>
.touch-cursor:hover{
  cursor: pointer
}
</style>