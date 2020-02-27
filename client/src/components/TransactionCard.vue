<template>
  <v-card :color="transaction.status == 'paid' ? 'green' : 'blue'" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div style="width: 80%;">
        <v-card-title class="headline">{{
          transaction.Product.name
        }}</v-card-title>
        <v-card-text>
          <h3>Qty : {{ transaction.qty }}</h3>
          <div v-if="transaction.status !== 'paid'">
            <h3>Price : {{ changeFormat(transaction.price) }}</h3>
            <v-select
              :items="items"
              label="Courier"
              v-model="form.courier"
              outlined
              class="mt-4"
              style="width: 35%;"
              @change="checkCost"
            >
            </v-select>
            <v-text-field
              style="width: 35%;"
              outlined
              v-model="form.weight"
              type="number"
              disabled
              label="Weight (in Kg)"
              min="1"
              required
            ></v-text-field>
            <h4>Ongkir: {{ changeFormat(ongkir.value) }}</h4>
          </div>
          <h2 style="margin-bottom: 10px;">
            Total Price:
            {{ changeFormat(totalPrice) }}
          </h2>
          <v-btn
            v-if="transaction.status !== 'paid'"
            color="success"
            @click.prevent="confirmTransaction"
            >Confirm</v-btn
          >
        </v-card-text>
      </div>

      <v-avatar
        class="ma-3"
        size="290"
        tile
        v-if="transaction.status !== 'paid'"
      >
        <img
          :src="transaction.Product.image_url"
          style="min-width: auto; min-height: auto;"
        />
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import Formatter from '@/helpers/formatter'

export default {
  name: 'CardTransaction',
  data() {
    return {
      item: {
        src:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3PeJveuNcykDIMzaQnTldqTdKBwqSCF5AfZj7_5x5JmUQXLAR',
        color: 'primary'
      },
      items: [
        {
          text: 'JNE',
          value: 'jne'
        },
        {
          text: 'TIKI',
          value: 'tiki'
        },
        {
          text: 'POS Indonesia',
          value: 'pos'
        }
      ],
      form: {
        productOwner: this.transaction.Product.UserId,
        destination: this.$store.state.userProfile.userLocationId,
        weight: 30,
        courier: null
      },
      ongkir: {
        value: 0
      }
    }
  },
  computed: {
    totalPrice() {
      return Number(this.ongkir.value) + Number(this.transaction.price)
    }
  },
  methods: {
    changeFormat(val) {
      return Formatter(val)
    },
    checkCost() {
      axios
        .post(`${this.$store.state.BASE_URL}/api/cost`, this.form)
        .then(({ data }) => {
          this.ongkir = data
        })
        .catch(({ response }) => {
          const errors = response.data
          console.log(errors)
        })
    },
    confirmTransaction() {
      const data = {
        id: this.transaction.id,
        totalPrice: this.totalPrice
      }
      this.$store.dispatch('CONFIRM_TRANSACTION', data)
    }
  },
  props: ['transaction']
}
</script>
