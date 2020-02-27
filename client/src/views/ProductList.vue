<template>
  <div class="admin-list">
    <div class="vld-parent">
    <loading :active.sync="isLoading" 
    :can-cancel="true" 
    :loader="'bars'" :color="'#1161EE'"></loading>
    </div>
    <nav class="menu" tabindex="0">
      <div class="smartphone-menu-trigger"></div>
      <header class="avatar">
        <img src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png"/>
        <h2>{{getName()}}</h2>
      </header>
      <ul>
        <li tabindex="0" class="icon-dashboard" @click="showProducts"><span>Dashboard</span></li>
        <li tabindex="0" class="icon-customers" data-toggle="modal"
        data-target="#addProduct"><span>Add Product</span></li>
        <li tabindex="0" class="icon-users" @click="showUser"><span>Users</span></li>
        <li tabindex="0" class="icon-settings">
          <router-link :to="{name: 'Login'}"><span @click="logout">
            Logout</span></router-link></li>
      </ul>
    </nav>
    <main>
      <div class="table-product">
        <table class="table" v-if="allProducts">
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
      <td><img :src="`${cart.image_url}`" style="width: 15vw; height: 10vw"></td>
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

  <button v-if="allUsers" type="button" class="btn btn-primary"
  style="margin-bottom: 10px;"
  data-toggle="modal" data-target="#addUser"><i class="fas fa-plus"></i> Add User</button>
<table class="table" v-if="allUsers">
  <thead class="thead-light">
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user, idx) in users" :key="idx">
      <th scope="row">{{idx + 1}}</th>
      <td>{{user.name}}</td>
      <td>{{user.role}}</td>
      <td><button @click="deleteUser(user.id)" type="button" class="btn btn-primary">
        <i class="fas fa-trash"></i></button> |
        <button @click="setUserUpdate(user)" type="button" class="btn btn-primary"
        data-toggle="modal" data-target="#updateUser">
        <i class="fas fa-pen"></i></button></td>
    </tr>
  </tbody>
</table>
      </div>
    </main>

<!-- Modal Add Product-->
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
                  <input v-model="formAdd.name" type="text" maxlength="15"
                  class="form-control" id="name" required>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea v-model="formAdd.description"
                  class="form-control" id="description" req></textarea>
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input v-model="formAdd.price" type="number" class="form-control" id="price"
                  required>
                </div>
                <div class="form-group">
                  <label for="stock">Stock</label>
                  <input v-model="formAdd.stock" type="number" class="form-control" id="stock"
                  required>
                </div>
                <div class="form-group">
                  <label for="image_url">Image Url</label>
                  <input v-model="formAdd.image_url" type="text"
                  class="form-control" id="image_url" required>
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

  <!-- Modal Update Product -->
    <div class="modal fade" id="updateProduct"
    tabindex="-1" role="dialog" aria-labelledby="updateProduct" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateProduct">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="updateProduct">
            <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input required v-model="formUpdate.name" maxlength="15"
                  type="text" class="form-control"
                  id="name">
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea v-model="formUpdate.description" type="text"
                  class="form-control" id="description"></textarea>
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input required v-model="formUpdate.price" type="number" class="form-control"
                  id="price">
                </div>
                <div class="form-group">
                  <label for="stock">Stock</label>
                  <input required v-model="formUpdate.stock" type="number" class="form-control"
                  id="stock">
                </div>
                <div class="form-group">
                  <label for="image_url">Image Url</label>
                  <input required v-model="formUpdate.image_url" type="text"
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

    <!-- Modal Add User -->
    <div class="modal fade" id="addUser"
    tabindex="-1" role="dialog" aria-labelledby="addUser" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addUser">Add User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="addUser">
            <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input required v-model="formAddUser.name" maxlength="15"
                  type="text" class="form-control"
                  id="name">
                </div>
                <div class="form-group">
                  <label for="description">Email</label>
                  <input required v-model="formAddUser.email" type="text"
                  class="form-control" id="description">
                </div>
                <div class="form-group">
                  <label for="price">Password</label>
                  <input required v-model="formAddUser.password"
                  type="password" class="form-control" id="price">
                </div>
                <div class="form-group">
                  <label for="stock">Role</label>
                  <select class="form-control form-control-sm" v-model="formAddUser.role">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
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

    <!-- Modal Update User -->
    <div class="modal fade" id="updateUser"
    tabindex="-1" role="dialog" aria-labelledby="updateUser" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateUser">Edit User</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="updateUser">
            <div class="modal-body">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input required v-model="formUpdateUser.name" maxlength="15"
                  type="text" class="form-control"
                  id="name">
                </div>
                <div class="form-group">
                  <label for="stock">Role</label>
                  <select class="form-control form-control-sm" v-model="formUpdateUser.role">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
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
import Loading from 'vue-loading-overlay';

export default {
  name: 'Product',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      allProducts: true,
      allUsers: false,
      users: null,
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
      formAddUser: {
        name: null,
        email: null,
        password: null,
        role: null,
      },
      formUpdateUser: {
        name: null,
        role: null,
      },
      productId: null,
      userId: null,
    };
  },
  methods: {
    showUser() {
      this.isLoading = true;
      this.$axios.get('/users', { headers: { token: localStorage.token } })
        .then((user) => {
          this.isLoading = false;
          this.allProducts = false;
          this.allUsers = true;
          this.users = user.data;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    showProducts() {
      this.allProducts = true;
      this.allUsers = false;
    },
    addUser() {
      window.$('#addUser').modal('hide');
      this.isLoading = true;
      this.$axios.post('/register', {
        name: this.formAddUser.name,
        email: this.formAddUser.email,
        password: this.formAddUser.password,
        role: this.formAddUser.role,
      }, { headers: { token: localStorage.token } })
        .then((user) => {
          this.isLoading = false;
          this.formAddUser.name = '';
          this.formAddUser.email = '';
          this.formAddUser.password = '';
          this.formAddUser.role = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully added ${user.data.user.name}`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.showUser();
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    deleteUser(id) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.$axios.delete(`/users/${id}`, { headers: { token: localStorage.token } })
            .then((user) => {
              this.isLoading = false;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user.data}`,
                showConfirmButton: false,
                timer: 1700,
              });
              this.showUser();
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err);
            });
        }
      });
    },
    setUserUpdate(value) {
      this.formUpdateUser.name = value.name;
      this.formUpdateUser.role = value.role;
      this.userId = value.id;
      console.log(this.userId);
    },
    updateUser() {
      window.$('#updateUser').modal('hide');
      this.isLoading = true;
      this.$axios.put(`/users/${this.userId}`, {
        name: this.formUpdateUser.name,
        role: this.formUpdateUser.role,
      }, { headers: { token: localStorage.token } })
        .then(() => {
          this.isLoading = false;
          this.formUpdateUser.name = '';
          this.formUpdateUser.role = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully updated ${this.formUpdateUser.name}`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.showUser();
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$store.dispatch('checkLogin');
      this.$store.dispatch('checkAdmin');
    },
    listProducts() {
      return this.$store.getters.getListProducts;
    },
    addProduct() {
      window.$('#addProduct').modal('hide');
      this.isLoading = true;
      this.$axios.post('/products', {
        name: this.formAdd.name,
        description: this.formAdd.description,
        stock: this.formAdd.stock,
        price: this.formAdd.price,
        image_url: this.formAdd.image_url,
      }, { headers: { token: localStorage.token } })
        .then((result) => {
          this.isLoading = false;
          this.formAdd.name = '';
          this.formAdd.description = '';
          this.formAdd.stock = '';
          this.formAdd.price = '';
          this.formAdd.image_url = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully added ${result.data.name}`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.$store.dispatch('listProducts');
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response);
        });
    },
    deleteProduct(id) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        this.isLoading = true;
        if (result.value) {
          this.$axios.delete(`/products/${id}`, { headers: { token: localStorage.token } })
            .then((msg) => {
              this.isLoading = false;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${msg.data}`,
                showConfirmButton: false,
                timer: 1700,
              });
              this.$store.dispatch('listProducts');
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err);
            });
        }
      });
    },
    setDataUpdate(value) {
      this.formUpdate.name = value.name;
      this.formUpdate.description = value.description;
      this.formUpdate.stock = value.stock;
      this.formUpdate.price = this.convertRpNumber(value.price);
      this.formUpdate.image_url = value.image_url;
      this.productId = value.id;
    },
    updateProduct() {
      window.$('#updateProduct').modal('hide');
      this.isLoading = true;
      this.$axios.put(`/products/${this.productId}`, {
        name: this.formUpdate.name,
        description: this.formUpdate.description,
        stock: this.formUpdate.stock,
        price: this.formUpdate.price,
        image_url: this.formUpdate.image_url,
      }, { headers: { token: localStorage.token } })
        .then(() => {
          this.isLoading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Successfully updated ${this.formUpdate.name}`,
            showConfirmButton: false,
            timer: 1700,
          });
          this.$store.dispatch('listProducts');
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    convertRpNumber(value) {
      const arrRp = value.split('');
      arrRp.splice(0, 4);
      arrRp.reverse();
      for (let i = 0; i < arrRp.length; i += 1) {
        if (arrRp[i] === '.') {
          arrRp.splice(i, 1);
        }
      }
      const numberPrice = arrRp.reverse().join('');
      console.log(numberPrice);
      return numberPrice;
    },
    getName() {
      return this.$store.state.name;
    },
  },
  created() {
    this.$store.dispatch('checkLogin');
  },
};
</script>

<style scoped>
input {
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background: #ffea92;
  margin: 0;
  font-family: "Open Sans", Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #fff;
  padding-left: 240px;
}

main {
  position: relative;
  height: 100vh;
  margin-left: 250px;
}

.table-product {
  margin: 40px;
}

main .helper {
  background: rgba(0, 0, 0, 0.2);
  color: #ffea92;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 1.2em 2em;
  text-align: center;
  border-radius: 20px;
  font-size: 2em;
  font-weight: bold;
}
main .helper span {
  color: rgba(0, 0, 0, 0.2);
  font-size: 0.4em;
  display: block;
}
.menu {
  background: #5bc995;
  height: 100vh;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  outline: none;
}
.menu .avatar {
  background: rgba(0, 0, 0, 0.1);
  padding: 2em 0.5em;
  text-align: center;
}
.menu .avatar img {
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #ffea92;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}
.menu .avatar h2 {
  font-weight: normal;
  margin-bottom: 0;
}
.menu ul {
  list-style: none;
  padding: 0.5em 0;
  margin: 0;
}
.menu ul li {
  padding: 0.5em 1em 0.5em 3em;
  font-size: 0.95em;
  font-weight: regular;
  background-repeat: no-repeat;
  background-position: left 15px center;
  background-size: auto 20px;
  transition: all 0.15s linear;
  cursor: pointer;
}
.menu ul li.icon-dashboard {
  background-image: url("http://www.entypo.com/images//gauge.svg");
}
.menu ul li.icon-customers {
  background-image: url("http://www.entypo.com/images//briefcase.svg");
}
.menu ul li.icon-users {
  background-image: url("http://www.entypo.com/images//users.svg");
}
.menu ul li.icon-settings {
  background-image: url("http://www.entypo.com/images//tools.svg");
}
.menu ul li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.menu ul li:focus {
  outline: none;
}
@media screen and (max-width: 900px) and (min-width: 400px) {
  body {
    padding-left: 90px;
  }
  .menu {
    width: 90px;
  }
  .menu .avatar {
    padding: 0.5em;
    position: relative;
  }
  .menu .avatar img {
    width: 60px;
  }
  .menu .avatar h2 {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 100px;
    margin: 0;
    min-width: 200px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    transform: translate3d(-20px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu .avatar:hover h2 {
    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
  .menu ul li {
    height: 60px;
    background-position: center center;
    background-size: 30px auto;
    position: relative;
  }
  .menu ul li span {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    top: 50%;
    left: 80px;
    transform: translate3d(-15px, -50%, 0);
    transition: all 0.15s ease-in-out;
  }
  .menu ul li span:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: -5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid rgba(0, 0, 0, 0.5);
    transform: translateY(-50%);
  }
  .menu ul li:hover span {
    opacity: 1;
    transform: translate3d(0px, -50%, 0);
  }
}
@media screen and (max-width: 400px) {
  body {
    padding-left: 0;
  }
  .menu {
    width: 230px;
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
    transform: translate3d(-230px, 0, 0);
    transition: all 0.3s ease-in-out;
  }
  .menu .smartphone-menu-trigger {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 100%;
    background: #5bc995;
  }
  .menu .smartphone-menu-trigger:before,
  .menu .smartphone-menu-trigger:after {
    content: '';
    width: 50%;
    height: 2px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu .smartphone-menu-trigger:after {
    top: 55%;
    transform: translate3d(-50%, -50%, 0);
  }
  .menu ul li {
    padding: 1em 1em 1em 3em;
    font-size: 1.2em;
  }
  .menu:focus {
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6);
  }
  .menu:focus .smartphone-menu-trigger {
    pointer-events: none;
  }
}
</style>
