<template>
  <div class="container" id="detailCard" style="color: grey">
    <div class="row mt-5">
      <div class="col">
        <img :src="product.image_url" width="500" height="500" alt />
      </div>
      <div class="col">
        <h1>{{product.name}}</h1>
        <div class="row" style="margin-top: 100px">
          <div class="col-1">
            <h4>Price</h4>
          </div>
          <div class="col">
            <h2>{{fixedPrice}}</h2>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-1">
            <h4>Stock</h4>
          </div>
          <div class="col">
            <h2>{{product.stock}}</h2>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-1">
            <h4>Category</h4>
          </div>
          <div class="col">
            <h2>{{product.category}}</h2>
          </div>
        </div>

        <div class="d-flex justify-content-center" style="margin-top: 50px">
          <div>
            <button @click.prevent="minus" id="minus" type="button" class="btn btn-danger mt-0">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <div>
            <h4>
              <input
                disabled
                v-model="stock"
                type="text"
                style="background-color: red;max-width:50px; border: 0; text-align:center; height: 37.5px;border-radius:5px"
              />
            </h4>
          </div>
          <div>
            <button @click.prevent="plus" id="plus" type="button" class="btn btn-danger mt-0">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <p v-if="this.stock === 0">Min. pembelian 1</p>
        <button @click.prevent="addToCart" type="button" class="btn btn-warning mb-5">
          Add To Cart
          <i class="fas fa-cart-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stock: 0
    };
  },
  created() {
    this.getProduct();
    this.$store.dispatch("checkLogin");
  },
  methods: {
    addToCart() {
      if (this.stock > 0 && this.stock <= this.product.stock) {
        const body = {
          id: this.product.id,
          name: this.product.name,
          image_url: this.product.image_url,
          price: Number(this.product.price),
          cartStock: this.stock,
          product: this.product.stock - this.stock
        };
        this.$store.dispatch("addOneCart", body);
      }
    },
    minus() {
      if (this.stock === 0) {
        this.stock = 0;
      } else {
        this.stock -= 1;
      }
    },
    plus() {
      if (this.stock < this.product.stock) {
        this.stock += 1;
      }
    },
    getProduct() {
      this.$store.dispatch("getProductOne", this.$route.params.id);
    }
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    fixedPrice() {
      if (this.product.price) {
        let bilangan = this.product.price;

        let number_string = bilangan.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
          let separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }
        return `Rp ${rupiah}`;
      }
    }
  }
};
</script>

<style>
#detailCard {
  box-shadow: 0 3px 9px rgba(255, 0, 0, 0.12), 99 2px 4px rgba(253, 1, 1, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

#detailCard:hover {
  box-shadow: 0 24px 50px rgba(255, 0, 0, 0.25),
    0 10px 20px rgba(255, 0, 0, 0.22);
  color: red !important;
}

#minus {
  cursor: crosshair;
}

#plus {
  cursor: crosshair;
}
</style>