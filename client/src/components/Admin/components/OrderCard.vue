<template>
  <q-card class="shadow-10 row">
    <!-- <pre>{{ order }}</pre> -->
    <q-card-actions class="flex justify-between col-12 col-sm-12">
      <p class="text-weight-bolder" style="margin: auto 0;" v-if="order">
        {{ new Date(order.updatedAt).toDateString() }}
        {{ new Date(order.updatedAt).toLocaleTimeString() }}
      </p>
    </q-card-actions>

    <q-separator class="col-12 col-sm-12" />

    <div class="col-12 col-sm-12 row">
      <div
        class="col-2 col-sm-2 q-pa-sm flex justify-center"
        style="margin: auto;"
      >
        <img
          style="margin: auto;"
          :src="order.Product.image_url"
          alt="asd"
          width="100"
          height="100"
        />
      </div>
      <div
        class="col-10 col-sm-10 col-md-10 q-my-md flex justify-center items-center content-center q-mx-auto"
      >
        <div class="full-width row">
          <div class="col-4 col-sm-4 flex-column">
            <p>{{ order.Product.name }}</p>
            <small class="text-weight-bold">Jumlah {{ order.quantity }}</small>
            <p class="text-body1 text-weight-bold text-deep-orange-9">
              Rp.
              {{
                order.Product.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
              /unit
            </p>
          </div>
          <q-separator vertical />
          <div class="col-4 col-sm-4 flex-column justify-center q-ml-sm">
            <p class="text-center text-weight-bold">Customer Info:</p>
            <p>Username : {{ order.User.username }}</p>
            <p>Email : {{ order.User.email }}</p>
            <p>Phone : {{ order.Product.phone || 'null' }}</p>
          </div>
          <q-separator vertical />
          <div
            class="col-3 col-sm-3 flex-column items-center content-center q-mx-auto"
          >
            <p class="text-center text-weight-bold">Total :</p>
            <p
              class="text-center text-weight-bold text-body1 text-deep-orange-9"
            >
              Rp. {{ totalCost }}
            </p>
            <q-btn
              color="green"
              class="text-black text-weight-bold shadow-5 flex justify-center q-mx-auto"
              @click="
                $emit('approve', {
                  productId: order.ProductId,
                  userId: order.UserId
                })
              "
              v-if="!order.approved"
            >
              Approve
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'OrderCard',
  props: ['order'],
  data() {
    return {
      confirm: false,
      loadingDel: this.loadingDelete
    }
  },
  computed: {
    totalCost() {
      let total = 0
      const { order } = this
      total += order.quantity * order.Product.price
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style></style>
