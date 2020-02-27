<template>
  <v-item-group>
  <v-row class="pt-5">
      <v-item  
      v-for="watch in watchs"
      :key="watch.id"
      class="mx-2 my-2">
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="d-flex align-center"
            dark
            height="200px"
          >
            <div>
              <v-img
                height="200px"
                :src="watch.image_url+'?'+`${Date.now()}`"
              ></v-img>
            </div>
            

              <div>
                <v-card height="200px" v-show="hover"  width='180px' style="padding:65px 0;">
                  <v-card-text class="text-center">
                    <v-btn class="text-center" color='orange' 
                      @click="addCart(watch.id)"
                    >
                      Add cart
                      <v-icon >mdi-cart-plus</v-icon>
                    </v-btn> 
                  </v-card-text>
                </v-card>
                <v-card height="200px" v-show="!hover"  width='180px' >
                  <h2 class="text-center">{{watch.name}}</h2>
                  <v-card-text>
                    <v-row class="justify-space-between">
                      <p>Category :</p>
                      <p>{{watch.Category.name}}</p>
                    </v-row>
                    <v-row class="justify-space-between">
                      <p>Price :</p>
                      <p>{{$convert(watch.price)}}</p>
                    </v-row>
                    <v-row class="justify-space-between">
                      <p>Stock :</p>
                      <p>{{watch.stock}}</p>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
          </v-card>
        </v-hover>
      </v-item>
  </v-row>
  </v-item-group>
</template>

<script>
export default {
  name:'list',
  props:['id'],
  created() {
    if(this.id){
      this.$store.dispatch('getProductCategory',{id:this.id})
    }else{
      this.loadProduct()
    }
  },
  methods: {
    loadProduct() {
      this.$store.dispatch('getAllProduct')
    },
    addCart(ProductId){
      this.$http({
        method:"post",
        url:'cart',
        headers:{
          token: localStorage.token
        },
        data:{
          ProductId
        }
      })
      .then(({data}) => {
        this.$store.dispatch('activeCart')
        this.$toast.fire(
          {
            title: 'Success',
            text:  `Add item ${data.name} to cart`,
            icon: 'success',
          },
        );
      })
      .catch(err => {
        if(err.response.status === 401){
          this.$emit('openLogin');
        }else{
          this.$toast.fire(
          {
            title: 'Error',
            text:  err.response.data,
            icon: 'error',
          },
        );
        }
      })
    }
  },
  computed: {
    watchs() {
      return this.$store.state.watchs
    }
  },
  watch:{
    id() {
      if(this.id){
        this.$store.dispatch('getProductCategory',{id:this.id})
      }else{
        this.loadProduct()
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>