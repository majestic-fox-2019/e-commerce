<template>
  <div class="col-md-12">
   <h3 class="pt-4"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> {{ msg }}</h3>
   <hr>
  </div>
</template>

<script>
export default {
  name : 'Title',
  props : {
    msg : String
  }
}
</script>

<style>

</style>