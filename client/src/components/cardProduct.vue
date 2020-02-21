<template>
    <div class="d-flex justify-content-center">
        <div class="card" v-if="datadetail">
          <img class="card-img-top" :src ="datadetail.imageurl" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{datadetail.name}}</h5>
            <p class="card-text">
              Some quick example text to build on the card title
              and make up the bulk of the card's content.
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{formatnumber(datadetail.price)}}</li>
            <li class="list-group-item">Stock : {{datadetail.stock}}</li>
            <li class="list-group-item">img : {{datadetail.imageurl}} </li>
          </ul>
          <div class="card-body">
            <a @click="destroyData" class="btn btn-danger card-link">delete</a>
            <a @click.prevent="$emit('show-edit', datadetail)"
            class="btn btn-secondary card-link">edit</a>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'cardproduct',
  props: ['datadetail'],
  methods: {
    destroyData() {
      this.$axios({
        method: 'DELETE',
        url: `/product/${this.datadetail.id}`,
        headers: { token: localStorage.token },
      })
        .then(() => {
          this.$store.dispatch('loadData');
          this.$emit('empty-selected');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatnumber(int) {
      const num = new Intl.NumberFormat().format(int);
      return `Rp. ${num}`;
    },
  },

};
</script>

<style>

</style>
