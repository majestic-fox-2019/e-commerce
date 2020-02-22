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
  }
};
</script>
