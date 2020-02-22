<template>
  <div>
    <div class="container">
      <div class="text-center">
        <button class="btn-icon mt-2" @click="toggleForm">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div
      class="container content-container mt-2 border border-dark rounded ml-4"
      v-show="formStatus"
    >
      <div class="content-form">
        <form
          class="mt-3"
          enctype="multipart/form-data"
          @submit.prevent="formType == 'add' ? submitProduct() : submitEdit()"
        >
          <div class="form-group">
            <label>Product Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Name..."
              v-model="productData.name"
            />
          </div>
          <div class="form-group">
            <label>Product Image</label>
            <input
              class="border"
              type="file"
              id="myfile"
              name="myfile"
              style="display:block"
              @change="getImage($event)"
            />
          </div>
          <div class="d-flex">
            <div class="form-group">
              <label>Product Price</label>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Price..."
                min="0"
                v-model="productData.price"
              />
            </div>
            <div class="form-group ml-2">
              <label>Product Stock</label>
              <input
                type="number"
                class="form-control"
                id="formGroupExampleInput2"
                placeholder="Stock..."
                min="0"
                v-model="productData.stock"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" required v-model="productData.CategoryId">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >{{ category.name, }}</option>
            </select>
          </div>
          <div class="text-center">
            <button class="btn btn-primary mb-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Swal } from "@/api/swal";
import axios from "axios";

export default {
  data() {
    return {
      formType: null,
      formStatus: false,
      productData: {
        id: null,
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      }
    };
  },
  props: ["id"],
  watch: {
    id() {
      if (this.id) {
        this.formStatus = true;
        this.getEditData(this.id);
      }
    }
  },
  methods: {
    getImage(event) {
      const file = event.target.files[0];
      const url = `https://storage.googleapis.com/upload/storage/v1/b/storage-example/o?name=hafizul/${file.name}.png&uploadType=media&key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`;
      axios
        .post(url, file, {
          headers: {
            "Content-Type": "image/png"
          }
        })
        .then(res => {
          this.productData.image_url = `https://storage.googleapis.com/storage-example/${res.data.name}`;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    getEditData(id) {
      this.$axios
        .get(`products/${id}`, {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          this.productData = {
            id: res.data.id,
            name: res.data.name,
            image_url: res.data.image_url,
            price: res.data.price,
            stock: res.data.stock,
            CategoryId: res.data.CategoryId
          };
          this.formType = "edit";
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleForm() {
      this.productData = {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      };
      if (!this.formStatus) {
        this.formType = "add";
        this.formStatus = true;
      } else {
        this.formStatus = false;
      }
    },
    submitEdit() {
      let editData = {
        name: this.productData.name,
        image_url: this.productData.image_url,
        price: this.productData.price,
        stock: this.productData.stock,
        CategoryId: this.productData.CategoryId
      };

      this.$axios
        .put(`/products/${this.productData.id}`, editData, {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          this.$store.dispatch(
            "getFilteredList",
            this.$route.params.categoryname
          );

          this.productData = {
            name: null,
            image_url: null,
            price: null,
            stock: null,
            CategoryId: null
          };

          this.formStatus = false;

          Toast.fire({
            icon: "success",
            title: `Product ${res.data.name} updated`,
            timer: 2000
          });
          this.$emit("resetId");
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    submitProduct() {
      this.$axios
        .post("/products", this.productData, {
          headers: {
            token: localStorage.token
          }
        })
        .then(response => {
          this.$store.dispatch(
            "getFilteredList",
            this.$route.params.categoryname
          );
          this.productData = {
            name: null,
            image_url: null,
            price: null,
            stock: null,
            CategoryId: null
          };
          this.formStatus = false;

          Toast.fire({
            icon: "success",
            title: `Product ${response.data.name} added to list`,
            timer: 2000
          });
        })
        .catch(error => {
          console.log(error.response);
          let errorMsg = error.response.data.errors;
          let template = `<ul class="text-center" 
            style='list-style: none; font-size:16px;
            font-weight: 700;
            margin-right: 50px;'>`;

          Object.keys(errorMsg).forEach(el => {
            template += `<li> ${errorMsg[el]} </li>`;
          });

          template += `</ul>`;

          Swal.fire({
            title: "Error!",
            html: template,
            icon: "error",
            confirmButtonText: "Try again"
          });
        });
    }
  },
  mounted() {
    this.$store.dispatch("getAllCategories");
  },
  computed: {
    categories() {
      return this.$store.state.listCategories;
    }
  }
};
</script>

<style scoped>
.container {
  width: 39vw;
}

.content-container {
  width: 36vw;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-size: 12px;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 12px;
}
:-ms-input-placeholder {
  /* IE 10+ */
  font-size: 12px;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-size: 12px;
}

label {
  font-size: 14px;
}

.btn-icon {
  background-color: rgb(29, 202, 29);
  border: none;
  border-radius: 15%;
  color: white;
  padding: 10px 14px;
  font-size: 16px;
  cursor: pointer;
}
</style>