<template>
  <div class="q-px-xl flex-column">
    <div class="flex justify-center full-width q-mt-lg">
      <p class="text-h3 full-width">Dashboard <q-separator /></p>
    </div>

    <q-card
      elevated
      class="bg-indigo-1 shadow-5 q-mx-auto"
      style=" width: 60%;"
    >
      <h3 class="q-pa-md text-center">Welcome {{ username }}</h3>
    </q-card>

    <div class="row flex justify-center q-mb-xl">
      <q-card
        class="col-12 col-sm-12 col-md-4 q-mr-xl bg-green-1 own-card"
        @click="$router.push('/admin/orders')"
      >
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1 text-weight-bold"
            >Order</q-item-label
          >
          <q-separator />
          <q-item v-ripple>
            <q-item-section avatar top>
              <q-avatar
                icon="assignment_turned_in"
                color="primary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">Order's to approve</q-item-label>
              <q-item-label caption>Total Record</q-item-label>
            </q-item-section>

            <q-item-section side class="text-body1 text-black">
              {{ orders }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <q-card
        class="col-12 col-sm-12 col-md-4 bg-green-1 own-card"
        @click="$router.push('/admin/transactions')"
      >
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1 text-weight-bold"
            >Transaction</q-item-label
          >
          <q-separator />
          <q-item v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="store" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">This month's sale</q-item-label>
              <q-item-label caption>Total Record</q-item-label>
            </q-item-section>

            <q-item-section side class="text-body1 text-black">
              {{ transactions }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <div class="row q-my-xl flex justify-center">
      <q-card
        class="col-12 col-sm-12 col-md-4 q-mr-xl bg-indigo-1 own-card"
        @click="$router.push('/admin/products')"
      >
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1 text-weight-bold"
            >Products</q-item-label
          >
          <div v-for="category in categories" :key="category.name">
            <q-separator />
            <q-item v-ripple>
              <q-item-section avatar top>
                <q-avatar
                  :icon="category.icon"
                  color="primary"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ category.name }}</q-item-label>
                <q-item-label caption>Total Record</q-item-label>
              </q-item-section>

              <q-item-section side class="text-body1 text-black">
                {{
                  products.filter((el) => el.category == category.name).length
                }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card>

      <q-card
        class="col-12 col-sm-12 col-md-4 bg-indigo-1 own-card"
        @click="$router.push('/admin/products')"
      >
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1 text-weight-bold"
            >Banners</q-item-label
          >
          <q-separator />
          <q-item v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="image" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Banners</q-item-label>
              <q-item-label caption>Total Record</q-item-label>
            </q-item-section>

            <q-item-section side class="text-body1 text-black">
              {{ banners.length }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      username: localStorage.getItem('username'),
      categories: [
        { name: 'Desktop', icon: 'desktop_windows' },
        { name: 'Laptop', icon: 'laptop' },
        { name: 'Keyboard', icon: 'keyboard' },
        { name: 'Monitor', icon: 'tv' },
        { name: 'Mouse', icon: 'mouse' }
      ]
    }
  },
  created() {
    this.$store.dispatch('GET_ALL_PRODUCT_LIST')
    this.$store.dispatch('GET_ALL_BANNER_LIST')
    this.$store.dispatch('GET_ON_CONFIRM_ORDERS')
    this.$store.dispatch('GET_TRANSACTION_LIST')
  },
  computed: {
    products() {
      return this.$store.state.productList
    },
    banners() {
      return this.$store.state.bannerList
    },
    orders() {
      return this.$store.state.orderList.length
    },
    transactions() {
      return this.$store.state.transactionList.filter(
        (el) => new Date(el.createdAt).getMonth() == new Date().getMonth()
      ).length
    }
  }
}
</script>

<style scoped>
.own-card {
  box-shadow: 1px 1px 1px 1px blueviolet;
  cursor: pointer;
  transition: 0.7s !important;
}

.own-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
</style>
