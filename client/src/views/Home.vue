<template>
  <div class="container">
    <Carousel></Carousel>
    <div class="mt-3">
      <div class="form-group">
        <input
          v-model="key"
          placeholder="Search....."
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
    </div>
    <Category></Category>

    <div class="row mt-2 pt-3" style="border-top: solid 2px red">
      <div class="col-3" v-for="(product, index) in filteredList" :key="index">
        <CustomerCards :content="product"></CustomerCards>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CustomerCards from "../components/Cards";
import Category from "../components/Category";
import Carousel from "../components/Caorousel";
export default {
  data() {
    return {
      key: ""
    };
  },
  created() {
    this.$store.dispatch("checkLogin");
    this.$store.dispatch("getProduct");
  },
  name: "Home",
  components: {
    Carousel,
    Category,
    CustomerCards
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    filteredList() {
      let temp = this.$store.state.search;
      if (this.$store.state.search.length === 0) {
        return this.products.filter(post => {
          return post.name.toLowerCase().includes(this.key.toLowerCase());
        });
      } else {
        return this.products.filter(post => {
          return post.category.toLowerCase().includes(temp.toLowerCase());
        });
      }
    }
  }
};
</script>
