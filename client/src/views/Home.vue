<template>
  <div >
    <div class="bg-loading" v-if="loading">
      <b-spinner class="icon-loading" variant="light" style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>
    <div class="home-container">
        <Navbar />
        <b-container fluid>
            <b-row class="utama">
                <b-col cols="3" class="navbar-side">
                    <sidebar />
                </b-col>
                <b-col class="content-utama">
                    <router-view ></router-view>
                </b-col>
            </b-row>
        </b-container>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
export default {
 components: {
     Navbar,
     Sidebar
 },
 computed: {
     loading(){
         return this.$store.state.loading
     }
 }
}
</script>

<style scoped>
.utama {
    height: 92.5vh;
}

.bg-loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.418);
}
.icon-loading {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>