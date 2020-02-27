<template>
  <h2><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> {{ msg }}</h2>  
</template>

<script>
export default {
  name: 'Title',
  props : {
    msg: String
  }
}
</script>

<style scoped>

</style>