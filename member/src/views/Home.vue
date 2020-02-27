<template>
  <v-container>
    <v-card>
      <v-toolbar color="teal" dark flat prominent>
        <v-text-field
          v-model="search"
          @keyup="onSearch"
          class="ma-4"
          flat
          hide-details
          label="Search"
          solo-inverted
        ></v-text-field>
        <template v-slot:extension>
          <v-tabs v-model="tabs" centered>
            <v-tab>All Product</v-tab>
            <v-tab v-for="category in categories" :key="category.id">{{category.name}}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item class>
          <v-container v-if="Array.isArray(products)">
            <v-row :justify="'center'">
              <product
                v-for="product in products"
                :key="product.id"
                :product="product"
                class="my-2"
              />
            </v-row>
          </v-container>
          <v-container v-else class="text-center">
            <v-img class="mx-auto" height="480" width="480" contain src="@/assets/no_data.svg"></v-img>
            <p type="font-weight-bold">{{products}}</p>
          </v-container>
        </v-tab-item>
        <v-tab-item v-for="category in categories" :key="category.id">
          <v-container>
            <v-row
              :justify="'center'"
              v-if="Array.isArray(products) && products.filter(a => a.CategoryId == category.id).length !== 0"
            >
              <product
                v-for="product in products.filter(a => a.CategoryId == category.id)"
                :key="product.id"
                :product="product"
                class="my-2"
              />
            </v-row>
            <v-container v-else class="text-center">
              <v-img class="mx-auto" height="480" width="480" contain src="@/assets/no_data.svg"></v-img>
              <p type="font-weight-bold">No product in {{category.name}}</p>
            </v-container>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import Product from "../components/Product";
export default {
  components: {
    Product
  },
  data() {
    return {
      search: "",
      tabs: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  mounted() {
    if (this.categories === null) this.$store.dispatch("getCategories");
    if (this.products === null) this.$store.dispatch("getProducts");
    this.getCarts;
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    products() {
      return this.$store.state.products;
    },
    productsBackup() {
      return this.$store.state.productsBackup;
    },
    carts() {
      return this.$store.state.carts;
    },
    getCarts() {
      return this.$store.dispatch("getCarts");
    }
  },
  methods: {
    onSearch() {
      if (this.search === "") {
        this.$store.commit("restoreProducts", this.productsBackup);
      } else {
        this.$store.commit(
          "setProducts",
          this.products.filter(a =>
            a.name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }
    }
  }
};
</script>