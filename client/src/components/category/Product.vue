<template>
  <div>
    <div class="card" style="width: 18rem;">
      <img :src="barang.image_url" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{barang.name}}</h5>
        <!-- <p class="card-text">Price : {{barang.price}}</p> -->
        <p class="card-text">Price : {{rupiah}}</p>
        <p>Stock : {{barang.stock}}</p>
        <p>category : {{barang.Category.name}}</p>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary">
            <input
              type="radio"
              name="options"
              data-toggle="modal"
              :data-target="`#tes${barang.id}`"
            />
            <i class="far fa-edit"></i>
          </label>
          <label class="btn btn-secondary">
            <input type="radio" name="options" @click="deleteBarang" />
            <i class="fas fa-eraser"></i>
          </label>
        </div>
      </div>

      <!-- modal -->
      <div
        class="modal fade"
        :id="`tes${barang.id}`"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editProductLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" style="color:black;">Add Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" required v-model="editForm.name" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="image" class="col-sm-2 col-form-label">Image Url</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" required v-model="editForm.image_url" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-2 col-form-label">Price</label>
                  <div class="col-sm-10">
                    <input
                      type="number"
                      class="form-control"
                      min="0"
                      required
                      v-model="editForm.price"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputPassword3" class="col-sm-2 col-form-label">Stock</label>
                  <div class="col-sm-10">
                    <input
                      type="number"
                      class="form-control"
                      min="0"
                      required
                      v-model="editForm.stock"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Category</label>
                  <select class="form-control" v-model="editForm.CategoryId">
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
              <button type="button" class="btn btn-primary" @click="editBarang">Sumbit</button>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["barang"],
  created() {
    this.editForm.name = this.barang.name;
    this.editForm.image_url = this.barang.image_url;
    this.editForm.price = this.barang.price;
    this.editForm.stock = this.barang.stock;
    this.editForm.CategoryId = this.barang.CategoryId;
  },
  computed: {
    rupiah() {
      let result = [];
      let key = 1;
      let price = String(this.barang.price);
      for (let i = price.length - 1; i >= 0; i--) {
        if (key % 3 === 0 && key !== price.length) {
          result.unshift(`.${price[i]}`);
        } else {
          result.unshift(price[i]);
        }
        key++;
      }
      return `Rp ${result.join("")}`;
    }
  },
  data() {
    return {
      editForm: {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      }
    };
  },
  methods: {
    deleteBarang() {
      this.$store.dispatch("deletBarang", this.barang.id);
    },
    editBarang() {
      let updatedForm = {
        id: this.barang.id,
        name: this.editForm.name,
        image_url: this.editForm.image_url,
        price: this.editForm.price,
        stock: this.editForm.stock,
        CategoryId: this.editForm.CategoryId
      };
      this.$store.dispatch("editBarang", updatedForm);
      window.$("#tes" + this.barang.id).modal("hide");
    }
  }
};
</script>

<style>
/* board card and content */

.card {
  margin: 1.5em 0px;
}
.categoryBtn {
  cursor: pointer;
}
.categoryBtn:hover {
  border-bottom: 2px solid white;
}
.card-img-top {
  border-bottom: 2px solid #56ccf2;
}
.card-body {
  color: #000;
  font-family: "Raleway", sans-serif;
}
.card-img,
.card-img-bottom,
.card-img-top {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 20em;
  object-fit: cover;
}
</style>
