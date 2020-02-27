<template>
  <div>
  <b-card no-body class="overflow-hidden" style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="data.imageurl" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="data.name">
          <b-card-text>
          {{formater(data.price)}}
          </b-card-text>
            <b-form-spinbutton
            id="sb-step"
            v-model="value"
            min="1"
            :max="data.stock"
            ></b-form-spinbutton>
            <b-button @click="addToCart(data)" class="mt-2" pill variant="outline-secondary">Add To Cart</b-button>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</div>
</template>

<script>
export default {
  props: ['data'],
  name: 'cardSide',
  data () {
    return {
      value: null
    }
  },
  methods: {
    addToCart (SelectedData) {
      const dataCart = {
        ProductId: SelectedData.id,
        quantity: this.value
      }
      this.$axios({
        url: 'cart',
        method: 'POST',
        headers: { token: localStorage.token },
        data: dataCart
      })
        .then(result => {
          console.log(result)
          this.toast('b-toaster-top-center')
          setTimeout(this.$emit('close-modal'), 1000)
          this.$router.push({ name: 'Home' })
          this.$router.push({ name: 'Product' })
        })
    },
    formater (price) {
      const data = `Rp. ${new Intl.NumberFormat().format(price)}`
      return data
    },
    toast (toaster, append = false) {
      this.$bvToast.toast(`Toast ${this.counter} body content`, {
        title: `Toaster ${toaster}`,
        toaster: toaster,
        solid: true,
        appendToast: append
      })
    }

  }
}
</script>
<style scope>
.card-body {
  display: flex;
}
.button {
  margin-top: auto;
}
</style>
