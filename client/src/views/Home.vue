<template>
  <div class="home">
    <carousel></carousel>
    <logo class="logo rounded-circle"></logo>
    <div class="row">
      <div class="contentleft col-3">
        <dashboard class="dashboard"></dashboard>
        <welcome class="welcome"></welcome>
        <category class="category"></category>
      </div>
      <div class="listproduct col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/Carousel.vue'
import logo from '@/components/Logo.vue'
import welcome from '@/components/Welcome.vue'
import dashboard from '@/components/Dashboard.vue'
import category from '@/components/Category.vue'

export default {
  name: 'Home',
  components: {
    carousel,
    logo,
    welcome,
    dashboard,
    category
  },
  created() {
    if(localStorage.token) {
      this.$store.commit('SET_PAGE', 'home')
      this.$store.commit('SET_ISLOGIN', true)
      this.$store.commit('SET_EMAIL', localStorage.email)
      if(localStorage.role === 'user') {
        this.$router.push('/')
      } else {
        this.$router.push('/product')
      }
    } else {
      this.$store.commit('SET_PAGE', 'home')
      this.$store.commit('SET_ISLOGIN', false)
    }

  }
}
</script>

<style scoped>
.logo {
    position: absolute;
    margin-top: -330px;
    margin-left: 80px;
    background: wheat;
    opacity: 0.8;
}
.dashboard {
    margin-top: -110px;
    margin-left: 30px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
.welcome {
    margin-top: 10px;
    margin-left: 30px;
    position: unset;
}
.category {
    margin-top: 10px;
    margin-left: 30px;
    position: unset;
}
.listproduct {
    height: 900px;
}
</style>