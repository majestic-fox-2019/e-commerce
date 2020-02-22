<template>
    <div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(product) in $store.state.products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td><img width="100" :src="product.image_url" alt="product"></td>
                    <td>{{ product.price.toLocaleString('id') }}</td>
                    <td>{{ product.stock }}</td>
                    <td>
                        <!-- <a href="" @click.prevent="" style="margin-right: 50px;"> <img src="../assets/rotate.png" width="25"> </a>
                        <a href="" @click.prevent="actDeleteProduct(product.id)"> <img src="../assets/cancel.png" width="25"> </a> -->
                        <button class="btn btn-info mr-3" @click.prevent="actEditProduct(product.id)">[ edit ]</button>
                        <button class="btn btn-danger" @click.prevent="actDeleteProduct(product.id)">[ del ]</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'list-product',
    created() {
        this.$store.dispatch('getProducts')
    },
    methods: {
        actDeleteProduct(id) {
            this.$store.dispatch('deleteProduct', id)
        },
        actEditProduct(id) {
            this.$store.dispatch('getProductOne', id)
            this.$store.commit('SET_PRODUCTPAGE', 'edit')
        }
    }
}
</script>

<style scoped>
table {
    margin-top: 80px;
}

</style>