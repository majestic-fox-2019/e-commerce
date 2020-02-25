<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand class="links cherry">
        <router-link to="/">Cherrychenka</router-link>
      </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="links">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/category/Clothing" class="links">Clothing</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/category/Shoes" class="links">Shoes</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/category/Accessories" class="links">Accessories</router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="role == 'admin'">
            <router-link to="/admin" class="links">Admin</router-link>
          </b-nav-item>
          <b-nav-item v-if="!$store.state.isLogin">
            <div
              class="links"
              id="show-btn"
              @click="$bvModal.show('bv-modal-example')"
            >Login / Register</div>
          </b-nav-item>
          <b-nav-item-dropdown right v-else>
            <template v-slot:button-content>{{$store.state.username}}</template>
            <b-dropdown-item>
              <router-link to="/user">Profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="role !== 'admin'">
            <router-link to="/cart" class="links">
              <!-- <i class="el-icon-goods"></i> -->
              <div v-if="tokenKu">
                <el-badge :value="myCarts.length" class="item">
                  <i class="fas fa-shopping-cart"></i>
                </el-badge>
              </div>
              <div v-else>
                <i class="fas fa-shopping-cart"></i>
              </div>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <modalLogin></modalLogin>
  </div>
</template>

<script>
import modalLogin from "../components/modalLogin";
export default {
  name: "Navbar",
  components: {
    modalLogin
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("changeLogin", false);
      this.$store.commit("changeRole", "");
      this.$store.commit("setUsername", "");
    },
    getCart() {
      if (localStorage.getItem("token")) {
        this.$store.dispatch("getMyCart");
      }
    },
    cekLogin() {
      if (localStorage.getItem("token")) {
        this.getCart();
      }
    }
  },
  computed: {
    errMSG() {
      return this.$store.state.errMSG;
    },
    role() {
      // return localStorage.getItem("role");
      return this.$store.state.role;
    },
    myCarts() {
      if (this.$store.state.myCarts == null) {
        this.getCart();
        return "loading";
      } else {
        return this.$store.state.myCarts;
      }
    },
    tokenKu() {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    errMSG() {
      this.$message.error(this.errMSG);
    },
    role() {
      return this.$store.state.role;
    },
    tokenKu() {
      // return this.tokenKu();
      alert("HOI");
      this.cekLogin();
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.getCart();
    }
  }
};
</script>

<style scoped>
.links {
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800;
}

.cherry:hover {
  cursor: pointer;
}
</style>