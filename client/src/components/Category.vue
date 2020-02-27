<template>
    <div class="category">
        <h3>Category</h3>
        <div class="row-4">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a v-on:click.prevent="getAllProducts" class="nav-link text-white" id="v-pills-all-tab" data-toggle="pill" href="#v-pills-all" role="tab" aria-controls="v-pills-all" aria-selected="true">
                    All <span class="badge badge-danger text-wrap">/home</span>
                </a>
                <a v-on:click.prevent="getBreadCategory" class="nav-link text-white" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="false">
                    Bread
                </a>
                <a v-on:click.prevent="getCakeCategory" class="nav-link text-white" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                    Cake
                </a>
                <a v-on:click.prevent="getCroissantCategory" class="nav-link text-white" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                    Croissant
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'category',
    methods: {
        getAllProducts() {
            this.$store.dispatch('getProducts')
        },
        getBreadCategory() {
            this.$store.dispatch('getProducts', 'bread')
        },
        getCakeCategory() {
            this.$store.dispatch('getProducts', 'cake')
        },
        getCroissantCategory() {
            this.$store.dispatch('getProducts', 'croissant')
        }
    }
}
</script>

<style scoped>
h3 {
    color:yellow;
    margin-left: 5px;
}
.category {
    width: 300px;
    height: 250px;
    border-radius: 5px; 
    background-color:teal;

}
</style>