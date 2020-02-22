<template>
  <div id="nav">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'Content'}">All Product</router-link>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Category</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link
            :to="{name:'Category', params:{id:1}}"
            class="dropdown-item"
            href="#"
          >Party Game</router-link>
          <router-link
            :to="{name:'Category', params:{id:2}}"
            class="dropdown-item"
            href="#"
          >Negotiation</router-link>
          <router-link
            :to="{name:'Category', params:{id:3}}"
            class="dropdown-item"
            href="#"
          >Strategy</router-link>
        </div>
      </li>
      <li class="nav-item">
        <router-link to="/admin/addcontent" class="nav-link" href="#">Add Product</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link signout" v-on:click="signout()">Sign Out</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("UserId");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
<style scoped>
.signout {
  cursor: pointer;
}
</style>