<template>
  <div class="col">
    <div class="row">
      <div class="col-3">
        <img :src="content.image_url" width="200" height="200" alt />
      </div>
      <div class="col-3">
        <div>
          <h4 class="mt-5">{{content.name}}</h4>
        </div>
      </div>
      <div col="3">
        <div>
          <div class="d-flex justify-content-center" style="margin-top: 50px">
            <div>
              <button
                @click.prevent="minusStock"
                id="minus"
                type="button"
                class="btn btn-danger mt-0"
              >
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
              <button
                @click.prevent="plusStock"
                id="plus"
                type="button"
                class="btn btn-danger mt-0"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
          <h4 class="mt-5">{{fixedPrice}}</h4>
          <button @click.prevent="deleteCart" type="button" class="btn btn-danger">
            <i class="fas fa-trash-alt"></i>
          </button>
          <button @click.prevent="checkOut" type="button" class="btn btn-warning">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getProductOne();
  },
  data() {
    return {
      stock: this.content.stock
    };
  },
  props: ["content"],
  methods: {
    checkOut() {
      const body = {
        id: this.content.id,
        product: this.$store.state.product.stock - this.stock
      };
      this.$store.dispatch("checkOut", body);
    },
    deleteCart() {
      this.$store.dispatch("deleteCart", this.content.id);
    },
    getProductOne() {
      this.$store.dispatch("getProductOne", this.content.id);
    },
    minusStock() {
      if (this.stock === 0) {
        this.stock = 0;
      } else {
        this.stock -= 1;
        this.content.stock -= 1;
        if (this.stock > 0 && this.stock <= this.$store.state.product.stock) {
          const body = {
            id: this.content.id,
            name: this.content.name,
            image_url: this.content.image_url,
            price: Number(this.content.price),
            cartStock: this.stock,
            product: this.$store.state.product.stock - this.stock
          };

          this.$store.dispatch("addCart", body);
        }
      }
    },
    plusStock() {
      if (this.stock < this.$store.state.product.stock) {
        this.stock += 1;
        this.content.stock += 1;
        if (this.stock > 0 && this.stock <= this.$store.state.product.stock) {
          const body = {
            id: this.content.id,
            name: this.content.name,
            image_url: this.content.image_url,
            price: Number(this.content.price),
            cartStock: this.stock,
            product: this.$store.state.product.stock - this.stock
          };

          this.$store.dispatch("addCart", body);
        }
      }
    }
  },
  computed: {
    fixedPrice() {
      let bilangan = this.content.price * this.stock;

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
  // watch: {
  //   stock(newData, oldData) {
  //     console.log(newData, oldData);
  //     // this.stock = this.content.stock;
  //   }
  // }
};
</script>

<style>
</style>