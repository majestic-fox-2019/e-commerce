<template>
    <div>
        <a href="" v-on:click.prevent="gotoAdmin">
            <img src="../assets/logo_tokokita.png">
        </a>
    </div>
</template>

<script>
export default {
    name: 'logo',
    methods: {
        gotoAdmin() {
            this.$router.push('/admin');
        }
    }
}
</script>

<style scoped>

</style>