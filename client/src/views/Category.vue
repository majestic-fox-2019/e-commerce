<template>
  <div>
    <ItemCard :items="categoryItem" />
  </div>
</template>

<script>
import ItemCard from '@/components/CategoryCard.vue'
export default {
  name: 'categoryView',
  components: {
    ItemCard
  },
  methods: {},
  computed: {
    category() {
      return this.$route.params.category
    },
    categoryItem() {
      return this.$store.state.categoryItem
    }
  },
  created() {
    let categoryName = this.$route.params.category
    this.$store.dispatch('findByCategory', categoryName)
  },
  watch: {
    category: function(newVal, oldVal) {
      if (newVal) {
        this.$store.dispatch('findByCategory', newVal)
      } else {
        console.log('kepencet kali yaaa')
      }
    }
  }
}
</script>

<style scoped></style>
