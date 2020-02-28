<template>
  <div class="info">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link"></a>
      </li>
      <li class="nav-item dropdown">
        <h6
          class="dropdown-toggle"
          type="text"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >SHOP BY CATEGORIES</h6>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            class="dropdown-item"
            href="#"
            v-for="category in categories"
            :key="category.id"
            v-on:click="filterCategory(category.name)"
          >{{category.name}}</a>
        </div>
      </li>
      <li class="nav-item">
        <h6>PROMOTION</h6>
      </li>
      <li class="nav-item">
        <h6>BRANDS</h6>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null,
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$axios({
        method: 'get',
        url: `${this.$server}/categories`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          this.categories = result.data;
        })
        .catch((err) => {
          console.log(err.response, '< err infobar');
        });
    },
    filterCategory(category) {
      this.$emit('filter', category);
    },
  },
};
</script>

<style scoped>
.info {
  margin-top: 7%;
}
.category {
  cursor: pointer;
}
.nav-item {
  margin-right: 20px;
  cursor: pointer;
  color: #e79796;
}
</style>
