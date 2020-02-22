<template>
  <q-drawer v-model="open" bordered content-class="bg-grey-2">
    <q-list>
      <q-item-label header>Menu</q-item-label>
      <q-item clickable tag="a" to="/">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-black">Home</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/">
        <q-item-section avatar>
          <q-icon name="shopping_cart" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-black">Keranjang</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  props: ['drawerOpen'],
  data() {
    return {
      open: this.drawerOpen
    }
  },
  watch: {
    drawerOpen(o, n) {
      this.open = this.drawerOpen
    }
  }
}
</script>

<style></style>
