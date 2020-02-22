<template>
  <div>
    <Navbar />
    <div class="row" style="width:100%; margin-top: 50px;">
        <div class="col-md-2">
          <Sidebar />
        </div>
        <div class="col-md-10">
          <router-view />
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Main/layouts/Navbar'
import Sidebar from '../components/Main/layouts/Sidebar'

export default {
  name : 'MainPage',
  components : {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
</style>