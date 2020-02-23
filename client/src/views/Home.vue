<template>
  <div>
    <div class="container-fluid">
      <navbar-app />

      <div class="row">
        <side-bar />
        <div class="col-md-9 text-white">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import NavbarApp from "../components/Navbar";

export default {
  name: "Home",
  components: {
    SideBar,
    NavbarApp
  },
  created() {
    if (this.stores.users == null) this.$store.dispatch("getUsers");
    if (this.stores.categories == null) this.$store.dispatch("getCategories");
    if (this.stores.products == null) this.$store.dispatch("getProducts");
  },
  computed: {
    stores() {
      return {
        users: this.$store.state.users,
        categories: this.$store.state.categories,
        products: this.$store.state.products
      };
    }
  }
};
</script>
