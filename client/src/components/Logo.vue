<template>
    <div>
        <a href="" v-on:click.prevent="gotoHome">
            <img src="../assets/logo_tokokita.png">
        </a>
    </div>
</template>

<script>
export default {
    name: 'logo',
    methods: {
        gotoHome() {
            if(this.$router.app._route.path != '/') {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>

</style>