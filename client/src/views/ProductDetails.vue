<template>
  <b-container class="mt-5 p-5" id="detailMain">
    <div v-if="$store.state.loading.productDetails">
      loading
    </div>
    <div v-if="!$store.state.loading.productDetails">
    <h3 style="text-align:left;">{{$store.state.displayDetail.name}}</h3>
    <p style="text-align:left;">{{$store.state.displayDetail.category}}</p>
    <b-row class="prodPic-priceStock">
        <b-col cols="5" class="test" id="prodPic">
            <img class="imgOfProd" :src="$store.state.displayDetail.img_url">
        </b-col>
        <b-col class="test" id="priceStock">
            <div class="mb-4">
                <h1>{{$store.state.displayDetail.price}}</h1>
            </div>
            <div class="my-3" id="qty" v-if="$store.state.userInfo && $store.state.displayDetail.stock">
                <a href="" style="margin:0;padding:0;font-size:1.5em;" class="mx-3" @click.prevent="subQty"><i class="fas fa-minus-circle"></i></a>
                <p style="margin:0;padding:0;border-bottom:1px solid black;font-size:1.5em;">{{qty}}</p>
                <a href="" style="margin:0;padding:0;font-size:1.5em;" class="mx-3" @click.prevent="addQty"><i class="fas fa-plus-circle"></i></a>
            </div>
            <div class="mt-2">
                <h5 style="color:#5a5a5aa2;">Available Stock: {{$store.state.displayDetail.stock}}</h5>
            </div>
            <div class="mt-4" v-if="$store.state.userInfo">
                <b-button v-if="$store.state.displayDetail.stock > 0" @click.prevent="addToCart($store.state.displayDetail.id)">Add to Cart</b-button>
                <b-button variant="danger" disabled v-if="$store.state.displayDetail.stock < 1">Out of Stock</b-button>
            </div>
        </b-col>
    </b-row>
    <b-row class="mt-5">
        <div class="descriptionHeader py-3">
          <h3>Description</h3>
        </div>
        <div class="py-3" style="border-bottom:1px solid #252525;text-align:left;width:100%;">
            <p>{{$store.state.displayDetail.desc}}</p>
        </div>
    </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'ProductDetails',
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', {
        ProductId: id,
        qty: this.qty
      })
    },
    addQty () {
      if (this.qty >= this.$store.state.displayDetail.stock) {
        this.qty = this.$store.state.displayDetail.stock
      } else {
        this.qty++
      }
    },
    subQty () {
      if (this.qty <= 1) {
        this.qty = 1
      } else {
        this.qty--
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProductDetails', this.$route.params.id)
  }
}
</script>

<style scoped>
.descriptionHeader {
    border-top: 1px solid #252525;
    border-bottom: 1px solid #252525;
    width: 100%;
    text-align: left;
}
#qty {
    display: flex;
    justify-content: start;
}
#priceStock {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}
.imgOfProd {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
.prodPic-priceStock {
    height: 40%;
    width: 100%;
}
#detailMain {
    height: 88vh;
    width: 100%;
    overflow: scroll;
}
.test {
    height: 100%;
}
</style>>
