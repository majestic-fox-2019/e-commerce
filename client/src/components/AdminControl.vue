<template>
<div class="container-fluid">
      <div class="d-flex align-items-center justify-content-around admin-control">
          <router-link to="/">
            <button type="button" class="btn btn-warning">Total Product : 12</button>
          </router-link>
          <router-link to="/sold"><button type="button" class="btn btn-primary">
            Total Sold : 7</button></router-link>
          <button type="button" class="btn btn-danger">Out Of Stock : 0</button>
        </div>
</div>
</template>

<script>


export default {
  name: 'AdminControl',
  components: {
  },
};
</script>

<style>

</style>
