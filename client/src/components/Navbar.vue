<template>
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
      <a class="navbar-brand skin-type touch-cursor" @click="goHome" style="font-family: 'Pacifico', cursive; color:#90F0B4">SkinType</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin Menu
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item touch-cursor" @click="goAdd" ><router-link to="/products/add">Add new product</router-link></a>
              <a class="dropdown-item touch-cursor" @click="goRegister"><router-link to="/register">Add new admin</router-link></a>
              <div class="dropdown-divider"></div>
            </div>
          </li>
          <li>
            <a class="navbar skin-type touch-cursor" @click="logout()">Logout</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: "Navbar",
  methods:{
    goHome(){
      this.$router.push("/admin")
    },
    goRegister(){
      this.$router.push('/register')
    },
    goAdd() {
      this.$router.push('/add')
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
            this.$router.push('/')
            Swal.fire(
              'Loged Out!'
            )
          }
        })
     
    }

  }

}
</script>

<style>
.touch-cursor:hover{
  cursor: pointer
}
</style>