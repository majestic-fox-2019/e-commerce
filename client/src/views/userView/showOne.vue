<template>
  <div class="oneproduct">
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
    <div class="media" v-if="product">
      <pic-zoom :url="product.image" :scale="2" class="mr-3"></pic-zoom>
      <div class="media-body">
        <h6 class="mt-0 desc">{{product.name}}</h6>
        <h5 class="mt-0 desc">{{$formatRupiah(product.price)}}</h5>
        <h6 class="mt-0 desc">
          Category
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm ctg"
          >{{product.Category.name}}</button>
        </h6>
        <div class="qty">
          <h6>Quantity</h6>
          <form v-on:submit.prevent="addCart(product.id, product.stock)">
            <input type="number" class="form-control input" v-model="amount" />
            <button type="submit" class="btn btn-outline-danger add btn-sm">ADD TO CART</button>
          </form>
        </div>
      </div>
    </div>
    <preview @getOne="getOne" />
  </div>
</template>

<script>
import PicZoom from "vue-piczoom";
import preview from "@/components/preview.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    preview,
    PicZoom,
    Loading
  },
  data() {
    return {
      product: null,
      amount: 1,
      isLoading: false
    };
  },
  mounted() {
    this.getOne();
  },
  methods: {
    getOne() {
      this.isLoading = true;
      return this.$axios({
        method: "get",
        url: `${this.$server}/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.isLoading = false;
          this.product = result.data;
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: "question",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    addCart(id, stock) {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: `${this.$server}/carts/${id}`,
        data: { amount: Number(this.amount), stock: stock },
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
              // title: "We're sorry",
              title: err.response.data,
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.$router.push({ name: "loginPage" });
          }
        });
    }
  }
};
</script>

<style scoped>
.oneproduct {
  margin: 10%;
}
.mr-3 {
  width: 30%;
}
.ctg {
  margin-left: 10px;
  color: #e79796;
}
.desc {
  margin-bottom: 20px;
}
.input {
  width: 50px;
  margin-left: 12px;
  height: 30px;
  margin-bottom: 20px;
}
.qty {
  display: flex;
  margin-top: 30px;
}
.add {
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 2px;
  margin-left: 12px;
}
.media-body {
  margin-left: 20px;
}
</style>