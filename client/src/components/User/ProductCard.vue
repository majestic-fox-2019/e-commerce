<template>
  <q-card
    class="own-card q-ma-md rounded"
    :style="`cursor:pointer; ${product.stock === 0 ? 'opacity:50%;' : ''}`"
    @click="toDetail({ id: product.id, name: product.name })"
  >
    <q-img :src="product.image_url" width="200" height="200">
      <div class="absolute-bottom">
        Rp.
        {{ product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
      </div>
    </q-img>

    <q-card-section class="ellipsis inline">
      {{ product.name }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    toDetail(product) {
      const { id, name } = product
      this.$router.push(`/${id}/${name}`)
    }
  }
}
</script>

<style scoped>
.own-card {
  transition: 0.7s !important;
}

.own-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
</style>
