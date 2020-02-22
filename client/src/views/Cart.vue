<template>
  <b-container class="mt-5" style="border:1px solid black;height:88vh;">
      <h1>Your Cart</h1>
      <p>HEHEHEHEHEHEHEHEHE</p>
      <b-row class="active-cart"></b-row>
      <h1>Delivery Confirmation</h1>
      <b-row class="delivery-confirmation"></b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Cart'
}
</script>

<style>
.active-cart {
    height: 43.5%;
    background-color: red;
}
.delivery-confirmation {
    height: 43.5%;
    background-color: teal;
}
</style>
