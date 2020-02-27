<template>
<div>
    <navbar></navbar>
    <div class="table-transaction">
        <h5>History of Transaction :</h5>
        <table class="table table-hover">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody v-for="(transaction, i) in $store.state.transaction" :key="i">
                <tr>
                <th scope="row">{{ i+1 }}</th>
                <td>{{ new Date(transaction.updatedAt).toLocaleString('id')}}</td>
                <td>{{ transaction.Product.name }}</td>
                <td>{{ transaction.quantity }}</td>
                <td>{{ transaction.price.toLocaleString('id') }}</td>
                <td>{{ (transaction.quantity*transaction.price).toLocaleString('id') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import navbar from '../components/NavBar.vue'

export default {
    name: 'transaction',
    components: {
        navbar
    },
    created() {
        this.$store.dispatch('getTransaction')
    },
}
</script>

<style scoped>
.table-transaction {
    margin-top: 80px;
}
</style>