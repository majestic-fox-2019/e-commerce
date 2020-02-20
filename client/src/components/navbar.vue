<template>
  <div class="nav-wrapper">
    <div id="top-header" style="max-height: 35%;">
      <div class="container">
        <div class="header-links pull-left">
          <div class="header-top">
            <router-link
              v-if="!$store.state.isLogin"
              class="header-cool"
              style="font-family: monospace; text-decoration: none;"
              to="/adminRegister"
            >
              <i class="fas fa-store"></i> jual
            </router-link>
          </div>
          <div class="header-top">
            <p style="font-family: monospace; margin-top: 2.5%;">
              <i class="fa fa-envelope-o"></i> contact@shoppe.com
            </p>
          </div>
          <div class="header-top">
            <p style="font-family: monospace; margin-top: 2.5%;">
              <i class="fa fa-map-marker"></i> jonggol pinggiran danau
            </p>
          </div>
        </div>
        <div class="header-links pull-right" v-if="!$store.state.isLogin">
          <div class="header-top">
            <router-link
              class="header-account header-cool"
              style="text-decoration: none; font-family: monospace;"
              to="/account"
            >
              <i class="fa fa-user-o"></i> My Account
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="grad-bar"></div>
    <div class="d-flex align-content-center align-item-center" style="margin-top: 0.5%;">
      <router-link
        v-if="$store.state.whoIsLogin == 'customer' && $store.state.isLogin || !$store.state.isLogin || roleLogin == 'customer' && $store.state.isLogin"
        to="/"
        class="col"
      >
        <img
          src="https://cdn.freelogovectors.net/wp-content/uploads/2019/01/shopee-logo.png"
          style="height:30px;"
          alt="Company Logo"
        />
      </router-link>
      <router-link
        v-if="$store.state.whoIsLogin === 'admin' && $store.state.isLogin || roleLogin === 'admin' && $store.state.isLogin"
        to="/seller"
        class="col"
      >
        <img
          src="https://cdn.freelogovectors.net/wp-content/uploads/2019/01/shopee-logo.png"
          style="height:30px;"
          alt="Company Logo"
        />
      </router-link>
      <div class="col-md-6">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Search" />
          <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div class="col-md-3 flex" style="display: flex; flex-direction: row-reverse;">
        <div v-if="$store.state.isLogin === true">
          <button
            @click="goLogout"
            class="text-black px-3 rounded btn-danger"
            style="outline:none;"
          >Logout</button>
        </div>
        <router-link
          v-if="roleLogin === 'customer' && $store.state.isLogin || $store.state.whoIsLogin === 'customer'"
          class="cart-cool mr-5 ml-5"
          to="/cart"
        >
          <i class="fas fa-shopping-cart"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    roleLogin: function() {
      return localStorage.getItem("role");
    }
  },
  methods: {
    goLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 100%;
}
.header-cool {
  color: #000000b7;
}
.header-cool:hover {
  color: #462b15;
}
.header-top {
  margin: 0 15px 0 15px;
  margin-top: 0.1%;
}
#top-header {
  background-color: #ee4d2d;
}
.pull-left {
  float: left !important;
  display: flex;
}
.pull-right {
  float: right !important;
  display: flex;
}
.cart-cool {
  color: #ff7300;
  font-size: 155%;
  margin-top: -1%;
}
.cart-cool:hover {
  color: #ff820d;
}

cart .header-account {
  font-size: 100%;
  outline: none;
  font-family: monospace;
}
.search {
  width: 40%;
  position: relative;
  display: flex;
}

.searchTerm {
  min-width: 190%;
  width: 100%;
  border: 3px solid #ee4d2d;
  border-right: none;
  padding: 1.5%;
  height: 0%;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #00b4cc;
}

.searchButton {
  outline: none;
  min-width: 50%;
  width: 40px;
  border: 1px solid #ee4d2d;
  background: #ee4d2d;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  top: 55%;
  left: 40%;
  width: 30%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.page-wrapper {
  width: 100%;
  height: auto;
}

.nav-wrapper {
  height: 12%;
  z-index: 99;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #d0d0d0;
}

.grad-bar {
  width: 100%;
  height: 5px;
  background: linear-gradient(-45deg, #52ee86, #e73cde, #c3d523, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: gradbar 5s ease infinite;
  -moz-animation: gradbar 5s ease infinite;
  animation: gradbar 5s ease infinite;
}

/* NAVIGATION */

.navbar img {
  height: 16px;
  width: auto;
  justify-self: start;
  margin-left: 20px;
}

/* KEYFRAME ANIMATIONS */

@-webkit-keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradbar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>