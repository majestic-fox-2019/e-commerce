<template>
  <div class="container-fluid">
    <div class="col-md-8 mx-auto">
        <img src="../assets/404.png" />
        <br>
        <br>
        <div class="text-center">
          <button @click.prevent="$router.push({ name: 'Home' })" class="btn btn-primary"><i class="fa fa-globe" aria-hidden="true"></i> Kembali ke bumi</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
}
</script>

<style>

</style>