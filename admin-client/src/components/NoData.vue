<template>
  <div class="font-weight-bold p-4">
    <img src="@/assets/empty.svg" alt="no data" style="max-height: 42vh" />
    <br />
    <br />
    <span>Oppsss. . .</span>
    <br />
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style>
</style>
