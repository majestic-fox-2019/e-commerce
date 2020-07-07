<template>
    <div class="form-input container">
        <form action="/upload-single" method="post" enctype="multipart/form-data">
            <h3>Edit existing Product</h3>
            <div :data="getOneProduct">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="id" v-model="id" readonly>
            </div>
            <div class="form-group">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="name">
            </div>
            <div class="form-group">
                <label for="inputImage">Image</label>
                <input type="file" name="file" class="form-control" id="inputImage" v-on:change="upload()">
            </div>
            <div class="form-group">
                <label for="inputDescription">Description</label>
                <textarea name="inputDescription" id="inputDescription" class="form-control" v-model="description" cols="30" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="inputPrice">Price</label>
                <input type="number" min="0" step="1" class="form-control" id="inputPrice" v-model="price">
            </div>
            <div class="form-group">
                <label for="inputStock">Stock</label>
                <input type="number" min="0" step="1" class="form-control" id="inputStock" v-model="stock">
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputCategory">Category</label>
                </div>
                <select class="custom-select" id="inputCategory" v-model="category">
                    <option selected>Choose...</option>
                    <option value="bread">Bread</option>
                    <option value="cake">Cake</option>
                    <option value="croissant">Croissant</option>
                </select>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div>
                    <button type="submit" class="btn btn-success mb-3" v-on:click.prevent="actSaveProduct">Save</button>
                </div>
                <div>
                    <button type="submit" class="btn btn-danger mr-2 mb-3" v-on:click.prevent="actCancel">Cancel</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'form-edit',
    data() {
        return {
            id: '',
            name: '',
            image_url: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
        }
    },
    computed: {
        getOneProduct() {
            if(this.$store.state.detailProduct != null){
                this.id = this.$store.state.detailProduct.id
                this.name = this.$store.state.detailProduct.name
                this.description = this.$store.state.detailProduct.description
                this.image_url = this.$store.state.detailProduct.image_url
                this.price = this.$store.state.detailProduct.price
                this.stock = this.$store.state.detailProduct.stock
                this.category = this.$store.state.detailProduct.category
            }
            return this.$store.state.detailProduct
        }
    },
    methods: {
        upload() {
            this.image_url = event.target.files[0];
        },
        actCancel() {
            this.$store.commit('SET_PRODUCTPAGE', 'list')
        },
        actSaveProduct() {
            let obj = {
                id: this.id,
                name :this.name,
                image_url : this.image_url,
                description : this.description,
                price: this.price,
                stock: this.stock,
                category: this.category
            }
            this.$store.dispatch('saveEditProduct', obj)
            console.log('obj', obj)
        },
    }
}
</script>

<style scoped>
.form-input {
    margin-top: 100px;
    width: 30%;
}
</style>