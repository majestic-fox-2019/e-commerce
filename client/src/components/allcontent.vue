<template>
  <div>
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item active"
          style="background-image: url('https://images.unsplash.com/photo-1563941402830-3bae42b67b38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')"
        ></div>
      </div>
    </div>
    <div class="row">
      <div class="col-10 offset-md-1 box">
        <div class="row">
          <div class="col-3 kiste" v-for="(product, idx) in getAllData()" :key="idx">
            <div class="card inhalt">
              <img class="card-img-top" :src="product.image_url" />
              <div class="card-body" style="background-color:#E2D4BA">
                <h4 class="card-text">{{product.name}}</h4>
                <router-link
                  class="btn btn-primary"
                  style="background-color:#A89B9D"
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
    }
  },
  created() {
    this.$store.dispatch("getAllCarts");
    this.$store.dispatch("getAllProduct");
  }
};
</script>
<style scoped>
.carousel-item {
  margin-top: 50px;
  height: 100v;
  min-height: 300px;
  background: no-repeat center scroll;
  background-size: cover;
}
.carousel-inner {
  height: 400px;
  width: 100%;
}
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