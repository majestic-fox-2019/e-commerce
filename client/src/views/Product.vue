<template>
    <div>
        <navbar></navbar>
        <listproduct v-if="$store.state.productpage==='list'"></listproduct>
        <forminput v-if="$store.state.productpage==='add'"></forminput>
        <formedit v-if="$store.state.productpage==='edit'"></formedit>
    </div>
</template>

<script>
import navbar from '../components/NavBar.vue'
import listproduct from '../components/ListProduct.vue'
import forminput from '../components/FormInput.vue'
import formedit from '../components/FormEdit.vue'

export default {
    name: 'product',
    components: {
        navbar,
        listproduct,
        forminput,
        formedit,

    },
    created() {
        this.$store.state.productpage = 'list'
    }
}
</script>

<style scoped>

</style>