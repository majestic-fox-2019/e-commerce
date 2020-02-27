<template>
  <v-container>
    <v-row>
      <v-col :cols="8">
        <v-card class="pa-2" tile outlined>
          <h2 class="pa-3">Shipping Address</h2>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card class="pa-5" tile outlined>
          <h2>Payment Method</h2>
          <div class="my-5"></div>
          <v-btn color="teal" :elevation="4" filled>Bayar</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartProduct from "../components/CartProduct";
import api from "../helper/api";
import Swal from "sweetalert2";
export default {};
</script>

<style>
</style>