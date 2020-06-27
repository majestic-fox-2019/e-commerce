<template>
  <div>
    <p class="text-h4 text-center q-mt-sm animated fadeIn">
      Pesananan Tiba
    </p>
    <q-separator />
    <!-- <pre>{{ orders }}</pre> -->
    <div v-if="orders.length != 0">
      <q-intersection
        v-for="order in orders"
        :key="order.id"
        transition="scale"
        class="full-width q-my-md"
      >
        <OrderCard
          :order="order"
          @confirm="confirmOrder"
          :loading="loading"
          :status="'Tiba di tujuan'"
        />
      </q-intersection>
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
  </div>
</template>

<script>
import axios from '../../axios'
import OrderCard from './components/OrderCard'
export default {
  name: 'ArrivedOrder',
  components: {
    OrderCard
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.getUserOrder()
  },
  computed: {
    orders() {
      return this.$store.state.orderList.filter(
        (el) => el.confirm && el.approved
      )
    },
    totalCost() {
      let total = 0
      const { order } = this
      total += order.quantity * order.Product.price
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  methods: {
    getUserOrder() {
      this.$store.dispatch('GET_ON_CONFIRM_ORDERS')
    },
    confirmOrder(productId) {
      this.loading = true
      axios({
        method: 'DELETE',
        url: '/carts/confirm',
        headers: {
          token: localStorage.token
        },
        data: {
          productId: productId
        }
      })
        .then(({ data }) => {
          this.loading = false
          this.getUserOrder()
          this.$q.notify({
            message: `
                <p class="text-weight-bold text-body1">Pesanan Selesai</p>
                <ul class="text-body1">
                    <li>${data.product}</li>
                </ul>
                `,
            color: 'primary',
            multiLine: true,
            html: true,
            actions: [
              {
                label: 'OK',
                color: 'deep-orange'
              }
            ]
          })
        })
        .catch((err) => {
          this.loading = false
          console.log(err.response.data)
        })
    }
  }
}
</script>

<style></style>
