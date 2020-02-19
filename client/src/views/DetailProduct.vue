<template>
  <div>
    <!-- {{detailProduct}} -->
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
          <div class="row divide">
            <div class="col-2 subtit">JUMLAH</div>
            <div class="col-10">
              <div class="d-flex justify-content-center mt-5">
                <i class="fas fa-lg fa-minus-circle minus" @click="minus"></i>
                <input min="0" class="inputStock" v-model="stockBeli" type="number" />
                <i class="fas fa-lg fa-plus-circle plus" @click="plus"></i>
              </div>
            </div>
          </div>
          <div class="mt-5 btn btn-primary" v-on:click="addToCart">Add To Cart</div>
        </div>
      </div>
    </div>
    <modalLogin></modalLogin>
  </div>
</template>

<script>
import modalLogin from "../components/modalLogin";
export default {
  name: "detail",
  components: {
    modalLogin
  },
  data() {
    return {
      value: 0,
      stockBeli: 0
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
      }
    }
  },
  mounted() {
    let id = this.$route.params.idProduct;
    this.$store.dispatch("getDetailProduct", id);
  },
  computed: {
    detailProduct() {
      return this.$store.state.productDetail;
    },
    price() {
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
    },
    shop() {
      if (this.detailProduct.User.role == "admin") {
        return "Official Shop";
      } else {
        return this.detailProduct.User.name;
      }
    },
    rating() {
      return this.detailProduct.rating;
    }
  },
  watch: {
    detailProduct() {
      this.value = this.detailProduct.rating;
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