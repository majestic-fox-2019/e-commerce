<template>
  <q-card class="q-pa-xl q-ma-xl bg-indigo-5 shadow-10">
    <span v-if="carts.length !== 0">
      <q-card class="shadow-10">
        <h6 class="q-py-sm q-ml-md text-weight-bold text-h5">Keranjang</h6>
      </q-card>
      <q-card class="shadow-10">
        <q-table
          :dense="$q.screen.lt.md"
          :data="carts"
          :columns="columns"
          row-key="name"
          table-class="text-weight-bold text-body1"
          binary-state-sort
        >
          <template v-slot:body-cell-name="props">
            <q-td class="text-left" :props="props">
              <a
                class="link text-body2"
                @click="
                  $router.push(
                    `/${props.row.Product.id}/${props.row.Product.name}`
                  )
                "
                >{{ props.row.Product.name }}</a
              >
            </q-td>
          </template>
          <template v-slot:body-cell-preview="props">
            <q-td class="text-center" :props="props">
              <q-btn rounded color="secondary">
                Preview
                <q-tooltip>
                  <img :src="props.value" alt="asd" width="300" height="300" />
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-price="props">
            <q-td class="text-left" :props="props">
              Rp.
              {{
                props.row.Product.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
            </q-td>
          </template>
          <template v-slot:body-cell-quantity="props">
            <q-td class="text-left" :props="props">
              <q-input
                v-model="props.row.quantity"
                type="number"
                :loading="loadingQuantity"
                @change="updateQuantity(props.row.id)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td class="text-left" :props="props">
              <q-btn
                icon="delete"
                class="text-weight-bold"
                color="red"
                :loading="loadingDel"
                @click="getDelete(props.row.ProductId)"
              >
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  content-class="bg-info"
                >
                  <span class="text-body2 text-black">
                    Hapus item
                  </span>
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card>

      <q-card class="q-my-lg flex shadow-10">
        <q-space />
        <p class="text-h6 q-py-md" style="margin:auto;">
          Total Belanja : Rp.
          {{ totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
        </p>
        <q-separator vertical class="q-ml-md" />
        <form @submit.prevent="checkStock()">
          <q-btn
            type="submit"
            class="q-ma-md text-black text-weight-bold"
            color="orange"
            :loading="loadingCheckout"
          >
            Checkout
          </q-btn>
        </form>
      </q-card>
    </span>

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
        :msg="'Hapus item dari keranjang?'"
        @OK="deleteItem"
        @cancel="confirm = false"
      />
    </div>
  </q-card>
</template>

<script>
import axios from '../axios'
import Confirm from '../components/Confirm'
export default {
  name: 'Cart',
  created() {
    this.getCart()
  },
  components: {
    Confirm
  },
  data() {
    return {
      confirm: false,
      productId: null,
      loadingQuantity: false,
      loadingDel: false,
      loadingCheckout: false,
      columns: [
        {
          name: 'name',
          label: 'Nama Produk',
          align: 'left',
          field: (row) => row.Product.name,
          sortable: true
        },
        {
          name: 'price',
          label: 'Harga',
          align: 'left',
          field: (row) => row.Product.price,
          sortable: true
        },
        {
          name: 'preview',
          align: 'center',
          label: 'Preview',
          field: 'image',
          field: (row) => row.Product.image_url
        },
        {
          name: 'quantity',
          label: 'Jumlah Pembelian',
          align: 'left',
          field: (row) => row.quantity,
          sortable: true
        },
        {
          name: 'action',
          align: 'center',
          field: (row) => row.id
        }
      ]
    }
  },
  computed: {
    carts() {
      return this.$store.state.cartList
    },
    totalCost() {
      let total = 0
      let carts = this.carts
      carts.forEach((item) => {
        total += item.quantity * item.Product.price
      })
      return total
    }
  },
  methods: {
    getCart() {
      this.$store.dispatch('GET_USER_CART')
    },
    updateQuantity(cartId) {
      this.loadingQuantity = true
      const cart = this.carts.find((item) => item.id == cartId)
      axios({
        method: 'PUT',
        url: '/carts/',
        headers: {
          token: localStorage.token
        },
        data: {
          quantity: cart.quantity,
          id: cart.ProductId
        }
      })
        .then(() => {
          this.loadingQuantity = false
        })
        .catch((err) => {
          this.loadingQuantity = false
          this.$q.notify({
            icon: 'announcement',
            progress: true,
            color: 'info',
            textColor: 'black',
            classes: 'glossy',
            message: `Server lagi sibuk nih, silahkan coba lagi`
          })
        })
    },
    getDelete(productIdTemp) {
      this.productId = productIdTemp
      this.confirm = true
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
          this.getCart()
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
    checkStock() {
      this.loadingCheckout = true
      let orderItems = []
      this.carts.forEach((item) => {
        orderItems.push({
          id: item.ProductId,
          quantity: item.quantity
        })
      })
      axios({
        method: 'POST',
        url: '/carts/check',
        headers: {
          token: localStorage.token
        },
        data: {
          items: orderItems
        }
      })
        .then(({ data }) => {
          //   console.log(data)
          this.loadingCheckout = false
          const username = localStorage.username
          this.$router.push(`/checkout/${username}/confirm`)
        })
        .catch((err) => {
          this.loadingCheckout = false
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

<style scoped>
.link {
  font-weight: bold;
  cursor: pointer;
}

.link:hover {
  color: rgb(95, 95, 238);
}
</style>
