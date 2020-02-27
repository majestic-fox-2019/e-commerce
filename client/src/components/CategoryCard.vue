<template>
  <b-row style="margin-left:10vw; margin-right:10vw; margin-top:10vh;">
    <b-col cols="3" v-for="(item, i) in items" :key="i">
      <b-card
        :title="item.name.substring(0, 13) + '...'"
        :img-src="item.imageUrl"
        img-alt="ItemCardImage"
        img-top
        tag="ItemCardImage"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>
          <p>
            {{ item.category }}
          </p>
          <p>
            {{ item.stock }}
          </p>
        </b-card-text>

        <b-button @click="buy(item)" variant="primary">Buy</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'itemCard',
  data() {
    return {}
  },
  methods: {
    buy(data) {
      if (!localStorage['e_musicToken']) {
        this.$router.push({
          path: '/login'
        })
      } else if (data.UserId == localStorage['e_musicId']) {
        this.errorMessage('oppps..... you cannot buy your own product')
      } else {
        this.$prompt('Jumlah yang akan dibeli adalah', 'Quantity', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
        })
          .then(({ value }) => {
            axios({
              method: 'post',
              url: `${this.$store.state.baseUrl}/charts/product/${data.id}`,
              headers: {
                token: localStorage.getItem('e_musicToken')
              },
              data: {
                quantity: value
              }
            })
              .then(({ data }) => {
                console.log(data)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: 'Input canceled'
            })
          })
      }
    },
    errorMessage(pesan) {
      this.$message.error(pesan)
    }
  },
  props: ['items']
}
</script>

<style scoped></style>
