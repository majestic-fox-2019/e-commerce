<template>
  <div>
    <p class="text-h4 text-center q-mt-sm animated fadeIn">Pesanan Saat Ini</p>
    <q-separator />
    <!-- <pre>{{ orders }}</pre> -->
    <div v-if="orders.length != 0">
      <q-intersection
        v-for="order in orders"
        :key="order.id"
        transition="scale"
        class="full-width q-my-md"
      >
        <OrderCard :order="order" :status="'Sedang Di Proses'" />
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
import OrderCard from './components/OrderCard'
export default {
  name: 'ConfirmedOrder',
  components: {
    OrderCard
  },
  created() {
    if (this.$store.state.orderList.length == 0) {
      this.getUserOrder()
    }
  },
  computed: {
    orders() {
      return this.$store.state.orderList.filter(
        (el) => el.confirm && !el.approved
      )
    }
  },
  methods: {
    getUserOrder() {
      this.$store.dispatch('GET_ON_CONFIRM_ORDERS')
    }
  }
}
</script>

<style></style>
