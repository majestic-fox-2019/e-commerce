<template>
  <v-card color="blue" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div style="width: 80%;">
        <v-card-title class="headline">{{
          transaction.Product.name
        }}</v-card-title>
        <v-card-text>
          <h3>Qty : {{ transaction.qty }}</h3>
          <h3>Price : {{ changeFormat(transaction.price) }}</h3>
          <v-select
            :items="items"
            label="Courier"
            v-model="form.courier"
            outlined
            class="mt-4"
            style="width: 35%;"
            @change="ubah"
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
          <h2 style="margin-bottom: 10px;">
            Total Price:
            {{ changeFormat(Number(ongkir.value) + Number(transaction.price)) }}
          </h2>
          <v-btn color="success">Confirm</v-btn>
        </v-card-text>
      </div>

      <v-avatar class="ma-3" size="290" tile>
        <img
          :src="transaction.Product.image_url"
          style="min-width: auto; min-height: auto;"
        />
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
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
      }
    }
  },
  computed: {
    ongkir() {
      return this.$store.state.ongkir
    }
  },
  methods: {
    changeFormat(val) {
      return Formatter(val)
    },
    ubah() {
      this.$store.dispatch('FETCH_ONGKIR', this.form)
    }
  },
  props: ['transaction']
}
</script>
