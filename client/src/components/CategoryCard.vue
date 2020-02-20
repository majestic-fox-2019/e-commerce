<template>
  <div class="card">
    <div class="card-title">
      <h1>CATEGORY</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.card {
  background: black;
  width: 100%;
  height: 200px;
  .card-title {
    color: white;
    padding: 80px 100px;
    h1 {
      font-weight: 600;
    }
  }
}
.card:hover {
  box-shadow: 0px -1px 11px 5px rgba(0, 0, 0, 0.75);
}
</style>
