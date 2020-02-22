<template>
  <!-- eslint-disable max-len -->
  <div class="allcards">
    <div class="card" style="width: 18rem;" v-for="card in cards.getCategories" :key="card.id">
      <img class="card-img-top" :src="[card.image ? card.image : cards.image]" />
      <div class="card-body">
        <h5>{{card.name}}</h5>
        <button
          href="#"
          class="btn btn-outline-secondary btn-sm"
          @click="showProducts(card.name)"
        >Show All Products</button>
        <button
          class="btn btn-outline-danger btn-sm"
          @click="deleteProduct(card.id, card.name)"
        >Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cards"],
  methods: {
    showProducts(category) {
      this.$router.push({ path: "/filter", query: { category: category } });
    },
    deleteProduct(id, name) {
      this.$swal
        .fire({
          title: `You want to delete ${name} ?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#e79796",
          cancelButtonColor: "#ffc988",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            return this.$axios({
              method: "delete",
              url: `${this.$server}/categories/${id}`,
              headers: {
                token: localStorage.token
              }
            })
              .then(result => {
                this.$swal.fire({
                  title: "Deleted!",
                  text: `Category ${result.data.name} has been deleted.`,
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.$store.dispatch("allCategories");
              })
              .catch(err => {
                this.$swal.fire({
                  title: "We're sorry",
                  text: err.response.data,
                  icon: "question",
                  showConfirmButton: false,
                  timer: 1500
                });
              });
          }
        });
    }
  }
};
</script>

<style  scoped>
.allcards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1% 9% 0 9%;
}
.card {
  margin-right: 10px;
  margin-bottom: 10px;
}
.btn {
  margin-right: 2px;
}
h5 {
  color: #e79796;
}
img {
  width: 30%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>