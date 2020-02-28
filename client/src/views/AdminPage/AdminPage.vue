<template>
  <div class="container">
      <div class="row">
          <div class="col-4">
            <a @click="$router.push('/admin/')" name="" id="" class="btn w-100 text-white" style="background-color:#581E58">Product List</a>
          </div>
          <div class="col-4">
            <a @click="$router.push('/admin/add')" name="" id="" class="btn w-100 text-white" style="background-color:#581E58">Add new product</a>
          </div>
          <div class="col-4">
            <a @click="$router.push('/admin/transactions')" name="" id="" class="btn w-100 text-white" style="background-color:#581E58">Transactions</a>
          </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>