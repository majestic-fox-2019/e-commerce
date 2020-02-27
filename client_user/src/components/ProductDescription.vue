<template>
  <div v-if="product" class="ml-4">
    {{ product.id }}
    <h5><small class="badge badge-primary">{{ product.Category.category_name }}</small> {{ product.name }}</h5>
    <h5 class="text-danger">Rp. {{ product.price }}</h5>
    <p :class="product.stock > 0 ? 'text-primary' : 'text-danger'"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ product.stock > 0 ? product.stock + ' item' : 'out of stock' }}</p>
    <form v-if="product.stock > 0" @submit.prevent="addCart(product.id)" class="col-md-2">
      <label class="text-muted">Quantity</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button @click.prevent="changeQuantity('minus', product.stock)" class="input-group-text">-</button>
        </div>
        <input type="text" class="form-control" v-model="form.qty">
        <div class="input-group-append">
          <button @click.prevent="changeQuantity('plus', product.stock)" class="input-group-text">+</button>
        </div>
      </div>
      <button type="submit" class="btn btn-danger btn-sm"><i class="fa fa-cart-plus mb-1" aria-hidden="true"></i> Add Cart</button>&nbsp;
    </form>
    <br>
    <p>Description</p>
    <p class="text-secondary">{{ product.description }}</p>
  </div>  
</template>

<script>
export default {
  name: 'ProductDescription',
  props: ['product'],
  data(){
    return {
      form: {
        qty: 1
      },
    }
  },
  methods : {
    changeQuantity(condition, stock){
        if(condition == 'plus' && this.form.qty < stock){
          this.form.qty++
        }else if(condition == 'minus' && this.form.qty > 1){
          this.form.qty--
        }
    },
    addCart(product_id){
      const value = {
        qty: this.form.qty,
      }
      this.$axios({
        headers: {
          token: localStorage.token
        },
        method: 'post',
        url: `/transaction/${localStorage.userId}/${product_id}`,
        data: value
      })
      .then(response => {
        this.$toast.fire({
          icon: 'success',
          title: response.data.message
        })
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: err.response.data,
          showCloseButton: true,
        })
        this.$router.push({ name: 'Auth' })
      })
    }
  }
}
</script>

<style scoped>

</style>