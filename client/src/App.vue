<template>
  <div id="app">
    <nav id="navbar" v-if="!isAdmin">
      <div id="content-navbar">
        <div id="logoBrand">
          <span>
            <i class="fab fa-shirtsinbulk"></i>
            Pocket
          </span>
        </div>
        <div id="categori-navbar">
          <div class="menu-navbar">Baju</div>
          <div class="menu-navbar">Celana</div>
          <div class="menu-navbar">Jaket</div>
          <div class="menu-navbar">Sepatu</div>
        </div>
        <div id="login-navbar">
          <i class="fas fa-shopping-cart"></i>
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
import jwt from "jsonwebtoken";
export default {
  data() {
    return {
      // isAdmin: false
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  mounted() {
    this.cekAdmin();
    // this.$store.commit('isAdmin', true)
  },
  methods: {
    cekAdmin() {
      let token = localStorage.getItem("token");
      if (!token) return;
      const user = jwt.verify(token, "edo tensi");

      if (user.role == "admin") {
        // this.isAdmin = true;
        this.$store.commit("isAdmin", true);
      } else {
        // this.isAdmin = false;
        this.$store.commit("isAdmin", false);
      }
    }
  }
};
</script>


<style scoped>
body {
  background-color: #fff;
  font-family: "Lato", sans-serif;
}
/* nav {
   z-index: 9999; 
   position: fixed;
} */
#app {
  display: flex;
  flex-direction: column;
}
#body-home {
  display: flex;
  flex-direction: column;
}

#navbar {
  color: #fff;
  background-color: #000;
  display: flex;
  /* position: fixed; */
  width: 100%;
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
#login-navbar a {
  text-decoration: none;
  color: #fff;
}
#login-navbar a:hover {
  text-decoration: none;
  color: #fff;
}
</style>

