<template>
  <div>
    <h1 style="text-align:center">Detail</h1>
    <br />
    <div class="Container">
      <div class="row" v-if="productDetail">
        <div class="col">
          <img :src="productDetail.image_url" alt="Responsive image" />
        </div>
        <div class="col">
          <div class="judul text-center">
            <h3>{{ productDetail.name }}</h3>
          </div>
          <div class="isi">
            <ul>
              <li>Harga : {{ productDetail.price }}</li>
              <li>Stock : {{ productDetail.stock }}</li>
              <li>url : {{ productDetail.image_url }}</li>
            </ul>
            <div class="tombol" style="text-align:center;">
              <button
                type="button"
                class="btn btn-primary"
                style="margin:20px"
                data-toggle="modal"
                data-target="#editModal"
              >
                Edit
              </button>
              <button type="button" class="btn btn-info">
                <router-link to="/admin">Back</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit ADD -->
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Edit Modal</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="productEdit">
              <form v-on:submit.prevent="editProduct">
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    v-model="productEdit.name"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Image Url</label>
                  <input
                    type="text"
                    v-model="productEdit.image_url"
                    class="form-control"
                    placeholder="Image Url"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Price</label>
                  <input
                    type="text"
                    v-model="productEdit.price"
                    class="form-control"
                    placeholder="Price"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Stock</label>
                  <input
                    type="text"
                    v-model="productEdit.stock"
                    class="form-control"
                    placeholder="Stock"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Category</label>
                  <select
                    v-model="productEdit.CategoryId"
                    class="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option
                      v-for="(category, idx) in showCategory()"
                      :key="idx"
                      :value="category.id"
                      >{{ category.name }}</option
                    >
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailProduct",
  data() {
    return {
      productDetail: null,
      productEdit: null
    };
  },
  mounted() {
    this.getProduct();
    this.$store.dispatch("showCategory");
  },
  methods: {
    showCategory() {
      return this.$store.state.dataCategories;
    },
    getProduct() {
      this.$axios({
        method: "get",
        url: `/products/${this.$route.params.id}`,
        headers: { token: localStorage.token }
      })
        .then(data => {
          this.productDetail = data.data;
          this.productEdit = { ...this.productDetail };
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    editProduct() {
      this.$axios({
        method: "put",
        url: `/products/${this.$route.params.id}`,
        headers: { token: localStorage.token },
        data: {
          name: this.productEdit.name,
          image_url: this.productEdit.image_url,
          price: this.productEdit.price,
          stock: this.productEdit.stock,
          CategoryId: this.productEdit.CategoryId
        }
      })
        .then(data => {
          window.$("#editModal").modal("hide");
          this.getProduct();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
li {
  text-decoration: none;
  list-style-type: none;
}
.col {
  border: solid black 0.5px;
}
.isi {
  margin: 50px;
}
img {
  width: 500px;
}
</style>
