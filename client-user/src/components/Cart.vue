<template>
  <div>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center" width="30%">Image</th>
            <th class="text-center" width="10%">Name</th>
            <th class="text-center" width="30%">Price</th>
            <th class="text-center" width="30%">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, i) in carts" :key="cart.id" class="text-center" :bgcolor="error[cart.id] ? 'red' : ''">
            <td>{{ i + 1  }}</td>
            <td align='center'>
              <v-img
                height="100"
                width="100"
                :src="cart.Product.image_url+'?'+`${Date.now()}`"
                >
              </v-img>
            </td>
            <td>{{ cart.Product.name }} </td>
            <td>{{ $convert(cart.Product.price) }}</td>
            <td>
              <v-row class="justify-space-between">
                <v-btn x-small :disabled="cart.type === 'delete'" color='primary' @click="change(cart.id,cart.amount-1)">-</v-btn>
                <p >
                  {{cart.amount}}
                </p>
                <v-btn x-small color='success' @click="change(cart.id,cart.amount+1)">+</v-btn>
              </v-row>
              <v-btn color='success' v-show="cart.type !== 'delete'" small :disabled="!cart.flag" @click="update(cart.id,cart.amount)">Save</v-btn>
              <v-btn color='red' class="white--text" v-show="cart.type === 'delete'" x-small @click="deleteCart(cart.id)">Delete</v-btn>
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">Total</td>
            <td>{{ $convert(total) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center pt-4" v-show="total > 0">
      <v-btn color='success' @click="checkout">Checkout</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props:['dialog'],
  data() {
    return {
      total: 0,
      error: {

      }
    }
  },
  created() {
    this.activeCart()
    this.error = {}
  },
  methods: {
    checkout() {
      this.error = {}
      this.$http({
        method:"put",
        url:'cart',
        headers:{
          token: localStorage.token
        }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllProduct')
        this.$emit('close')
        this.$toast.fire(
          {
            title: 'Success',
            text:  'Checkout Success',
            icon: 'success',
          },
        );
        this.activeCart()
        // this.carts = data
      })
      .catch(err => {
        console.log(err.response)
        this.activeCart()
        let temp = Object.keys(err.response.data)
        for (let i = 0; i < temp.length; i++){
          this.error[temp[i]] = err.response.data[temp[i]]
        }
        this.$toast.fire(
          {
            title: 'Error',
            text:  'Some item out of stock',
            icon: 'error',
          },
        );
      })
    },
    change(id,amount) {
      let temp = [...this.carts]
      for (let i = 0; i < temp.length; i++){
        if(temp[i].id === id){
          if(amount > 0){
            temp[i].amount = amount
            temp[i].flag = true
            temp[i].type = ''
          }else{
            temp[i].amount = amount
            temp[i].type = 'delete'
          }
          break;
        }
      }
      this.$store.dispatch('changeCart',temp)
    },
    update(id,amount){
      this.$http({
        method:"patch",
        url:`cart/${id}`,
        headers:{
          token: localStorage.token
        },
        data:{
          amount
        }
      })
      .then(({data}) => {
        this.activeCart()
        this.error = {}
      })
      .catch(err => {
        this.$toast.fire(
          {
            title: 'Error',
            text:  err.response.data,
            icon: 'error',
          },
        );
      })
    },
    deleteCart(id){
      this.$http({
        method:"delete",
        url:`cart/${id}`,
        headers:{
          token: localStorage.token
        },
      })
      .then(({data}) => {
        this.activeCart()
      })
      .catch(err => {
        this.$toast.fire(
          {
            title: 'Error',
            text:  err.response.data,
            icon: 'error',
          },
        );
      })
    },
    activeCart() {
      this.$store.dispatch('activeCart')
    }
  },
  computed: {
    carts() {
      return this.$store.state.carts
    }
  },
  watch: {
    dialog() {
      if(this.dialog){
        this.error = {}
        this.activeCart()
      }
    },
    carts() {
      this.total = 0
      for (let i = 0; i < this.carts.length; i++){
        this.total += this.carts[i].amount * this.carts[i].Product.price
      }
    }
  }
}
</script>

<style>

</style>