<template>
  <div class="container">
      <div class="d-flex justify-content-between row">
        <div v-for="data in allData" :key="data.id">
          <Card :carddata="data"></Card>
       </div>
      </div>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'List',
  components: {
    Card
  },
  mounted() {
    this.$store.dispatch('getData')
  },
  computed: {
    allData() {
      return this.$store.state.allData
    }
  }
  
}
</script>

<style>

</style>