<template>
  <div class="home">
    <div class="row">
      <div class="col-2 menu">
        <Navbar></Navbar>
      </div>
      <div class="col-10 content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Content from "./Content";
export default {
  name: "Home",
  data() {
    return {
      allProduct: null
    };
  },
  components: { Navbar, Content },
  methods: {
    getAllData() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch("getAllProduct");
  }
};
</script>
<style scoped>
.menu {
  margin-top: 80px;
  height: 1020px;
}
.row {
  height: 1100px;
}
.content {
  margin-top: 60px;
}
.card {
  padding: 2px;
  height: 100%;
  margin-bottom: 20px;
}
.col-4 {
  margin-bottom: 20px;
}
.image {
  height: 70%;
  padding: 10px;
}
</style>
