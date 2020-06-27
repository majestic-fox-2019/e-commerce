<template>
  <div class="q-mx-auto" style="width:80%;">
    <div class="q-my-md">
      <p class="text-h4">Daftar Pesanan</p>
    </div>
    <!-- <pre>{{ orders }}</pre> -->
    <div>
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-indigo-5 text-white shadow-2"
      >
        <q-tab
          class="text-weight-bold"
          @click="$router.push('/order-list')"
          name="now"
          label="Pesanan Saat Ini"
        />
        <q-tab
          class="text-weight-bold"
          @click="$router.push('/order-list/arrived')"
          name="arrived"
          label="Pesanan Tiba"
        />
        <q-tab
          class="text-weight-bold"
          @click="$router.push('/order-list/done')"
          name="done"
          label="Pesanan Selesai"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="tab">
          <router-view />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  created() {
    this.getAllOrder()
  },
  data() {
    return {
      tab: 'now'
    }
  },
  computed: {
    orders() {
      return this.$store.state.orderList
    }
  },
  methods: {
    getAllOrder() {
      this.$store.dispatch('GET_ON_CONFIRM_ORDERS')
    }
  }
}
</script>

<style></style>
