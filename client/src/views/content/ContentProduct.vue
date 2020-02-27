<template>
  <div>
      <Title msg="Content Product"/>
      <div class="container col-md-12 d-flex justify-content-between m-2">
        <div class="col-md-3">
          <router-link :to="{ name : 'AddProduct' }" type="button" class="btn btn-primary btn-sm mr-2">
            <i class="fa fa-plus" aria-hidden="true"></i> Add Product
          </router-link>
        </div>
        <div class="col-md-3">
          <form @submit.prevent="getProduct">
            <div class="input-group mb-3">
              <input type="text" class="form-control form-control-sm" v-model="form.name" placeholder="Search by product name">
              <div class="input-group-append">
                <button class="btn btn-sm btn-success" type="submit" id="button-addon2">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
        <div class="container">
        <Table :data_product="listProduct"/>
      </div>
  </div>
</template>
<script>
import Title from '../../components/Title'
import Table from '../../components/TableProducts'

export default {
  name : 'ContentProduct',
  components : {
    Title,
    Table
  },
  data(){
    return {
      form : {
        name : ''
      }
    }
  },
  created (){
    this.getProduct()
  },
  computed : {
    listProduct(){
      return this.$store.state.listProducts
    }
  },
  methods : {
    getProduct(){
      this.$store.dispatch('getProduct', this.form.name)
    },
  }
}
</script>

<style>

</style>