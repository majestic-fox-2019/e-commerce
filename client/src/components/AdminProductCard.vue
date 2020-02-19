<template>
  <div style="height:100%;width:100%;" class="ProductInfo px-2">
      <div class="productImg">
          <img class="IMG" :src="productDetails.img_url" alt="productPic">
      </div>
      <div class="ProductName-Desc py-2 px-2">
          <h3 style="font-weight:bolder;text-align:left;">{{productDetails.name}}</h3>
          <h5 style="font-weight:bolder;text-align:left;">Store: {{productDetails.User.shopName}}</h5>
          <h5 v-if="productDetails.official" style="font-weight:bolder;text-align:left;">Owner: V2 </h5>
          <h5 v-if="!productDetails.official" style="font-weight:bolder;text-align:left;">Owner: {{productDetails.User.email}} </h5>
          <h5 style="font-weight:bolder;text-align:left;">Category: {{productDetails.category}}</h5>
      </div>
      <div class="ProductDynamicInfo px-2">
          <h5 style="font-weight:bolder;text-align:left;">Description: </h5>
          <p style="text-align:left;">{{productDetails.desc}}</p>

      </div>
      <div class="ProductNumbers py-2 px-2">
          <h5 style="font-weight:bolder;text-align:left;">Stock: {{productDetails.stock}}</h5>
          <h5 style="font-weight:bolder;text-align:left;">Price: {{productDetails.price}}</h5>
      </div>
      <div class="actions py-2 px-2">
          <b-button @click="toggleEdit(productDetails)" variant="warning" class="actionButton"><i class="fas fa-edit"></i></b-button>
          <b-button @click="deleteProduct(productDetails.id)" variant="danger" class="actionButton"><i class="fas fa-trash-alt"></i></b-button>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'AdminProductCard',
  data () {
    return {
      modal: ''
    }
  },
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes I'm sure"
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProduct', id)
        }
      })
    },
    toggleEdit (productData) {
      this.$emit('editData', productData)
    }
  },
  props: {
    productDetails: {
      type: Object
    }
  }
}
</script>

<style scoped>
.actionButton {
    width: 2.5vw;
    height: 5vh;
}
.actions {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.ProductNumbers {
    height: 100%;
    width: 20%;
    border-right: 1px solid black
}
.ProductDynamicInfo {
    height: 100%;
    width: 25%;
    border-right: 1px solid black
}
.ProductInfo {
    display: flex;
    border-radius: 5px;
    z-index: 1;
}
.productImg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 25%;
    border-right: 1px solid black
}
.ProductName-Desc {
    height: 100%;
    width: 25%;
    border-right: 1px solid black
}
.ProductInfo:hover {
    box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
    transition: 0.5s;
    z-index: 2;
}
.IMG {
    height: 95%;
    width: 100%;
    object-fit: contain;
    z-index: -1;
}
</style>
