<template>
  <div class="row">
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
      <div
        @click.prevent="goHome()"
        class="d-flex align-content-center align-item-center"
        style="margin-top: 0.5%;"
      >
        <router-link
          v-if="roleLogin == 'customer' && isLoged || !isLoged || roleLogin == 'customer' && isLoged"
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
          v-if="roleLogin === 'admin' && isLoged || roleLogin === 'admin' && isLoged"
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
            <input
              v-model="$store.state.search"
              type="text"
              class="searchTerm"
              placeholder="Search"
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div class="col-md-3 flex" style="display: flex; flex-direction: row-reverse;">
          <div v-if="isLoged">
            <button @click="goLogout" class="btn-logout">Logout</button>
          </div>
          <div v-if="isLoged && roleLogin === 'customer'">
            <button @click="goToCart" class="btn-carts mr-5">
              <i class="fas fa-shopping-cart mr-3"></i>
              <span class="badge badge-light">{{$store.state.carts.length}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    roleLogin: function() {
      return this.$store.state.whoIsLogin;
    },
    isLoged: function() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    goLogout() {
      this.$store.dispatch("logout");
    },
    goHome() {
      this.$store.state.searchCategory = "";
      this.$store.dispatch("findAllProduct");
    },
    goToCart() {
      this.$router.push("/cart");
    }
  },
  mounted() {
    if (localStorage.getItem("role") === "customer") {
      this.$store.state.whoIsLogin = "customer";
      this.$store.dispatch("findAllCart");
    } else {
      this.$store.state.whoIsLogin = localStorage.getItem("role");
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-logout {
  float: right;
  position: relative;
  top: 1px;
  display: block;
  padding: 0px 10px;
  border-radius: 3px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #ee4d2d;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #ee4d2d91;
  outline: none;
  height: 4.5vh;
}
.btn-carts {
  float: right;
  position: relative;
  top: 1px;
  display: block;
  padding: 0px 10px;
  border-radius: 3px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #ee4d2d;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #ee4d2d91;
  outline: none;
  height: 4.5vh;
}
.btn {
  padding: 0.1rem 0.9rem;
}
.row {
  margin-top: 11.5vh;
  margin-right: 0px !important;
}
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