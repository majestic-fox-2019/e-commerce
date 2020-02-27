<template>
    <div class="col-md-3 pt-3 toaster" :style="{ display : toaster !== null ? 'block' : 'none'}">
      <div class="alert alert-info" role="alert">
       <i class="fa fa-check-circle" aria-hidden="true"></i> {{ toaster }}
      </div>
    </div>  
</template>
<script>
export default {
  name : 'Toaster',
  props : ['toaster']
}
</script>

<style>
  .toaster {
    position: absolute;
    float: right;
  }
</style>