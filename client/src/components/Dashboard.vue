<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <button class="btn btn-white" @click.prevent="goLogin" v-if="$store.state.isLogin===false">LOG IN</button>
            <button class="btn btn-white" @click.prevent="goLogout" v-if="$store.state.isLogin===true">LOG OUT</button>
            <button class="btn btn-white" @click.prevent="goRegister" v-if="$store.state.isLogin===false">REGISTER</button>
            <p class="mb-0 text-primary pt-2" v-if="$store.state.isLogin===true">{{ $store.state.email }}</p>
        </div>
        <div class="card-body">
            <img src="../assets/cart.png">
            <div>
                <h5>Rp {{ $store.state.totalRp.toLocaleString('id') }}</h5>
                <h6>{{ $store.state.totalItem }} items</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-white col-5" v-if="$store.state.isLogin===true" v-on:click.prevent="gotoCart">VIEW CART</button>
            <button class="btn btn-white col-5" v-if="$store.state.isLogin===true" v-on:click.prevent="gotoCheckout">CHECK OUT</button>
            <a href="" class="col-0" v-on:click.prevent="gotoAdmin" style="text-decoration:none;color:lightgray;">.</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    methods: {
        goLogin() {
            this.$store.state.page = 'login';
            this.$router.push('/login')
        },
        goLogout() {
            this.$store.dispatch('logout')
        },
        goRegister() {
            this.$store.state.page = 'register';
            this.$router.push('/register')
        },
        gotoAdmin() {
            this.$router.push('/admin')
        },
        gotoCart() {
            this.$router.push('/cart')
        },
        gotoCheckout() {
            this.$store.dispatch('checkoutCart')
        }
    },
    created() {
        if(localStorage.token) {
            this.$store.dispatch('getCart')
        } else {

        }
    }
}
</script>

<style scoped>
.card {
    width: 300px;
    height: 220px;
}
.card-header {
    padding: 0;
    border-bottom: 0px;
    background-color: white;
}
.card-footer {
    padding: 0;
    border-top: 0px;
    background-color: white;
}
.card-body {
    padding: 0;
    background-color:mediumseagreen;
}
img {
    width: 100px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
}
h5 {
    color: yellow;
    margin-left: 120px;
    margin-top: 20px;
}
h6 {
    margin-left: 120px;
    color: red;
}
button {
    width: 115px;
}
</style>