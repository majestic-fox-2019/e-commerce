<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <button class="btn btn-white" @click.prevent="goLogin" v-if="$store.state.isLogin===false">LOG IN</button>
            <button class="btn btn-white" @click.prevent="goLogout" v-if="$store.state.isLogin===true">LOG OUT</button>
            <button class="btn btn-white" @click.prevent="goRegister">REGISTER</button>
        </div>
        <div class="card-body">
            <img src="../assets/cart.png">
            <div>
                <h5>Rp. 123.456.789</h5>
                <h6>10 items</h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-white">VIEW CART</button>
            <button class="btn btn-white">CHECK OUT</button>
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
            this.$store.commit('SET_LOGOUT')
        },
        goRegister() {
            this.$store.state.page = 'register';
            this.$router.push('/register')
        },

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