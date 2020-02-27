<template>
  <div>
    <ItemCard :items="$store.state.mallProduct" />
  </div>
</template>

<script>
import ItemCard from '@/components/MallCard.vue'
export default {
  name: 'Mall',
  components: {
    ItemCard
  },
  created() {
    this.$store.dispatch('findMallProduct')
  }
}
</script>

<style scoped></style>
