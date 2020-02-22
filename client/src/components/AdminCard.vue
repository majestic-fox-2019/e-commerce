<template>
  <div class="col">
    <b-card
      :img-src="content.image_url"
      img-alt="Card image"
      img-height="200"
      img-left
      class="mb-3"
      align="left"
    >
      <b-card-header>
        <h2>{{content.name}}</h2>
      </b-card-header>
      <div class="row">
        <div class="col-8">
          <b-card-text>Price : {{fixedPrice}}</b-card-text>
          <b-card-text>Stock : {{content.stock}}</b-card-text>
        </div>
        <div class="col d-flex flex-column">
          <div>
            <b-button @click="$bvModal.show(id)">Update</b-button>

            <b-modal :id="id" title="Update" hide-footer>
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <!-- <label for="exampleInputPassword1">Image Url</label> -->
                  <input type="file" name="file" @change="uploadImage" />
                  <input
                    type="text"
                    class="form-control"
                    v-model="image_url"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Price</label>
                  <input
                    type="number"
                    v-model="price"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Stock</label>
                  <input
                    type="number"
                    v-model="stock"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button
                  type="submit"
                  @click.prevent="updateProduct(id), $bvModal.hide(id)"
                  class="btn btn-primary"
                >Submit</button>
              </form>
            </b-modal>
          </div>
          <div>
            <button
              @click.prevent="deleteContent(content.id)"
              type="button"
              class="btn btn-danger"
            >Delete</button>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.content.name,
      image_url: this.content.image_url,
      price: this.content.price,
      stock: this.content.stock
    };
  },

  created() {
    this.$store.dispatch("checkLogin");
  },
  computed: {
    id() {
      return String(this.content.id);
    },
    fixedPrice() {
      let bilangan = this.content.price;

      let number_string = bilangan.toString(),
        sisa = number_string.length % 3,
        rupiah = number_string.substr(0, sisa),
        ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }
      return `Rp ${rupiah}`;
    }
  },
  props: ["content"],
  methods: {
    uploadImage() {
      this.image_url = event.target.files[0];
    },
    deleteContent(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    updateProduct(id) {
      // const body = {
      //   id,
      //   name: this.name,
      //   image_url: this.image_url,
      //   price: Number(this.price),
      //   stock: Number(this.stock)
      // };
      let formData = new FormData();
      formData.append("id", Number(id));
      formData.append("name", this.name);
      formData.append("price", Number(this.price));
      formData.append("stock", Number(this.stock));
      formData.append("image_url", this.image_url);
      this.$store.dispatch("updateProduct", formData);
    }
  }
};
</script>

<style>
</style>