<template>
  <div class="col-md-3 py-5 mt-5 shadow-lg rounded-right bg-dark" style>
    <p class="text-left pt-5 font-weight-bold alert alert-info">Welcome, admin@mail.com</p>
    <div class="nav flex-column nav-pills" aria-orientation="vertical">
      <a
        class="nav-link text-white font-weight-bold text-left active"
        data-toggle="pill"
        @click.prevent="$router.push({name : 'User'}).catch(err => {})"
        href="#"
      >User</a>
      <a
        @click.prevent="$router.push({name : 'Category'}).catch(err => {})"
        class="nav-link text-white font-weight-bold text-left"
        data-toggle="pill"
        href="#"
      >Category</a>
      <a
        @click.prevent="$router.push({name : 'Product'}).catch(err => {})"
        class="nav-link text-white font-weight-bold text-left"
        data-toggle="pill"
        href="#"
      >Product</a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
