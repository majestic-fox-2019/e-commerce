<template>
<div class="container-fluid">
      <div class="d-flex align-items-center justify-content-around admin-control">
          <router-link to="/">
            <button type="button" class="btn btn-warning" v-if="loadData">
              Total Product :  {{loadData.length}}</button>
          </router-link>
          <router-link to="/sold"><button type="button" class="btn btn-primary">
            Total Sold : 0</button></router-link>
          <button type="button" class="btn btn-danger">Out Of Stock : 0</button>
        </div>
</div>
</template>

<script>


export default {
  name: 'AdminControl',
  computed: {
    loadData() {
      return this.$store.state.allData;
    },
  },
  method: {
  },
};
</script>

<style>

</style>
