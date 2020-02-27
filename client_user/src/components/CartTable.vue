<template>
  <div class="mt-4">
    <div class="row">
      <div class="col-md-12">
        <table v-if="carts.length > 0" class="table table-hover">
          <thead class="text-center">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th style="width: 15%;" scope="col">Quantity</th>
              <th style="width: 15%;" scope="col">#</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr :key="i" v-for="(cart, i) in carts">
              <td><img width="80px" height="80px" :src="cart.Product.image_url"></td>
              <td class="align-middle">{{ cart.Product.name }}</td>
              <td class="align-middle">{{ cart.total * cart.qty }}</td>
              <td class="align-middle">
                <input type="number" @click.prevent="selectIndex(i)" class="form-control" v-model="cart.qty">
              </td>
              <td class="align-middle">
                <button v-if="selectedIndex === i" @click.prevent="updateCart(cart.qty, cart.total ,cart.Product.id ,cart.id)" class="btn btn-sm btn-info"><i class="fa fa-floppy-o" aria-hidden="true"></i></button>&nbsp;
                <button @click.prevent="deleteCart(cart.id)" class="btn btn-secondary btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"></td>
              <td><button @click.prevent="checkoutTransaction" class="btn btn-success btn-sm"><i class="fa fa-credit-card" aria-hidden="true"></i> Checkout</button></td>
            </tr>
          </tfoot>
        </table>
        <div v-if="carts.length == 0">
            <h2 class="text-center text-danger">Cart is empty!</h2>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'CartTable',
  props: ['carts', 'userId', 'token'],
  data(){
    return {
      form: {
        qty: 0,
        total_price: 0
      },
      selectedIndex: null,
      isCheckout: []
    }
  },
  created(){
    this.totalPrice()
  },
  methods: {
    deleteCart(id){
      this.$axios.delete(`/transaction/${this.userId}/${id}`,{
        headers: {
          token: this.token
        }
      })
      .then(response => {
        this.$parent.getTransaction()
        this.$toast.fire({
          icon: 'success',
          title: `Success delete ${response.data} item`
        })
      })
      .catch(err => {
       this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
      })
    },
    changeQuantity(condition, stock, value){
      if(condition == 'plus' && value < stock){
        value++
      }else if(condition == 'minus' && value > 1){
        value--
      }
    },
    selectIndex(i){
      this.selectedIndex = i
    },
    updateCart(qty, total,product_id, transaction_id){
      const value = {
        qty,
        total: total * qty
      }
      this.$axios({
        headers: {
          token: this.token
        },
        method: 'patch',
        url: `/transaction/${this.userId}/${product_id}/${transaction_id}`,
        data: value
      })
      .then(response => {
        this.$toast.fire({
          icon: 'success',
          title: `Success update cart quantity into product id ${response.data.id}`
        })
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
      })
    },
    totalPrice(){
      this.carts.map(el => {
        this.form.total_price += el.total
      })
    },
    checkoutTransaction(){
      const value = {
        cart: this.carts
      }

      this.$axios({
        headers : {
          token: localStorage.token
        },
        method: 'put',
        url: `/transaction/${this.userId}`,
        data: value
      })
      .then(response => {
        this.$parent.getTransaction()
        this.$toast.fire({
          icon: 'success',
          title: response.data
        })
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
      })

    }
  },
}
</script>

<style scoped>

</style>