<template>
<div class="mt-2">
    <h5>Shopping Cart :</h5>
    <table class="table table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody v-for="(cart, i) in $store.state.cart" :key="i">
            <tr>
            <th scope="row">{{ i+1 }}</th>
            <td>
                <img :src="cart.Product.image_url" width="50px">
            </td>
            <td>
                <p class="mb-0">{{ cart.Product.name }}</p>
                <p class="mb-2">{{ cart.Product.description }}</p>
            </td>
            <td>{{ cart.price.toLocaleString('id') }}</td>
            <td>
                <a href="" v-on:click.prevent="plusCartItemQty(cart.id, cart.quantity+1, cart.Product.stock)">
                    <img src="../assets/plus.png" width="25px" style="margin-right:10px;">
                </a>
                <a href="" v-on:click.prevent="minusCartItemQty(cart.id, cart.quantity-1, cart.Product.stock)">
                    <img src="../assets/minus.png" width="25px" style="margin-right:10px;">
                </a>
                {{ cart.quantity }}
            </td>
            <td>
                <a href="" v-on:click.prevent="gotoDeleteCartItem(cart.id)">
                    <img src="../assets/cart_delete.png" width="25px">
                </a>
            </td>
            </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: 'cart',
    created() {
        this.$store.dispatch('getCart')
    },
    methods: {
        gotoDeleteCartItem(id) {
            this.$store.dispatch('deleteCartItem', id)
        },
        plusCartItemQty(id, qty, stock) {
            if(qty > stock) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: `Quantity cannot greater than Stock ${stock}`,
                })
            } else {
                this.$store.dispatch('updateCartItemQty', {id, qty, stock})
            }

        },
        minusCartItemQty(id, qty, stock) {
            if(qty < 1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :',
                    text: `Quantity cannot lower than 1`,
                })
            } else {
                this.$store.dispatch('updateCartItemQty', {id, qty, stock})
            }
        }
    }
}
</script>

<style scoped>

</style>