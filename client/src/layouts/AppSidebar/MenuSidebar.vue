<template>
  <div class="sidebar-menu">
    <ul>
      <li class="header-menu"><span>General</span></li>
      <li class="sidebar-single" :class="this.$route.name === 'dashboard' ? 'active' : '' ">
        <router-link to="/">
          <i class="fa fa-home"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li class="sidebar-single" :class="this.$route.name === 'users' ? 'active' : '' ">
        <router-link to="/users">
          <i class="fa fa-users"></i>
          <span>Users</span>
        </router-link>
      </li>
      <li class="sidebar-dropdown">
        <a href="#" class="sub" onclick="return false;">
          <i class="fa fa-shopping-cart"></i>
          <span>Products</span>
        </a>
        <div class="sidebar-submenu">
          <ul>
            <li><router-link to="/products">Product List</router-link></li>
            <li><router-link to="/categories">Categories Product</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MenuSidebar'
  }
</script>

<style scoped>

</style>