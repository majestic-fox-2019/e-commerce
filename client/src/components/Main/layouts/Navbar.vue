<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-primary fixed-top nav-height">
      <a class="navbar-brand" href="#">Disekrip</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
        </ul>
        <ButtonLogout />
      </div>
    </nav>
  </div>
</template>

<script>
import ButtonLogout from './ButtonLogout'
export default {
  name : 'Navbar',
  components : {
    ButtonLogout
  }
}
</script>

<style scoped>
  .nav-height {
    height: 50px;
  }
</style>