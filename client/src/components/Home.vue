<template>
  <div>
    <Menu></Menu>
    <div class="row">
      <div class="col-10 offset-md-1 box">
        <div class="row">
          <div class="col-3 kiste" v-for="(product, idx) in getAllData()" :key="idx">
            <div class="card inhalt">
              <img class="card-img-top" :src="product.image_url" />
              <div class="card-body">
                <p class="card-text">{{product.name}}</p>
                <p>{{product.price}}</p>
                <button class="btn btn-primary" @click="addcart(product.id)">Add Cart</button>
                <router-link
                  class="btn btn-primary"
                  :to="{name:'Detail', params:{id:product.id}}"
                >Show Detail</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Menu from "./menu.vue";
export default {
  components: { Menu },
  methods: {
    getAllData() {
      return this.$store.state.products;
    },
    addcart(id) {
      axios({
        method: "POST",
        url: `http://localhost:3000/carts/${id}`,
        data: { quantity: 1 },
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          this.$Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "One Item per Customer"
          });
        });
    }
  },
  created() {
    this.$store.dispatch("getAllCarts");
    this.$store.dispatch("getAllProduct");
  }
};
</script>
<style scoped>
.box {
  margin-top: 50px;
}
.button {
  color: rgb(182, 174, 174);
}
.inhalt {
  min-height: 350px;
}
.kiste {
  margin-bottom: 15px;
}
.card-img-top {
  height: 220px;
}
</style>