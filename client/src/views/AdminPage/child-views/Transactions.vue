<template>
  <div class="mt-4" style="height : 20px;">
    <div v-for="(transaction,i) in transactions" :key=i class="card shadow mb-4" style="max-width: 100%;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img :src="transaction.Product.image_url" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body text-left ml-3">
                    <h1 class="card-title">{{transaction.Product.name}}</h1>
                    <h3 class="card-text"><small class="text-muted">Category : {{transaction.Product.category}} || Price : {{transaction.Product.price | toIdr}}</small></h3>
                    <h3 class="card-text"><small class="text-muted">Qty : {{transaction.qty}} </small></h3>
                    <h3 class="card-text"><small class="text-muted">Buyer : {{transaction.User.email}}</small></h3>
                    <h3 class="card-text"><small class="text-muted">{{transaction.updatedAt | toDate }} -- {{transaction.updatedAt | fromNow }}</small></h3>
                    <h2 class="card-text mt-3">Total Price : {{transaction.totalPrice | toIdr }}</h2>
                    <button @click="deleteTransaction(transaction.id)" class="btn btns text-white mt-2" style="background-color: #581E58;">Delete</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    name : 'ProductList',
    computed : {
        transactions(){
            return this.$store.state.transactions
        }
    },
    methods : {
        deleteTransaction(id){
            this.$store.dispatch('deleteTransaction', id)
        }
    },
    created(){
        this.$store.dispatch('getTransactions')
    },
    filters : {
        toIdr(price){
            return price.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })
        },        
        toDate(date){
            return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")
        },        
        fromNow(date){
            return moment(date).fromNow()
        }        
    }
}
</script>

<style>

</style>