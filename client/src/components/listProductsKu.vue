<template>
  <!-- <div> -->
  <tr>
    <th>
      <img :src="detailPKu.image_url" height="100" />
    </th>
    <th>{{detailPKu.name}}</th>
    <th class="overflow-auto colDesc">{{detailPKu.description}}</th>
    <th>{{detailPKu.category}}</th>
    <th>{{detailPKu.price}}</th>
    <th>{{detailPKu.stock}}</th>
    <th>
      <div class="d-flex justify-content-center">
        <div class="col">
          <div class="btn btn-warning" v-b-modal="'modalEdit' + detailPKu.id">
            <i class="el-icon-edit-outline styleIcon"></i>
          </div>
        </div>
        <div class="col">
          <div class="btn btn-danger" v-b-modal="'modalDelete' + detailPKu.id">
            <i class="el-icon-delete-solid styleIcon"></i>
          </div>
        </div>
      </div>
    </th>
    <b-modal class="modal-lg" :id="'modalEdit' + detailPKu.id" hide-footer>
      <form class="center p-5">
        <div class="form-group">
          <div class="d-flex">
            <label for="nameEdit" class="mr-3">
              <p>Name</p>
            </label>
            <input
              type="text"
              class="form-control"
              id="nameEdit"
              placeholder="Enter product's name"
              v-model="name"
            />
          </div>
        </div>
        <b-form inline>
          <label for="stockEdit">
            <p class="mr-4">Stock</p>
          </label>
          <b-input
            id="stockEdit"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="stock"
            v-model="stock"
            type="number"
          ></b-input>
          <div class="d-flex mt-3">
            <label for="priceEdit">
              <p class="mt-3 mr-4">Price</p>
            </label>
            <b-input-group prepend="Rp" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input id="priceEdit" type="number" v-model="price" placeholder="Price"></b-input>
            </b-input-group>
          </div>

          <label for="categoryEdit">
            <p class="mt-3">Category</p>
          </label>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select id="categoryEdit" v-model="category" :options="categories" required></b-form-select>
          </b-input-group>
        </b-form>

        <div class="d-flex my-3 form-group">
          <label for="descEdit" class="mr-3">
            <p>Descr</p>
          </label>
          <textarea id="descEdit" cols="100" rows="10" v-model="description"></textarea>
        </div>
        <label for="file" class="mt-3">
          <p>Picture</p>
        </label>
        <!-- <b-form-file
          id="image_urlEdit"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          name="image_urlEdit"
          v-on:change="uploadGambar"
        ></b-form-file>-->
        <div class="row justify-content-end mt-3">
          <b-button
            variant="primary"
            v-on:click="edit"
            @click="$bvModal.hide('modalEdit' + detailPKu.id)"
          >Edit</b-button>
        </div>
      </form>
    </b-modal>

    <b-modal :id="'modalDelete' + detailPKu.id" hide-footer>
      <h3>Are You sure you want to delete {{detailPKu.name}}?</h3>
      <div class="d-flex justify-content-end">
        <div class="col">
          <div class="btn btn-warning" @click="$bvModal.hide('modalDelete' + detailPKu.id)">Cancel</div>
        </div>
        <div class="col">
          <div
            class="btn btn-danger"
            @click="$bvModal.hide('modalDelete' + detailPKu.id)"
            v-on:click="deleteThis"
          >Yes</div>
        </div>
      </div>
    </b-modal>
  </tr>

  <!-- </div> -->
</template>

<script>
export default {
  name: "listku",
  props: ["detailPKu"],
  data() {
    return {
      name: "",
      category: "",
      price: "",
      stock: "",
      image_url: "",
      description: "",
      categories: ["Clothes", "Shoes", "Accessories"]
    };
  },
  methods: {
    uploadGambar(e) {
      this.image_url = e.target.files[0];
    },
    edit() {
      //   console.log(this.detailPKu.id, "<< idnya");
      let objEdit = {
        id: this.detailPKu.id,
        name: this.name,
        category: this.category,
        description: this.description,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url
      };
      this.$store.dispatch("editProduct", objEdit);
    },
    deleteThis() {
      console.log("masuk delete");
      let id = this.detailPKu.id;
      this.$store.dispatch("deleteProduct", id);
    }
  },

  computed: {
    detail() {
      return this.detailPKu;
    }
  },
  mounted() {
    this.name = this.detail.name;
    this.category = this.detail.category;
    this.price = this.detail.price;
    this.stock = this.detail.stock;
    this.image_url = this.detail.image_url;
    this.description = this.detail.description;
  }
};
</script>

<style>
</style>