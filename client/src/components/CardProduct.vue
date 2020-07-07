<template>
<div class="row">
    <div class="card col-2 mt-2 mr-2" v-for="(product) in $store.state.products" :key="product.id">
    <img :src="product.image_url" class="card-img-top w-75 mt-2" alt="...">
    <div class="card-body p-0 pt-2 pb-2">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text mb-0 text-primary">{{ product.category }}</p>
        <p class="card-text mb-0 text-danger">stock: {{ product.stock }}</p>
        <p class="card-text mb-0 text-dark">{{ product.price.toLocaleString('id') }}</p>
    </div>
    <div class="footer mb-2 d-flex justify-content-between">
        <a class="btn btn-info">detail</a>
        <a href="" class="btn btn-warning" v-on:click.prevent="gotoCart(product)">buy</a>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'list-product',
    created() {
        this.$store.dispatch('getProducts')
    },
    methods: {
        gotoCart(id) {
            this.$store.dispatch('addToCart', id)
        }
    }
}
</script>

<style scoped>

</style>