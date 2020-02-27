<template>
<nav class="navbar navbar-expand-md">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active ml-5">
              <router-link to='/' style="text-decoration:none;">
                <a class="nav-link">Home</a>
              </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="">How To Buy</a>
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
      <router-link to='/' style="text-decoratione:none">
        <a class="navbar-brand mx-auto">Bike-Commerce</a>
      </router-link>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to='/cart'>
                  <b-button pill variant="outline-light" class="mr-2">Cart</b-button>
              </router-link>
             <b-button v-if="isLogin" pill variant="outline-secondary" @click="logout" class="mr-2">Logout</b-button>
             <router-link to='/login'>
             <b-button v-if="!isLogin" pill variant="primary" class="mr-2">Login</b-button>
             </router-link>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

export default {
  name: 'userNavbar',
  data () {
    return {
      isLogin: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    logout () {
      localStorage.clear()
      this.isLogin = !this.isLogin
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.isLogin = !this.isLogin
      }
    }
  }
}
</script>

<style scope>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.39);
  z-index: 3;
}
.navbar-brand {
  font-family: 'Faster One';
  font-size: 23px;
  pointer-events:none;
}
a{
  color: rgb(246, 246, 246);
  font-size: 20px;
}
</style>
