<template>
  <div class="admin-list">
    <button class="btn-btn draw-border" data-toggle="modal" data-target="#addProduct">
      <i class="fas fa-plus"></i> Add Product</button>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">No</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, idx) in listProducts()" :key="idx">
          <th scope="row">{{idx + 1}}</th>
          <td><img :src="`${cart.image_url}`" style="width: 20vw; height: 15vw"></td>
          <td>{{cart.name}}</td>
          <td>{{cart.price}}</td>
          <td>{{cart.stock}}</td>
          <td><button @click="deleteProduct(cart.id)" type="button" class="btn btn-primary">
            <i class="fas fa-trash"></i></button>
            <hr>
            <button @click="setDataUpdate(cart)" type="button" class="btn btn-primary"
            data-toggle="modal" data-target="#updateProduct">
            <i class="fas fa-pen"></i></button></td>
        </tr>
      </tbody>
    </table>

<!-- Modal Add -->
    <div class="modal fade" id="addProduct"
    tabindex="-1" role="dialog" aria-labelledby="addProduct" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addProduct">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addProduct">
            <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input v-model="formAdd.name" type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input v-model="formAdd.description" type="text"
                  class="form-control" id="description">
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input v-model="formAdd.price" type="number" class="form-control" id="price">
                </div>
                <div class="form-group">
                  <label for="stock">Stock</label>
                  <input v-model="formAdd.stock" type="number" class="form-control" id="stock">
                </div>
                <div class="form-group">
                  <label for="image_url">Image Url</label>
                  <input v-model="formAdd.image_url" type="text"
                  class="form-control" id="image_url">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  <!-- Modal Update -->
    <div class="modal fade" id="updateProduct"
    tabindex="-1" role="dialog" aria-labelledby="updateProduct" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateProduct">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="updateProduct">
            <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input v-model="formUpdate.name" type="text" class="form-control" id="name">
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input v-model="formUpdate.description" type="text"
                  class="form-control" id="description">
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input v-model="formUpdate.price" type="number" class="form-control" id="price">
                </div>
                <div class="form-group">
                  <label for="stock">Stock</label>
                  <input v-model="formUpdate.stock" type="number" class="form-control" id="stock">
                </div>
                <div class="form-group">
                  <label for="image_url">Image Url</label>
                  <input v-model="formUpdate.image_url" type="text"
                  class="form-control" id="image_url">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Product',
  data() {
    return {
      formAdd: {
        name: null,
        description: null,
        stock: null,
        price: null,
        image_url: null,
      },
      formUpdate: {
        name: null,
        description: null,
        stock: null,
        price: null,
        image_url: null,
      },
      productId: null,
    };
  },
  methods: {
    listProducts() {
      return this.$store.getters.getListProducts;
    },
    addProduct() {
      this.$axios.post('/products', {
        name: this.formAdd.name,
        description: this.formAdd.description,
        stock: this.formAdd.stock,
        price: this.formAdd.price,
        image_url: this.formAdd.image_url,
      }, { headers: { token: localStorage.token } })
        .then((result) => {
          window.$('#addProduct').modal('hide');
          this.formAdd.name = '';
          this.formAdd.description = '';
          this.formAdd.stock = '';
          this.formAdd.price = '';
          this.formAdd.image_url = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully added ${result.data.name} to Product List`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.$store.dispatch('listProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(id) {
      this.$axios.delete(`/products/${id}`, { headers: { token: localStorage.token } })
        .then((result) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully delete ${result.data} to Product List`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.$store.dispatch('listProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setDataUpdate(value) {
      this.formUpdate.name = value.name;
      this.formUpdate.description = value.description;
      this.formUpdate.stock = value.stock;
      this.formUpdate.price = value.price;
      this.formUpdate.image_url = value.image_url;
      this.productId = value.id;
    },
    updateProduct() {
      this.$axios.put(`/products/${this.productId}`, {
        name: this.formUpdate.name,
        description: this.formUpdate.description,
        stock: this.formUpdate.stock,
        price: this.formUpdate.price,
        image_url: this.formUpdate.image_url,
      }, { headers: { token: localStorage.token } })
        .then(() => {
          window.$('#updateProduct').modal('hide');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully updated ${this.formUpdate.name} on Product List`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.$store.dispatch('listProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.draw-border {
  box-shadow: inset 0 0 0 4px #007BFF;
  color: #007BFF;
  -webkit-transition: color 0.25s 0.0833333333s;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}
.draw-border::before, .draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 0;
  right: 0;
}
.draw-border::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}
.draw-border::after {
  border-top-width: 4px;
  border-right-width: 4px;
}
.draw-border:hover {
  color: #343A40;
}
.draw-border:hover::before, .draw-border:hover::after {
  border-color: #343A40;
  -webkit-transition: border-color 0s, width 0.25s, height 0.25s;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}
.draw-border:hover::before {
  -webkit-transition-delay: 0s, 0s, 0.25s;
          transition-delay: 0s, 0s, 0.25s;
}
.draw-border:hover::after {
  -webkit-transition-delay: 0s, 0.25s, 0s;
          transition-delay: 0s, 0.25s, 0s;
}

.btn-btn {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #007BFF;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  padding: 1em 2em;
  letter-spacing: 0.05rem;
  font-size: 20px;
}
.btn:focus {
  outline: 2px dotted #007BFF;
}

body {
  background: #1f1a25;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  min-height: 100vh;
}
</style>
