<template>
  <div class="container justify-content-center text-center mt-5">
  
    <section class="panel panel-default">
    <div class="panel-heading"> 
    <h3 class="panel-title">Panel heading</h3> 
    </div> 
    <div class="panel-body">
    
    <form action="designer-finish.html" class="form-horizontal" role="form">

    <div class="form-group">
        <label for="name" class="col-sm-3 control-label">Product Name</label>
        <div class="col-sm-6 mx-auto" >
                <input v-model="name" type="text" class="form-control">
        </div>
    </div> <!-- form-group // -->
    <div class="form-group">
        <label class="col-sm-3 control-label">Details</label>
        <div class="col-sm-6 mx-auto"> 
            <label class="control-label small" for="date_start">Price </label>
            <input v-model="price" type="text" class="form-control" name="date_start" id="date_start" >
        </div>
        <div class="col-sm-6 mx-auto">   
            <label class="control-label small" for="date_finish">Stock</label>
            <input v-model="stock" type="number" class="form-control" name="date_finish" id="date_finish" >
        </div>
    </div> <!-- form-group // -->
    <div class="form-group">
        <label for="name" class="col-sm-3 control-label">Image</label>
        <div class="col-sm-3 mx-auto">
            <label class="control-label small" for="file_img">Choose/drop your file (jpg/png):</label> <input @change="dropImage" type="file" name="file_img">
        </div>
    </div> <!-- form-group // -->
    <div class="form-group">
        <label for="tech" class="col-sm-3 control-label">Category</label>
        <div class="col-sm-6 mx-auto">
            <select v-model="category" class="form-control">
                <option value="">Pick a category..</option>
                <option value="tumbler">Tumbler</option>
                <option value="plastic-cup">Plastic Cup</option>
            </select>
        </div>
    </div> <!-- form-group // -->
    <hr>
    <div class="form-group">
        <div class="col-sm-offset-3 col-sm-9 mx-auto">
            <button v-if="!isEditing" @click="submitProduct" type="button" class="btn text-white m-2" style="background-color : #581E58">Submit</button>
            <button v-if="isEditing" @click="cancelEditProduct" type="button" class="btn text-white m-2" style="background-color : #581E58">Cancel</button>
            <button v-if="isEditing" @click="editProduct" type="button" class="btn text-white m-2" style="background-color : #581E58">Edit</button>
        </div>
    </div> <!-- form-group // -->
    </form>
    
    </div><!-- panel-body // -->
    </section><!-- panel// -->

    
    </div> <!-- container// -->
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'

export default {
    name : 'NewProduct',
    data(){
        return {
            name : this.$store.state.product.name,
            price : this.$store.state.product.price,
            stock : this.$store.state.product.stock,
            category : this.$store.state.product.category,
            imgUrl : this.$store.state.product.image_url
        }
    },
    computed : {
        isEditing(){
            return this.$store.state.isEditing
        }
    },
    methods : {
        dropImage(){
            console.log('masuk drop image')
            this.imgUrl = event.target.files[0]
        },
        submitProduct(){
            if(!this.name || !this.price || !this.stock || !this.category || !this.imgUrl){
                swal.fire('Please fill all the forms properly')
                return
            }

            console.log('masuk submit product')
            let formData = new FormData
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('stock', this.stock)
            formData.append('category', this.category)
            formData.append('file', this.imgUrl)
            axios({
                url : 'http://localhost:3000/product/',
                method : 'post',
                headers : {
                token : localStorage.token
                },
                data : formData
            })
            .then(({data})=>{
                console.log("berhasil add product")
                console.log(data)
                swal.fire('Sold!','success')
                this.$router.push('/admin')
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        editProduct(){
            if(!this.name || !this.price || !this.stock || !this.category || !this.imgUrl){
                swal.fire('Please fill all the forms properly')
                return
            }

            console.log('masuk update product')
            let formData = new FormData
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('stock', this.stock)
            formData.append('category', this.category)
            formData.append('file', this.imgUrl)
            axios({
                url : 'http://localhost:3000/product/7',
                method : 'PUT',
                headers : {
                    token : localStorage.token
                },
                data : formData
            })
            .then(({data})=>{
                console.log("berhasil add product")
                console.log(data)
                swal.fire('Sold!','success')
                this.$router.push('/admin')
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        cancelEditProduct(){
            console.log('masuk cancel edit')
            this.$store.state.isEditing = false,
            this.$store.commit('EMPTY_PRODUCT')
            this.$router.push('/admin')

        }
    }
}
</script>

<style>

</style>