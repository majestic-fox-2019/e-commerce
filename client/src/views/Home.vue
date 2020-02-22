<template>
  <div>
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
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
export default {
 components: {
     Navbar,
     Sidebar
 }
}
</script>

<style scoped>
.utama {
    height: 92.5vh;
}
</style>