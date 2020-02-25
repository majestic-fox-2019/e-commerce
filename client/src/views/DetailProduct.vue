<template>
  <div>
    <!-- {{detailProduct}} -->
    <!-- {{reviews}} -->
    <div class="d-flex">
      <div class="col">
        <img :src="detailProduct.image_url" img-height="500" img-width="500" alt="Ini baju" />
      </div>
      <div class="col-md-6">
        <div class="mt-5">
          <div class="divide">
            <h2 style="font-family: 'Bitter', serif;">{{detailProduct.name}}</h2>
            <div class="row">
              <div class="col-4">
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} points"
                ></el-rate>
              </div>

              <div class="col-6">
                <i class="fas fa-store"></i>
                {{shop}}
              </div>
            </div>
          </div>
          <div class="my-3 divide">
            <!-- {{detailProduct.description}} -->
            <div class="row">
              <div class="col-2 subtit">DESC</div>
              <div class="col-10">{{detailProduct.description}}</div>
            </div>
          </div>
          <div class="my-3 divide">
            <div class="row">
              <div class="col-2 subtit">HARGA</div>
              <div class="col-10 bold">{{price}}</div>
            </div>
          </div>
          <div class="my-3 divide">
            <div class="row">
              <div class="col-2 subtit">STOCK</div>
              <div class="col-10">{{detailProduct.stock}}</div>
            </div>
          </div>
          <div v-if="!adminOrMine" class="row divide">
            <div class="col-2 subtit">JUMLAH</div>
            <div class="col-10">
              <div class="d-flex justify-content-center mt-5">
                <i class="fas fa-lg fa-minus-circle minus" @click="minus"></i>
                <input min="0" class="inputStock" v-model="stockBeli" type="number" />
                <i class="fas fa-lg fa-plus-circle plus" @click="plus"></i>
              </div>
            </div>
          </div>
          <div v-if="!adminOrMine" class="mt-5 btn btn-primary" v-on:click="addToCart">Add To Cart</div>
        </div>
      </div>
    </div>
    <modalLogin></modalLogin>
    <div class="mt-5 container text-left">
      <h4>See Reviews({{reviews.allReviewsOfProduct.length}})</h4>
      <reviews
        v-for="(oneReview, i) of reviews.allReviewsOfProduct"
        :key="i"
        :reviewDet="oneReview"
      ></reviews>
    </div>
  </div>
</template>

<script>
import reviews from "../components/reviews";
import Swal from "sweetalert2";
import modalLogin from "../components/modalLogin";
export default {
  name: "detail",
  components: {
    modalLogin,
    reviews
  },
  data() {
    return {
      value: 0,
      stockBeli: 0,
      adminOrMine: false
    };
  },
  methods: {
    minus() {
      this.stockBeli -= 1;
    },
    plus() {
      this.stockBeli += 1;
    },
    addToCart() {
      if (!localStorage.getItem("token")) {
        this.$bvModal.show(`bv-modal-example`);
      } else if (this.stockBeli == 0 || this.stockBeli < 0) {
        Swal.fire("Oops", "Your stock does not seem right", "error");
      } else if (this.stockBeli > this.detailProduct.stock) {
        Swal.fire("Oops", "You ordered more than the available stock", "error");
      } else {
        let objAddCart = {
          idProduct: this.$route.params.idProduct,
          qty: this.stockBeli
        };
        // console.log(objAddCart, "<< ini yang mau dibeli");
        this.$store.dispatch("addToCart", objAddCart);
      }
    },
    getReviews() {
      this.$store.dispatch("getReviews", this.$route.params.idProduct);
    }
  },
  mounted() {
    let id = this.$route.params.idProduct;
    this.$store.dispatch("getDetailProduct", id);
    this.getReviews();
  },
  computed: {
    detailProduct() {
      if (this.$store.state.productDetail == null) {
        let id = this.$route.params.idProduct;
        this.$store.dispatch("getDetailProduct", id);
        return "loading";
      } else {
        return this.$store.state.productDetail;
      }
    },
    price() {
      if (this.detailProduct.price) {
        let angka = this.detailProduct.price;

        var rupiah = "";
        var angkarev = angka
          .toString()
          .split("")
          .reverse()
          .join("");
        for (var i = 0; i < angkarev.length; i++)
          if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return (
          "Rp. " +
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          ",00"
        );
      } else {
        return "loading";
      }
    },
    shop() {
      if (this.detailProduct.User) {
        if (this.detailProduct.User.role == "admin") {
          return "Official Shop";
        } else {
          return this.detailProduct.User.name;
        }
      } else {
        return "loading..";
      }
    },
    rating() {
      return this.detailProduct.rating;
    },
    reviews() {
      if (this.$store.state.reviews) {
        return this.$store.state.reviews;
      } else {
        this.getReviews();
        return "loading...";
      }
    }
  },
  watch: {
    detailProduct() {
      this.value = this.detailProduct.rating;
      if (this.detailProduct.User == undefined) {
        return "sabar";
      } else if (
        this.detailProduct.User.id == localStorage.getItem("userId") ||
        localStorage.getItem("role") == "admin"
      ) {
        this.adminOrMine = true;
      }
    }
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
  color: #b53737;
  font-size: 25px;
}

.minus:hover {
  cursor: pointer;
  color: #b53737;
}
.plus:hover {
  cursor: pointer;
  color: green;
}
.inputStock {
  border: none;
  border-bottom: 1px solid lightgray;
  text-align: center;
  width: 50px;
}
.inputStock::-webkit-outer-spin-button,
.inputStock::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.divide {
  border-bottom: 1px solid lightgray;
  text-align: left;
}
.subtit {
  font-size: 20px;
  color: grey;
}
</style>