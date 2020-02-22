<template>
  <div class="card">
    <div class="card-title" :style="{ backgroundImage: category.image }">
      <h1>{{ category.name.toUpperCase() }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  data() {
    return {}
  },
  props: ['category']
}
</script>

<style lang="scss" scoped>
.card {
  background: black;
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  cursor: pointer;
  .card-title {
    color: white;
    padding: 80px 100px;
    background-size: cover;
    background-position: center;
    h1 {
      font-weight: 600;
      background: rgba(0, 0, 0, 0.75);
      padding: 10px;
    }
  }
}
.card:hover {
  box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.75);
}
</style>
