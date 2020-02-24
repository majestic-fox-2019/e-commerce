<template>
  <div class="col-md-3 py-2 rounded">
    <img
      style="width: 100%; height: auto;"
      :src="product.img_url"
    />
    <div>
      <p class="text-left mt-3">{{product.name}}</p>
      <div class="d-flex justify-content-between align-items-center pb-2">
        <span class="font-weight-bold">Rp{{product.price}}</span>
        <button class="btn btn-info">
          <i class="fa fa-eye"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>

<style>
</style>
