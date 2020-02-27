<template>
  <section>
    <div class="container mt-5 mb-5">
      <div class="cart">
        <h3 class="title-section">CART</h3>
        <b-row>
          <b-col md="7">
            <div v-if="isBusy" class="w-100">
              <div class="text-center empty-table">
                <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
              </div>
            </div>
            <div v-else>
              <div v-if="getCarts.length === 0" class="item-cart">
                <div class="content-item-cart text-center">
                  <div class="keranjang-kosong">
                    <img src="@/assets/icons/cart.png" style="height:125px">
                    <h4>Keranjang anda masih kosong</h4>
                  </div>
                </div>
              </div>
              <div v-if="getCarts.length > 0">
                <div v-for="(cart, idx) in getCarts" :key="idx">
                  <div class="item-cart" :class="statusStock[cart.Product.name] ? 'bg-stock' : ''">
                    <div class="content-item-cart">
                      <b-row>
                        <b-col md="9">
                          <h4>{{ cart.Product.name }}</h4>
                          <h6>Category : {{ cart.Product.Category.name }}</h6>
                          <h5 class="cart-price">{{ toIDRprice(cart.Product.price * cart.quantity) }}</h5>
                          <div class="sisa-stock" v-if="statusStock[cart.Product.name]">
                            <p>SISA STOCK : {{ statusStock[cart.Product.name].sisa_stock }}</p>
                          </div>
                        </b-col>
                        <b-col md="3" class="text-right">
                          <div class="right-cart">
                            <div class="delete-cart">
                              <b-button variant="danger" size="sm" @click="deleteCart(cart.id)"><i class="fa fa-trash"></i>&nbsp;Delete</b-button>
                            </div>
                            <div class="quantity mt-2">
                              <p>Quantity</p>
                              <b-button class="btn btn-dark btn-minus" @click="minusCart(cart.id)"><i class="fa fa-minus"></i></b-button>
                              <span class="total-quantity">{{ cart.quantity }}</span>
                              <b-button class="btn btn-dark btn-plus" @click="plusCart(cart.id)"><i class="fa fa-plus"></i></b-button>
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="5">
            <div class="cart-checkout">
              <div class="pengiriman">
                <h5>Pengiriman</h5>
                <b-form-group>
                  <b-form-textarea
                    id="address"
                    v-model="formPembayaran.address"
                    placeholder="Masukan alamat anda"
                    rows="2"
                    max-rows="5"
                  ></b-form-textarea>
                </b-form-group>
              </div>
              <div class="total-belanja">
                <h5 class="title-total">Total Belanja</h5>
                <h3 class="price-total-belanja">{{ toIDRprice(getTotalPrice) }}</h3>
              </div>
              <b-button class="btn-beli w-100" :disabled="formPembayaran.address == '' || getCarts.length === 0" @click="doPembayaran"><i class="fa fa-chevron-circle-right"></i>&nbsp;Pembayaran</b-button>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { url } from '@/mixins/mixins'

export default {
  mixins: [url],
  data(){
    return{
      statusStock: {},
      formPembayaran: {
        address: ''
      }
    }
  },
  created() {
    this.getAllCart()
  },
  computed: {
    getCarts(){
      return this.$store.state.carts
    },
    getTotalPrice(){
      return this.$store.state.totalPrice
    },
    isBusy(){
      return this.$store.state.isBusy
    }
  },
  watch: {
    getCarts(){
      this.statusStock = {}
    }
  },
  methods: {
    getAllCart(){
      this.$store.dispatch('getCart')
    },
    minusCart(id){
      const token = localStorage.getItem('token')
      axios.get(`${this.url}/cart/minquantity/${id}`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.getAllCart()
      })
      .catch(err => {
        this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
      })
    },
    plusCart(id){
      const token = localStorage.getItem('token')
      axios.get(`${this.url}/cart/plusquantity/${id}`, {
        headers: { Bearer : token }
      })
      .then(res => {
        this.getAllCart()
      })
      .catch(err => {
        this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
      })
    },
    deleteCart(id){
      const token = localStorage.getItem('token')
      this.$vToastify.prompt({
        title: "Delete",
        body: "Anda ingin hapus produk ini dari cart?",
        answers: { Yes: true, No: false }
      })
      .then(value => {
        if(value){
          axios.delete(`${this.url}/cart/${id}`, {
            headers: { Bearer : token }
          })
          .then(res => {
            this.$vToastify.notifSuccess('Berhasil dihapus', 'Yeay!')
            this.getAllCart()
          })
          .catch(err => {
            this.$vToastify.notifError(`${err.response.data.message}`, "Gagal!")
          })
        }
      })
    },
    doPembayaran(){
      const token = localStorage.getItem('token')
      if(this.formPembayaran.address === ''){
        this.$vToastify.notifError('Alamat anda harus diisi', 'Gagal!')
      }else{
        const user_id = JSON.parse(localStorage.getItem('user')).id
        const name_user = JSON.parse(localStorage.getItem('user')).name
        const totalPrice = this.$store.state.totalPrice
        const carts = this.$store.state.carts
        let productsDetail = []
        carts.map(el => {
          productsDetail.push(`${el.Product.name} ${el.quantity}pcs`)
        })
        let objBayar = {
          name: name_user,
          address: this.formPembayaran.address,
          products: productsDetail.join(', '),
          total_price: totalPrice
        }
        axios.post(`${this.url}/transaction/${user_id}`, objBayar, {
          headers: { Bearer : token }
        })
        .then(res => {
          this.getAllCart()
          let kode_transaksi = res.data.payload.code_transaction
          this.$router.push({ name: 'Payment', params: { id: kode_transaksi } })
        })
        .catch(err => {
          if(err.response.status === 404){
            this.$vToastify.notifError(`Cek belanjaan kamu karena ada stock yang tidak mencukupi`, "Gagal!")
            this.statusStock = err.response.data.message
          }
        })
      }
    },
    toIDRprice(price){
      let resultPrice = ''
      let strPrice = String(price)
      for(let j = 0; j < strPrice.length; j++){
        if((strPrice.length - j) % 3 === 0 && j !== 0){
          resultPrice += '.' + strPrice[j]
        }else{
          resultPrice += strPrice[j]
        }
      }
      return `Rp. ${resultPrice}`
    }
  },
}
</script>

<style scoped>

</style>