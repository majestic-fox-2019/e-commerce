<template>
  <div >
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
      <div class="container">
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; color:#90F0B4" @click="goFilter('dry')">Dry </a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; color:#90F0B4" @click="goFilter('oily')">Oily</a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; color:#90F0B4" @click="goFilter('normal')">Normal</a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; color:#90F0B4" @click="goFilter('combination')">Combination</a>
        </div>
      </div>
</nav>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "Category",
  methods: {
    goFilter(category) {
      console.log(category)
      this.$router.push(`/filter/${category}`)
    }
  }
}
</script>

<style>
.touch-cursor:hover{
  cursor: pointer
}
</style>