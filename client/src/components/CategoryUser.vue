<template>
  <div >
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
      <div class="container">
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; " @click="goFilter('dry')">Dry </a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; " @click="goFilter('oily')">Oily</a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; " @click="goFilter('normal')">Normal</a>
        </div>
        <div>
        <a class="nav-item nav-link active touch-cursor" style="font-family: 'Pacifico', cursive; " @click="goFilter('combination')">Combination</a>
        </div>
      </div>
</nav>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "CategoryUser",
  methods: {
    goFilter(category) {
      console.log(category)
      this.$router.push({name: "FilterUser", params: {category}})
    }
  }
}
</script>

<style>
.touch-cursor:hover{
  cursor: pointer
}
</style>