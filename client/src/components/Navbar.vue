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
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="role !== 'admin'">
            <router-link to="/" class="links">
              <i class="el-icon-goods"></i>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <modalLogin></modalLogin>
    <!-- <b-modal id="bv-modal-example" ref="modal-login" hide-footer>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-email"
          label="Email address:"
          label-for="emailLogin"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="emailLogin"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-password" label="Password:" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
      <div class="mt-2">
        New to us? Register
        <a href @click="toRegister">Here</a>
      </div>
    </b-modal>-->
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
    // onSubmit(evt) {
    //   evt.preventDefault();
    //   let dataUser = {
    //     email: this.email,
    //     password: this.password
    //   };
    //   this.$store.dispatch("login", dataUser);
    //   this.$bvModal.hide("bv-modal-example");
    // },
    logout() {
      localStorage.clear();
      this.$store.commit("changeLogin", false);
      this.$store.commit("changeRole", "");
      this.$store.commit("setUsername", "");
      // if(this.$router.)
      this.$router.push("/");
    }
    // toRegister() {
    //   this.$bvModal.hide("bv-modal-example");
    //   this.$router.push("/register");
    // }
  },
  computed: {
    errMSG() {
      return this.$store.state.errMSG;
    },
    role() {
      // return localStorage.getItem("role");
      return this.$store.state.role;
    }
  },
  watch: {
    errMSG() {
      this.$message.error(this.errMSG);
    },
    role() {
      return this.$store.state.role;
    }
  },
  mounted() {
    // console.log(this.role, "<< ini role");
    console.log(this.$router.options.base, "<<< router");
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