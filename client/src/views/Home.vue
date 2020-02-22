<template>
  <div class="home">
    <carousel></carousel>
    <logo class="logo rounded-circle"></logo>
    <dashboard class="dashboard"></dashboard>
    <welcome class="welcome"></welcome>
  </div>
</template>

<script>
import carousel from '@/components/Carousel.vue'
import logo from '@/components/Logo.vue'
import welcome from '@/components/Welcome.vue'
import dashboard from '@/components/Dashboard.vue'

export default {
  name: 'Home',
  components: {
    carousel,
    logo,
    welcome,
    dashboard,
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
    position: absolute;
    margin-top: -110px;
    margin-left: 30px;
}
.welcome {
    position: absolute;
    margin-top: 120px;
    margin-left: 30px;
}

</style>