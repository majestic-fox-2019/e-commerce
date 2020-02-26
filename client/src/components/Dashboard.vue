<template>
  <div id="body-dashboard">
    <nav id="navbar">
      <div class="boxFlex-pojok">
        <div id="brand">
          Dashboard
          <span>
            Pocket
            <i class="fab fa-shirtsinbulk"></i>
          </span>
        </div>
        <div id="logout" @click="logoutAdmin">
          logout
          <i class="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </nav>
    <div class="body-content">
      <div id="sidebar">
        <div class="menu categoryBtn" id="welcomeAdmin">
          <span>
            <h5>
              <!-- Welcome -->
              <router-link to="/dashboard/all">Welcome</router-link>
            </h5>
          </span>
        </div>
        <div class="menu categoryBtn">
          <router-link to="/dashboard/celana">Celana</router-link>
        </div>
        <div class="menu categoryBtn">
          <span>
            <router-link to="/dashboard/baju">Baju</router-link>
          </span>
        </div>
        <div class="menu categoryBtn">
          <span>
            <router-link to="/dashboard/jaket">Jaket</router-link>
          </span>
        </div>
        <div class="menu categoryBtn">
          <span>
            <router-link to="/dashboard/sepatu">Sepatu</router-link>
          </span>
        </div>
      </div>

      <div id="contentDasboard">
        <div id="btnLargeAdd">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block"
            data-toggle="modal"
            data-target="#addProduct"
          >
            <span>
              <i class="fas fa-plus"></i>
            </span> Add New Item
          </button>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="addProduct"
          tabindex="-1"
          role="dialog"
          aria-labelledby="addProductLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" style="color:black;">Add Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" id="addModal">
                <form>
                  <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        v-model="formAdd.name"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="image" class="col-sm-2 col-form-label">Image Url</label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        id="iamge_url"
                        v-model="formAdd.image_url"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        min="0"
                        v-model="formAdd.price"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Stock</label>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        class="form-control"
                        id="stock"
                        min="0"
                        v-model="formAdd.stock"
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Category</label>
                    <select class="form-control" id="category" v-model="formAdd.CategoryId">
                      <option value="1">Celana</option>
                      <option value="2">Jaket</option>
                      <option value="3">Baju</option>
                      <option value="4">Sepatu</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="addProduct">Sumbit</button>
              </div>
            </div>
          </div>
        </div>
        <div id="boardCard">
          <Products v-for="product in products" :key="product.id" :barang="product" />
          {{products}}
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Products from "./category/Product.vue";
// const server = `http://localhost:3000`;
// const server = `https://mysterious-plains-04294.herokuapp.com`;

export default {
  components: {
    Products: Products
  },
  data: function() {
    return {
      formAdd: {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      },
      category: "all"
    };
  },
  created() {
    this.$store.dispatch("getAllItem");
  },
  computed: {
    products() {
      let kategoriId = null;
      if (this.category == "celana") {
        kategoriId = 1;
      } else if (this.category == "jaket") {
        kategoriId = 2;
      } else if (this.category == "baju") {
        kategoriId = 3;
      } else if (this.category == "sepatu") {
        kategoriId = 4;
      }

      let arr = this.$store.state.items;
      if (this.category == "all") {
        // console.log("masuk all pak");
        return arr;
      } else {
        // console.log("masuk pak");
        return arr.filter(el => el.CategoryId == kategoriId);
        // let kategori = arr.filter(el => {
        //   if (el.CategoryId == kategoriId) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // });
        // return kategori;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.category = to.params.category;
      console.log(this.category, "<<<<<<<<watch dashboard");
    }
  },

  methods: {
    addProduct() {
      let dataAdd = {
        name: this.formAdd.name,
        image_url: this.formAdd.image_url,
        price: this.formAdd.price,
        stock: this.formAdd.stock,
        CategoryId: this.formAdd.CategoryId
      };

      this.$store.dispatch("addBarang", dataAdd);
      window.$("#addProduct").modal("hide");
      this.formAdd.name = null;
      this.formAdd.image_url = null;
      this.formAdd.price = null;
      this.formAdd.stock = null;
      this.formAdd.CategoryId = null;
    },
    logoutAdmin() {
      localStorage.clear();
      this.$store.dispatch("cekAdmin");
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style scoped>
.btn {
  background-color: #56ccf2;
  border-color: #56ccf2;
}
#navbar {
  /* border: 1px solid white; */
  border-top: 5px solid #56ccf2;
  padding: 1px 10em;
}
.boxFlex-pojok {
  display: flex;
  height: 4em;
  justify-content: space-between;
  color: black;
  align-items: center;
}
#brand {
  letter-spacing: 1px;
}
#brand span {
  letter-spacing: 2px;
  font-size: 1.5em;
}
.body-content {
  height: 100vh;
  /* border: 1px solid white; */
  padding: 1em;
  display: flex;
}
#logout {
  cursor: pointer;
}

#sidebar,
#contentDasboard {
  padding: 1em;
  color: white;
  /* height: 90vh; */
  margin: 1em;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 44px -9px rgba(0, 0, 0, 0.208);
  -moz-box-shadow: 0px 0px 44px -9px rgba(0, 0, 0, 0.208);
  box-shadow: 0px 0px 44px -9px rgba(0, 0, 0, 0.208);
}
#sidebar {
  width: 20em;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  align-content: center;
}
.menu {
  display: flex;
  margin: 1em;
  align-items: center;
  color: white;
}
#contentDasboard {
  width: 80%;
  /* border: 2px solid green; */
  display: flex;
  flex-direction: column;
}
#welcomeAdmin {
  height: 5em;
  font-weight: 100;
  letter-spacing: 5px;
  border-bottom: 2px solid white;
}
#welcomeAdmin:hover {
  border-bottom: none;
}
#welcomeAdmin a {
  color: white;
  text-decoration: none;
}
#btnLargeAdd {
  margin-bottom: 1em;
  /* position: relative; */
}
#boardCard {
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  max-height: 90vh;
  justify-content: space-evenly;
  /* border: 1px solid red; */
}
#addModal {
  color: black;
}
.categoryBtn a {
  text-decoration: none;
  color: white;
}
</style>
