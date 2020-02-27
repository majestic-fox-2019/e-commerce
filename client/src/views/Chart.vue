<template>
  <div class="container">
    <div class="row mt-5" style="justify-content: center;">
      <div v-for="(data, i) in allData" :key="i">
        <b-card
          v-if="data.status === 'start'"
          no-body
          class="overflow-hidden mt-3"
          style="max-width: 540px;"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="data.Product.imageUrl"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Horizontal Card">
                <b-card-text> quantity: {{ data.quantity }} </b-card-text>
                <b-card-text>
                  price: {{ data.quantity * data.Product.price }}
                </b-card-text>
                <b-button @click.prevent="checkout(data.id)">Checkout</b-button>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>

    <div class="row mt-5" style="justify-content: center;">
      <div v-for="(data, i) in mallData" :key="i">
        <b-card
          v-if="data.status === 'start'"
          no-body
          class="overflow-hidden mt-3"
          style="max-width: 540px;"
        >
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                :src="data.Mall.imageUrl"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Horizontal Card">
                <b-card-text> quantity: {{ data.quantity }} </b-card-text>
                <b-card-text>
                  price: {{ data.quantity * data.Mall.price }}
                </b-card-text>
                <b-button @click.prevent="mCheckOut(data.id)"
                  >Checkout</b-button
                >
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chart',
  data() {
    return {
      allData: null,
      mallData: null
    }
  },
  methods: {
    checkout(id) {
      console.log('masuk sini', id)

      axios({
        method: 'patch',
        url: `${this.$store.state.baseUrl}/charts/product/${id}`,
        headers: {
          token: localStorage.getItem('e_musicToken')
        },
        data: {
          status: 'done'
        }
      })
        .then(({ data }) => {
          //   this.$store.commit('SET_QUANTITY', data.length)
          this.getChart()
          console.log(data)
          //   this.allData = data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getChart() {
      let status = 'start'
      console.log(status)

      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/charts/product/user`,
        data: {
          status
        },
        headers: {
          token: localStorage.getItem('e_musicToken')
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_QUANTITY', data.length)
          console.log(data)
          this.allData = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMallChart() {
      let status = 'start'
      console.log(status)

      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/charts/mall/user`,
        data: {
          status
        },
        headers: {
          token: localStorage.getItem('e_musicToken')
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_MALLQUANTITY', data.length)
          console.log('product mall all')

          console.log(data)
          this.mallData = data
        })
        .catch(err => {
          console.log('malll  chart ini')

          console.log(err.response)
        })
    },
    mCheckOut(id) {}
  },
  created() {
    this.getChart()
    this.getMallChart()
  }
}
</script>

<style></style>
