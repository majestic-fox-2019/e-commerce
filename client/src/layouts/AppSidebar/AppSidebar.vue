<template>
  <div class="sidebar-side">
    <a id="show-sidebar" class="btn btn-sm btn-dark" onclick="return false;">
      <i class="fa fa-bars"></i>
    </a>
    <nav id="sidebar" class="sidebar-wrapper">
      <div class="sidebar-content">
        <div class="sidebar-brand">
          <a href="#" onclick="return false;">ADMIN PANEL</a>
          <div id="close-sidebar">
            <i class="fa fa-bars"></i>
          </div>
        </div>
        <profile-user></profile-user>
        <menu-sidebar></menu-sidebar>
      </div>
      <div class="sidebar-footer">
        <span @click="doLogout"><i class="fa fa-power-off"></i>&nbsp;Logout</span>
      </div>
    </nav>
  </div>
</template>

<script>
import ProfileUser from './ProfileUser'
import MenuSidebar from './MenuSidebar'

export default {
  name: 'AppSidebar',
  components: {
    'profile-user' : ProfileUser,
    'menu-sidebar' : MenuSidebar
  },
  data(){
    return {}
  },
  methods: {
    doLogout(){
      localStorage.clear()
      this.$router.push({ name: 'login'})
    }
  }
}
</script>

<style scoped>

</style>