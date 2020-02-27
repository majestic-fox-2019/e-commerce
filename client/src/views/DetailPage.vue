<template>
  <div class="q-mx-auto q-my-xl" style="width: 80%;">
    <q-card class="my-card shadow-10 bg-indigo-5">
      <q-card-section class="row">
        <div class="col col-sm-12 col-md-12 col-lg-6 q-pa-xl">
          <q-card
            class="q-pa-md shadow-10 flex justify-center q-mx-auto"
            style="width:80%;"
          >
            <q-img :src="product.image_url" width="80%" height="80%" />
          </q-card>
        </div>

        <div
          class="q-mx-auto q-pa-xl col col-sm-12 col-md-12 col-lg-6 flex justify-center"
        >
          <q-card
            class="full-width q-py-md q-px-xl shadow-10 q-mx-auto"
            style="display:table-cell;"
          >
            <h2 class="text-h6">{{ product.name }}</h2>
            <q-separator></q-separator>
            <h4 class="text-h6 text-weight-bold" v-if="product.price">
              Rp.
              {{
                product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }}
            </h4>
            <p class="text-body1">Stock : {{ product.stock }}</p>

            <form
              class="flex-column"
              @submit.prevent="addToCart(product.id)"
              v-if="product.stock > 0"
            >
              <q-input
                class="q-mb-md flex"
                type="number"
                label="Jumlah Pembelian"
                v-model="quantity"
              />
              <q-btn
                color="orange"
                class="text-black text-weight-bold text-h6 flex"
                type="submit"
                :loading="loading"
                >tambah ke keranjang</q-btn
              >
            </form>
            <h6 class="text-weight-bold text-deep-orange-10" v-else>
              Stock Habis
            </h6>
            <q-separator class="q-my-md"></q-separator>
            <p class="text-body1">Description :</p>
            <span v-html="product.description"></span>
          </q-card>
        </div>
      </q-card-section>
      <!-- <pre>{{ product }}</pre> -->
      <div v-if="confirm">
        <Confirm
          :active="confirm"
          :msg="'Cek keranjang atau lanjut belanja?'"
          @OK="$router.push('/cart')"
          @cancel="$router.push('/')"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from '../axios'
import Confirm from '../components/Confirm'
export default {
  name: 'DetailPage',
  components: {
    Confirm
  },
  created() {
    this.getProductDetail()
  },
  data() {
    return {
      quantity: 1,
      confirm: false,
      loading: false
    }
  },
  computed: {
    product() {
      const { id } = this.$route.params
      if (this.$store.state.productList.length != 0) {
        return this.$store.state.productList.filter((item) => item.id == id)[0]
      } else {
        return this.$store.state.productDetail
      }
    }
  },
  methods: {
    getProductDetail() {
      const { id } = this.$route.params
      this.$store.dispatch('GET_PRODUCT_DETAIL', id)
    },
    addToCart(productId) {
      this.loading = true
      if (!this.$store.state.isLogin) {
        this.loading = false
        this.$q.notify({
          type: 'info',
          progress: true,
          textColor: 'black',
          classes: 'glossy',
          message: `Kamu belum login, Login dulu yuk`
        })
        this.$router.push('/login')
      } else {
        axios({
          method: 'POST',
          url: '/carts/',
          headers: {
            token: localStorage.token
          },
          data: {
            id: productId,
            quantity: this.quantity
          }
        })
          .then(({ data }) => {
            this.loading = false
            this.$q.notify({
              icon: 'check_circle',
              progress: true,
              color: 'green',
              textColor: 'black',
              classes: 'glossy',
              message: `Berhasil menambahkan ke keranjang`
            })
            this.confirm = true
          })
          .catch(({ response }) => {
            this.loading = false
            this.$q.notify({
              type: 'negative',
              classes: 'glossy',
              message: response.data.msg
            })
          })
      }
    }
  },
  beforeDestroy() {
    this.confirm = false
  }
}
</script>

<style scoped>
.asd {
  vertical-align: top;
}
</style>
