<template>
  <v-dialog
    v-model="dialog"
    width="50vw"
    persistent
  >
    <vue-progress-bar></vue-progress-bar>
    <v-card>
      <v-card-title class="headline">{{type}}</v-card-title>

      <v-card-text>
        <Login v-show="type==='Login'"  @close="$emit('close')"></Login>
        <Register v-show="type==='Register'" @close="$emit('close')"></Register>
        <Cart v-show="type==='Cart'" @close="$emit('close')" :dialog="dialog"></Cart>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red"
          @click="$emit('close')">
          close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import Cart from './Cart.vue'

export default {
  props:['type','dialog'],
  components:{
    Login,
    Register,
    Cart
  }
}
</script>

<style>

</style>