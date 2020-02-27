<template>
  <div>
    <ItemCard :items="userProduct" />
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
export default {
  name: '',
  components: {
    ItemCard
  },
  data() {
    return {}
  },
  computed: {
    userProduct() {
      return this.$store.state.userProduct
    }
  },
  methods: {},
  created() {
    this.$store.dispatch('findUserProduct')
  }
}
</script>

<style scoped></style>
