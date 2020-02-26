<template>
  <q-card>
    <!-- <pre>{{ carts }}</pre> -->
    <q-card-actions class="flex justify-end col col-sm-12">
      <q-btn :loading="loadingDel" rounded flat color="black" icon="more_vert">
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          anchor="bottom left"
          self="bottom right"
        >
          <q-list style="min-width: 100px">
            <q-item clickable @click="$emit('getDelete', cart.ProductId)">
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-black">Hapus Item</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-actions>

    <q-separator class="col col-sm-12" />

    <div class="col-12 col-sm-12 row">
      <q-img
        class="col-12 col-sm-12 col-md-4 q-px-sm q-mx-auto flex justify-center"
        :srcset="
          `${cart.Product.image_url},
             ${cart.Product.image_url} 1.5x,
             ${cart.Product.image_url} 2x`
        "
        style="width:200px;"
        :src="cart.Product.image_url"
      />
      <q-separator vertical />
      <div
        class="q-pa-md col-12 col-sm-12 col-md-8 q-mt-md flex justify-center items-center content-center q-mx-auto"
      >
        <q-list class="shadow-5 rounded-borders">
          <q-item>
            <q-item-section class="ellipsis-3-lines">{{
              cart.Product.name
            }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>Jumlah: {{ cart.quantity }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'CheckoutProductCard',
  props: ['cart', 'loadingDelete'],
  data() {
    return {
      confirm: false,
      loadingDel: this.loadingDelete
    }
  }
}
</script>

<style></style>
