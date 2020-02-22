<template>
  <div class="q-px-xl flex-column">
    <div class="flex justify-center full-width">
      <h3 class=" full-width">Dashboard <q-separator class="q-mt-md" /></h3>
    </div>
    <q-card
      elevated
      class="q-pa-md bg-indigo-1 shadow-5 q-mx-auto"
      style="width: 60%;"
    >
      <h3 class="text-center">Welcome {{ username }}</h3>
    </q-card>

    <div class="row q-mt-xl flex justify-center">
      <q-card class="col-4 q-mr-xl bg-indigo-1">
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1">Products</q-item-label>
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

      <q-card class="col-4 bg-indigo-1">
        <q-list bordered padding class="rounded-borders">
          <q-item-label header class="text-body1">Banners</q-item-label>
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
  },
  computed: {
    products() {
      return this.$store.state.productList
    },
    banners() {
      return this.$store.state.bannerList
    }
  }
}
</script>

<style></style>
