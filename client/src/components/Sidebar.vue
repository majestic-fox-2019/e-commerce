<template>
    <b-nav vertical >
        <b-nav-item ><router-link to="/products" >product</router-link></b-nav-item>
        <b-nav-item><router-link to="/create-product">create product</router-link></b-nav-item>
        <b-nav-item><router-link to="/register">add admin</router-link></b-nav-item>
        <b-nav-item><router-link to="/cart">cart</router-link></b-nav-item>
    </b-nav>
</template>

<script>
import { config } from "../config"
export default {
    data(){
        return {
            categories: null
        }
    },
}
</script>

<style>

</style>