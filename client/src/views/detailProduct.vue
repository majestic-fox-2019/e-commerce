<template>
  <!-- eslint-disable max-len -->

  <div class="container" v-if="product">
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <h5 class="card-header">{{product.name}}</h5>
          <div class="card-body">
            <div class="image">
              <pic-zoom :url="product.image" :scale="2"></pic-zoom>
            </div>
            <h5 class="card-title">Rp. {{product.price}}</h5>
            <h6 class="card-text">Stock: {{product.stock}}</h6>
            <button class="btn btn-outline-warning">
              <i class="fas fa-edit" @click="isUpdate = true"></i>
            </button>
            <button class="btn btn-outline-danger" @click="deleteProduct">
              <i class="fas fa-trash"></i>
            </button>
            <button class="btn btn-outline-dark" @click="backToHome">
              <i class="fas fa-undo-alt"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-6" v-if="isUpdate">
        <div class="card">
          <div class="card-body">
            <updateForm :product="this.product"></updateForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PicZoom from 'vue-piczoom';
import updateForm from '../components/updateForm.vue';

export default {
  components: {
    updateForm,
    PicZoom,
  },
  data() {
    return {
      product: null,
      isUpdate: false,
    };
  },
  mounted() {
    this.getOne();
  },
  methods: {
    getOne() {
      return this.$axios({
        method: 'get',
        url: `${this.$server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((result) => {
          this.product = result.data;
        })
        .catch((err) => {
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: 'question',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    backToHome() {
      return this.$router.push({ path: '/admin' });
    },
    deleteProduct() {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: `You want to delete ${this.product.name}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#e79796',
          cancelButtonColor: '#ffc988',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.value) {
            return this.$axios({
              method: 'delete',
              url: `${this.$server}/products/${this.$route.params.id}`,
              headers: {
                token: localStorage.token,
              },
            })
              .then((result) => {
                this.$swal.fire({
                  title: 'Deleted!',
                  text: `${result.data.name} has been deleted.`,
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.product = result.data;
                this.$router.push({ path: '/admin' });
              })
              .catch((err) => {
                this.$swal.fire({
                  title: "We're sorry",
                  text: err.response.data,
                  icon: 'question',
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          }
        });
    },
  },
};
</script>

<style scoped>
.card {
  margin-left: 5%;
  margin-top: 10px;
}
button {
  margin: 5px;
}
.image {
  height: 200px;
  width: 50%;
}
</style>
