<template>
  <div>
    <div class="container mt-4">
      <div class="row justify-content-start mx-auto overflow-auto">
        <div v-for="category in categories" :key="category.id">
          <router-link :to="{ name: 'ProductByCategory', params: { categoryname: category.name }}">
            <div class="card bg-dark text-white ml-2">
              <img class="card-img category-image" :src="category.image" alt="Card image" />
              <div class="card-img-overlay">
                <h5 class="card-title">{{ category.name }}</h5>
              </div>
            </div>
          </router-link>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getAllCategories");
  },
  computed: {
    categories() {
      return this.$store.state.listCategories;
    }
  }
};
</script>

<style scoped>
.row {
  max-height: 80vh;
}

.card {
  height: 150px;
  width: 500px;
  border-radius: 20px;
  cursor: pointer;
}

.category-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.card-title {
  font-weight: bold;
  font-size: 20px;
}
</style>