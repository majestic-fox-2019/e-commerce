<template>
  <!-- eslint-disable max-len -->
  <div class="allcards">
    {{checkLogin()}}
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :color="'#d47a90'"
        :loader="'dots'"
        :width="100"
      ></loading>
    </div>
    <div class="card h-100" style="width: 15rem;" v-for="card in cards" :key="card.id">
      <img class="card-img-top" :src="[card.image ? card.image : image]" />
      <div class="card-body" v-if="isAdmin">
        <h5>{{card.name}}</h5>
        <button
          class="btn btn-outline-secondary btn-sm"
          @click="showProducts(card.name)"
        >Show All Products</button>
        <button
          class="btn btn-outline-danger btn-sm"
          @click="deleteProduct(card.id, card.name)"
        >Delete</button>
      </div>

      <div v-if="!isAdmin">
        <div class="card-body">
          <router-link :to="{name: 'oneProduct', params: {id: card.id}}">
            <h6>{{card.name}}</h6>
          </router-link>
          <p>{{$formatRupiah(card.price)}}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <button
              class="btn btn-outline-secondary btn-sm"
              @click="addCart(card.id, card.stock)"
              v-if="card.stock"
            >
              <i class="fas fa-cart-plus fa-lg"></i>Add to cart
            </button>
            <button class="btn btn-outline-danger btn-sm" v-else>Out of stock</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading
  },
  props: ["cards"],
  data() {
    return {
      isAdmin: false,
      isLoading: false,
      image:
        "https://cdn3.iconfinder.com/data/icons/beauty-makeup-and-fashion-1/66/2-512.png"
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.role == "admin") {
        this.isAdmin = true;
      }
    },
    showProducts(category) {
      this.$router.push({ path: "/filter", query: { category } });
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
            this.isLoading = true;
            return this.$axios({
              method: "delete",
              url: `${this.$server}/categories/${id}`,
              headers: {
                token: localStorage.token
              }
            })
              .then(result => {
                this.isLoading = false;
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
                this.isLoading = false;
                this.$swal.fire({
                  title: "We're sorry",
                  text: err.response.data.message,
                  icon: "question",
                  showConfirmButton: false,
                  timer: 1500
                });
              });
          }
        });
    },
    addCart(id, stock) {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: `${this.$server}/carts/${id}`,
        data: { amount: 1, stock },
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.isLoading = false;
          this.$store.dispatch("userCarts");
          this.$swal.fire({
            title: "Successfully added to your cart!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          this.isLoading = false;
          if (localStorage.token) {
            this.$swal.fire({
              title: "We're sorry",
              text: err.response.data,
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.$swal.fire({
              title: "Please login first",
              showConfirmButton: false,
              timer: 1000
            });
            this.$router.push({ name: "loginPage" });
          }
        });
    }
  }
};
</script>

<style scoped>
.allcards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 1% 0 0 9%;
}
.card {
  margin-right: 10px;
  margin-bottom: 10px;
  border: none;
}
.btn {
  margin-right: 2px;
}
h6 {
  color: #e79796;
  text-align: center;
}
p {
  color: black;
  font-family: "Montserrat";
  font-size: 14px;
}
.list-group-item {
  text-align: center;
  color: #e79796;
}
img {
  width: 30%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
