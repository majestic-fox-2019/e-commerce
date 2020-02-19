<template>
    <div>
        <div class ="judul" style="text-align:center">
            <h1>Product Table </h1>
        </div>
        <div class="button Add">
            <button type="button" class="btn btn-primary"
            data-toggle="modal" data-target="#addModal">ADD</button>
        </div>
        <div class="table">
            <div >
        </div>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">ImageUrl</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Detail</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
            <tbody v-for="(product, idx) in showData()" :key="idx" >
                <tr  >
                <th scope="row">{{idx+1}}</th>
                <td>{{product.name}}</td>
                <td>{{product.image_url}}</td>
                <td>{{product.price}}</td>
                <td>{{product.stock}}</td>
                <td>{{product.Category.name}}</td>
                <td><router-link class="nav-link"
                :to="{name:'detailProduct',params:{id:product.id}}">Detail</router-link></td>
                <td><i v-on:click ="deleteProduct(product.id)" class="far fa-trash-alt"
                style="cursor: pointer; width: 30px;" ></i>
                    </td>
                </tr>

            </tbody>
    </table>

        </div>
        <!-- Modal ADD -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Add Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="addProduct">
                        <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" v-model="form.name" class="form-control"
                        id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name">
                        </div>
                        <div class="form-group" >
                        <label for="exampleInputPassword1">Image Url</label>
                        <input type="text" v-model="form.image_url" class="form-control"
                         placeholder="Image Url">
                        </div>
                        <div class="form-group" >
                        <label for="exampleInputPassword1">Price</label>
                        <input type="text" v-model="form.price" class="form-control"
                         placeholder="Price">
                        </div>
                        <div class="form-group" >
                        <label for="exampleInputPassword1">Stock</label>
                        <input type="text" v-model="form.stock" class="form-control"
                         placeholder="Stock">
                        </div>
                         <div class="form-group">
                            <label for="exampleFormControlSelect1">Category</label>
                            <select v-model="form.CategoryId" class="form-control"
                            id="exampleFormControlSelect1">
                            <option value="1">Jasmine</option>
                            <option value="2">Oolong</option>
                            <option value="3">Black Tea</option>
                            <option value="4">Green Tea</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'tableProduct',
  data() {
    return {
      form: {
        name: null, image_url: null, price: null, stock: null, CategoryId: null,
      },
    };
  },
  created() {
    this.$store.dispatch('showData');
  },
  methods: {
    showData() {
      return this.$store.state.dataProducts;
    },
    addProduct() {
      this.$axios({
        method: 'post',
        url: '/products',
        headers: { token: localStorage.token },
        data: {
          name: this.form.name,
          image_url: this.form.image_url,
          price: this.form.price,
          stock: this.form.stock,
          CategoryId: this.form.CategoryId,
        },
      })
        .then(() => {
          window.$('#addModal').modal('hide');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.dispatch('showData');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$axios({
            method: 'delete',
            url: `/products/${id}`,
            headers: { token: localStorage.token },
          })
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success',
              );
              this.$store.dispatch('showData');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style>

</style>
