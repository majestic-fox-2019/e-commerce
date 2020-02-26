<template>
  <div id="app">
    <nav id="navbar" v-if="!isAdmin">
      <div id="content-navbar">
        <div id="logoBrand">
          <router-link to="/">
            <span>
              <i class="fab fa-shirtsinbulk"></i>
              Pocket
            </span>
          </router-link>
        </div>
        <div id="categori-navbar">
          <div class="menu-navbar">
            <router-link :to="{name:'Menu',params:{category:'baju'}}">Baju</router-link>
          </div>
          <div class="menu-navbar">
            <router-link to="/menu/celana">Celana</router-link>
          </div>
          <div class="menu-navbar">
            <router-link to="/menu/jaket">Jaket</router-link>
          </div>
          <div class="menu-navbar">
            <router-link to="/menu/sepatu">Sepatu</router-link>
          </div>
        </div>
        <div id="login-navbar">
          <router-link to="/cart">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
          <router-link to="/login">
            <i class="far fa-user"></i>
          </router-link>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
// import jwt from "jsonwebtoken";
import ItemProducts from "./components/customer/Menu.vue";
export default {
  components: {
    ItemProducts: ItemProducts
  },
  data() {
    return {
      // isAdmin: false
      // category: "all"
    };
  },

  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  mounted() {
    // this.cekAdmin();
    this.$store.commit("isAdmin", true);
    // this.$store.commit("isMember", false);
    this.$store.dispatch("cekAdmin");
  },
  // watch: {
  //   $route(to, from) {
  //     this.category = to.params.category;
  //     console.log(this.category, "<<<<<<<<watch App");
  //   }
  // },
  methods: {
    logoutMember() {
      localStorage.clear();
      // this.$store.dispatch("cekAdmin");
      this.$router.push({
        path: "/"
      });
    }
    // cekAdmin() {
    //   let token = localStorage.getItem("token");
    //   if (!token) return;
    //   const user = jwt.verify(token, "edo tensi");
    //   if (user.role == "admin") {
    //     // this.isAdmin = true;
    //     this.$store.commit("isAdmin", true);
    //   } else {
    //     // this.isAdmin = false;
    //     this.$store.commit("isAdmin", false);
    //   }
    // }
  }
};
</script>

<style scoped>
body {
  background-color: #fff;
  font-family: "Lato", sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
}

/* #body-home {
  display: flex;
  flex-direction: column;
  border: 1px pink solid;
} */

#navbar {
  color: #fff;
  background-color: #000;
  display: flex;
  /* position: fixed; */
  /* width: 100%; */
  height: 60px;
}
#content-navbar {
  width: 100%;
  margin: 0 15em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid red; */
}
#logoBrand {
  cursor: pointer;
  letter-spacing: 5px;
  font-size: 1.5em;
  font-weight: 100;
  align-items: center;
  /* border: 1px solid white; */
}
#login-navbar {
  margin-right: 1em;
}
.fas,
.far {
  cursor: pointer;
}
#login-navbar .fas {
  font-size: 1em;
  margin: 0 2em;
}
#categori-navbar {
  display: flex;
  justify-content: space-between;
  width: 20em;
  /* border: 1px solid red; */
}
.menu-navbar {
  font-family: "Roboto", sans-serif;
  /* border: 1px solid #fff; */
  letter-spacing: 3px;
  font-weight: 100;
  cursor: pointer;
}

#categori-navbar a {
  text-decoration: none;
  color: #fff;
}
#login-navbar a {
  text-decoration: none;
  color: #fff;
}
#login-navbar a:hover {
  text-decoration: none;
  color: #fff;
}
#logoBrand a {
  text-decoration: none;
  color: #fff;
}

/* style item */
#menu-body {
  /* margin-top: 2em; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#menu-inner-body {
  width: 90em;
  /* border: 1px solid black; */
}
</style>

