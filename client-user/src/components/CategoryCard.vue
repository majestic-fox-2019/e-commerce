<template>
  <div
    class="d-flex mt-7"
    style="height:160px;overflow-x:auto; overflow-y:hidden; white-space: nowrap;"
  >
    <v-card class="mx-auto" max-width="450">
      <router-link :to="{ name: 'Store'}" style="text-decoration: none;">
        <v-img class="white--text align-end" height="150px" src="../assets/allcategory.jpg">
          <v-card-actions>
            <v-btn color="rgba(209, 209, 209, 0.5)">All</v-btn>
          </v-card-actions>
        </v-img>
      </router-link>
    </v-card>
    <v-card class="mx-auto" max-width="450" v-for="category in categories" :key="category.id">
      <router-link
        :to="{ name: 'Products', params: { category: category.name }}"
        style="text-decoration: none;"
      >
        <v-img class="white--text align-end" height="150px" :src="category.image">
          <v-card-actions>
            <v-btn class="category-button" color="rgba(209, 209, 209, 0.5)">{{ category.name }}</v-btn>
          </v-card-actions>
        </v-img>
      </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCategories() {
      this.$store.dispatch("getAllCategories");
    }
  },
  created() {
    this.getCategories();
  },
  computed: {
    categories() {
      return this.$store.state.listCategories;
    }
  }
};
</script>

<style scoped>
.category-button:hover {
  color: rgba(21, 18, 207, 0.808);
  transition: 1s;
}
</style>