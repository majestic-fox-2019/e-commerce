<template>
  <q-drawer v-model="left" side="left" elevated>
    <q-list>
      <q-item-label header>Menu</q-item-label>
      <q-item clickable tag="a" @click="toDashboard">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" @click="toProductList">
        <q-item-section avatar>
          <q-icon name="view_list" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Product List</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" @click="toBannerList">
        <q-item-section avatar>
          <q-icon name="image" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Banner List</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" @click="toOrderList">
        <q-item-section avatar>
          <q-icon name="assignment_turned_in" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Order List</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" @click="toTransactionList">
        <q-item-section avatar>
          <q-icon name="store" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Transaction List</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'DrawerAdmin',
  props: ['open'],
  data() {
    return {
      left: false
    }
  },
  watch: {
    open(o, n) {
      this.left = this.open
    }
  },
  methods: {
    toDashboard() {
      this.$emit('drawer')
      this.$router.push('/admin/dashboard')
    },
    toProductList() {
      this.$emit('drawer')
      this.$router.push('/admin/products')
    },
    toBannerList() {
      this.$emit('drawer')
      this.$router.push('/admin/banners')
    },
    toOrderList() {
      this.$emit('drawer')
      this.$router.push('/admin/orders')
    },
    toTransactionList() {
      this.$emit('drawer')
      this.$router.push('/admin/transactions')
    }
  }
}
</script>

<style></style>
