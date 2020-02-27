<template>
  <div class="home">
    <Navbar />
    <div style="min-height: 85vh;">
    <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components : {
    Navbar,
    Footer
  }
}
</script>
