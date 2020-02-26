<template>
  <q-card class="q-my-lg q-mx-auto bg-indigo-5 row" style="width: 80%;">
    <div
      class="col-12 col-sm-12 col-md-7 col-lg-7 q-px-lg flex-column"
      v-if="carts.length !== 0"
    >
      <q-card class="shadow-10 col-12 col-sm-12">
        <h6 class="q-py-sm q-ml-md">Pesanan Anda</h6>
      </q-card>

      <CheckoutProductCard
        class="shadow-10 col-12 col-sm-12 row q-mb-md"
        v-for="cart in carts"
        :cart="cart"
        :key="cart.id"
        :loadingDelete="loadingDel"
        @getDelete="getDelete"
      />
    </div>

    <div
      class="col-12 col-sm-12 col-md-5 col-lg-5 q-px-lg flex-column"
      v-if="carts.length !== 0"
    >
      <q-card class="shadow-10 col-12 col-sm-12">
        <h6 class="q-py-sm q-ml-md">Rincian Pembayaran</h6>
      </q-card>

      <q-card class="shadow-10 q-mb-md">
        <q-list separator>
          <q-item class="full-width">
            <q-item-section class="text-h6">Total:</q-item-section>
            <q-item-section class="text-right text-body1">
              Rp.
              {{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
            </q-item-section>
          </q-item>
          <q-item class="flex justify-between">
            <q-btn
              color="orange"
              rounded
              class="full-width text-weight-bold text-black"
              :loading="loading"
              @click="checkout"
            >
              Bayar
            </q-btn>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <q-card
      class="col-12 col-sm-12 shadow-10 q-my-xl q-mx-auto q-py-md"
      style="width:80%;"
      v-else
    >
      <h4 class="text-center">Belanjaanmu masih kosong</h4>
      <q-btn
        class="flex text-center q-mx-auto items-center text-weight-bold text-h6"
        color="primary"
        @click="$router.push('/')"
        >Belanja Sekarang</q-btn
      >
    </q-card>

    <div v-if="confirm">
      <Confirm
        :active="confirm"
        :msg="'Hapus item dari daftar pesanan?'"
        @OK="deleteItem"
        @cancel="confirm = false"
      />
    </div>
  </q-card>
</template>

<script>
import axios from '../axios'
import CheckoutProductCard from '../components/User/CheckoutProductCard'
import Confirm from '../components/Confirm'
export default {
  name: 'ConfirmOrder',
  components: {
    Confirm,
    CheckoutProductCard
  },
  created() {
    const { cartList } = this.$store.state
    if (cartList.length === 0) {
      this.getUserCart()
    }
  },
  data() {
    return {
      confirm: false,
      loading: false,
      productId: null,
      loadingDel: false
    }
  },
  computed: {
    carts() {
      return this.$store.state.cartList
    },
    total() {
      let total = 0
      let carts = this.carts
      carts.forEach((item) => {
        total += item.quantity * item.Product.price
      })
      return total
    }
  },
  methods: {
    getUserCart() {
      this.$store.dispatch('GET_USER_CART')
    },
    getDelete(productIdTemp) {
      this.confirm = true
      this.productId = productIdTemp
      this.loadingDel = true
    },
    deleteItem() {
      this.loadingDel = true
      axios({
        method: 'DELETE',
        url: '/carts/',
        headers: {
          token: localStorage.token
        },
        data: {
          id: this.productId
        }
      })
        .then(({ data }) => {
          this.loadingDel = false
          // console.log(data)
          this.$q.notify({
            icon: 'announcement',
            progress: true,
            color: 'info',
            textColor: 'black',
            classes: 'glossy',
            message: `Deleted ${data.name}`
          })
          this.getUserCart()
        })
        .catch((err) => {
          this.loadingDel = false
          this.$q.notify({
            icon: 'announcement',
            progress: true,
            color: 'info',
            textColor: 'black',
            classes: 'glossy',
            message: err.response.data.msg
          })
        })
    },
    checkout() {
      this.loading = true
      let items = []
      this.carts.forEach((cart) => {
        items.push({
          id: cart.ProductId,
          quantity: cart.quantity
        })
      })
      axios({
        method: 'PATCH',
        url: '/carts/',
        headers: {
          token: localStorage.token
        },
        data: {
          items: items
        }
      })
        .then(({ data }) => {
          this.loading = false
          console.log(data)
          this.$router.push('/order-list')
        })
        .catch((err) => {
          //   console.log(err.response.data)
          this.loading = false
          const { data } = err.response
          let error = ``
          data.msg.forEach((err) => {
            error += `<li>${err}</li>`
          })
          this.$q.notify({
            message: `
                <p class="text-weight-bold text-body1">Stock untuk barang berikut tidak mencukupi</p>
                <ul class="text-body1">${error}</ul>
                <p class="text-body1">Untuk informasi jumlah stock, silahkan cek ke halaman produk</p>
                `,
            color: 'primary',
            multiLine: true,
            html: true,
            actions: [
              {
                label: 'OK',
                color: 'yellow'
                // ,
                // handler: () => {
                //   /* ... */
                // }
              }
            ]
          })
        })
    }
  }
}
</script>

<style></style>
