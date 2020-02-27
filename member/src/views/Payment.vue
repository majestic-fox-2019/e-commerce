<template>
  <v-container>
    <v-row>
      <v-col :cols="8">
        <v-card class="pa-4" tile :elevation="16">
          <h2 class="mb-5">Shipping Address</h2>
          <form>
            <v-text-field label="Name" outlined required></v-text-field>
            <v-text-field label="E-mail" v-model="email" outlined required></v-text-field>
            <v-textarea label="Address" placeholder="Input your address here" outlined required></v-textarea>
          </form>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card class="pa-5" tile :elevation="16">
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
export default {
  data() {
    return {
      email: localStorage.user
    };
  }
};
</script>

<style>
</style>