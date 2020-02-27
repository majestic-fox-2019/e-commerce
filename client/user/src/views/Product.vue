<template>
<div>
    <carousel/>
<div class="container mt-4">
  <div class="row title d-flex justify-content-center mb-4">
    <h1>Our Product</h1>
  </div>
  <div>
    <cardUser :data="loadData"></cardUser>
  </div>
</div>
</div>
</template>

<script>
import cardUser from '@/components/cardUser.vue'
import carousel from '@/components/carousel.vue'

export default {
  name: 'Product',
  data: function () {
    return {
    }
  },
  components: {
    carousel,
    cardUser
  },
  computed: {
    loadData () {
      return this.$store.state.allData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.title {
  border-bottom: solid 1px black;
}
</style>
