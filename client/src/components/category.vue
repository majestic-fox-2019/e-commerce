<template>
  <div class="col-3">
    <h4>CATEGORIES</h4>
    <hr />
    <div class="card text-white bg-light mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Pakaian Pria')" class="btn">Pakaian Pria</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Pakaian Wanita')" class="btn">Pakaian Wanita</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Sepatu Pria')" class="btn">Sepatu Pria</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Sepatu Wanita')" class="btn">Sepatu Wanita</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Tas Wanita')" class="btn">Tas Wanita</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Tas Pria')" class="btn">Tas Pria</p>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2">
            <p @click="findCategory('Aksesoris')" class="btn">Aksesoris</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    findCategory(payload) {
      this.$store.state.searchCategory = payload;
    }
  }
};
</script>

<style scoped>
.col {
  flex-basis: 1 !important;
}

.col-3 {
  margin-right: 3%;
  flex: 0 0 22%;
  max-width: 25%;
}
</style>