<template>
  <div class="my-4">
      <div class="adminHeader">
      <h1>Admin Panel</h1>
      <h2>({{$store.state.userInfo.name}})</h2>
      </div>
      <div class="my-3 px-3 adminMenu">
        <AdminMenuCard v-for="(adminMenu, i) in adminMenus" :key="i" :menuDetail="adminMenu"></AdminMenuCard>
      </div>
      <router-view/>
  </div>
</template>

<script>
import AdminMenuCard from '../components/AdminMenuCard'
export default {
  name: 'Admin',
  data () {
    return {
      adminMenus: [
        {
          button: '<i class="fas fa-atom"></i> Products',
          name: 'Products'
        },
        {
          button: '<i class="fas fa-users"></i> Admins',
          name: 'Users'
        },
        {
          button: '<i class="fas fa-chart-pie"></i> Official Store Incomes',
          name: 'Incomes'
        }
      ]
    }
  },
  created () {
    this.$router.push('/admin/Products')
  },
  components: {
    AdminMenuCard
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchUserData', true)
    })
  }
}
</script>

<style scoped>
.adminMenu {
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: space-evenly;
}
</style>
