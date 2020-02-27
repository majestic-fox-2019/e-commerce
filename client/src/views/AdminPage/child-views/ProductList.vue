<template>
  <div class="mt-4" style="height : 20px;">
    <div v-for="(product,i) in products" :key=i class="card shadow mb-4" style="max-width: 100%;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img :src="product.image_url" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body text-left ml-3">
                    <h1 class="card-title">{{product.name}}</h1>
                    <h2 class="card-text">{{product.price | toIdr }}</h2>
                    <h3 class="card-text"><small class="text-muted">Category : {{product.category}}</small></h3>
                    <h3 class="card-text"><small class="text-muted">Stock : {{product.stock}}</small></h3>
                    <button @click="showEditProduct(product.id)" class="btn btns mr-3 text-white" style="background-color: #581E58;">Edit</button>
                    <button @click="deleteProduct(product.id)" class="btn btns text-white" style="background-color: #581E58;">Delete</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name : 'ProductList',
    computed : {
        products(){
            return this.$store.state.products
        }
    },
    methods : {
        deleteProduct(id){
            this.$store.dispatch('deleteProduct', id)
        },
        showEditProduct(id){
            this.$store.dispatch('showEditProduct', id)
        }
    },
    created(){
        this.$store.dispatch('getProducts')
    },
    filters : {
        toIdr(price){
            return price.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })
        }        
    }
}
</script>

<style>
.btn{
    background-color: #581E58;
    color: white;
}

.btns{
    background-color: #581E58;
    color: white;
}

</style>