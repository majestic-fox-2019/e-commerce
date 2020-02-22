<template>
  <div>
    <div class="container mt-4 align-center category-list">
      <div class="row text-center">
        <div>
          <router-link :to="{ name: 'ProductByCategory', params: { categoryname: 'all' }}">
            <div
              class="btn btn-secondary btn-sm ml-1"
              style="display: inline-block; width:200px; border-radius: 10px"
            >All</div>
          </router-link>
          <router-link
            :to="{ name: 'ProductByCategory', params: { categoryname: category.name }}"
            v-for="category in categories"
            :key="category.id"
          >
            <div
              class="btn btn-secondary btn-sm ml-1"
              style="display: inline-block; width:200px; border-radius: 10px"
            >{{ category.name }}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="game-list d-flex ml-4 mr-4">
      <GameCard @editForm="proceedEdit"></GameCard>
      <FormGame :id="editId" @resetId="resetId"></FormGame>
    </div>
  </div>
</template>

<script>
import GameCard from "./GameCard";
import FormGame from "./FormGame";
export default {
  props: ["categoryname"],
  data() {
    return {
      editId: null
    };
  },
  watch: {
    categoryname() {
      this.filterByCategory(this.categoryname);
    }
  },
  components: {
    GameCard,
    FormGame
  },
  mounted() {
    this.filterByCategory();
  },
  computed: {
    categories() {
      return this.$store.state.listCategories;
    }
  },
  methods: {
    proceedEdit(id) {
      this.editId = id;
    },
    filterByCategory() {
      this.$store.dispatch("getFilteredList", this.$route.params.categoryname);
    },
    resetId() {
      this.editId = null;
    }
  }
};
</script>

<style scoped>
.category-list {
  width: 80%;
  white-space: nowrap;
  overflow-x: auto;
}
</style>
