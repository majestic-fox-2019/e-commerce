<template>
  <div>
    <table class="table table-striped table-bordered table-hover">
        <thead class="text-center">
        <tr>
          <th>No</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Image</th>
          <th>Status Product</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="data_product">
          <tr :key="i" v-for="(product, i) in data_product" class="text-center">
            <td>{{ i+1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.Category ? product.Category.category_name : '' }}</td>
            <td>{{ product.price }}</td>
            <th>{{ product.stock }}</th>
            <th><img v-if="product.image_url !== ''" class="img" :src="product.image_url" /><span v-else class="text-danger">N/A</span></th>
            <th :class="`${product.status_product == 'published' ? 'text-success' : 'text-danger'}`">{{ product.status_product }}</th>
            <td>
              <button @click.prevent="patchStatus(product.id)" :class="`btn text-light btn-sm ${product.status_product == 'published' ? 'btn-danger' : 'btn-success'}`">
                <i :class="`fa ${product.status_product == 'published' ? 'fa-ban' : 'fa-share'}`" aria-hidden="true"></i></button>&nbsp;
              <router-link :to="{ name: 'UpdateProduct', params : { product_id : product.id } }" class="btn btn-sm btn-info text-light"><i class="fa fa-pencil" aria-hidden="true"></i></router-link>&nbsp;
              <ButtonDelete :data_id="product.id" content="products"/>
            </td>
          </tr>
      </tbody>
      <!-- <tbody v-else>
        <tr>
            <td colspan="5" class="text-center p-2"><h5>{{ data_user.message }}</h5></td>
        </tr>
      </tbody> -->
    </table>  
  </div>
</template>

<script>
import ButtonDelete from '../components/Main/layouts/ButtonDelete';

export default {
  name : "Table",
  props : ["data_product"],
  components : {
    ButtonDelete
  },
  data(){
    return {
      pageSize : null
    }
  },
  methods : {
    patchStatus(id){
      this.$axios({
        headers : {
          token : localStorage.token
        },
        method : 'patch',
        url : `/products/admin/${id}`
      })
      .then(response => {
        this.$store.dispatch('getProduct')
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  thead{
    font-size: 14px;
  }
  tbody {
    font-size: 12px;
  }
  .img { 
    width: 40px;
    height: 40px;
  }
</style>