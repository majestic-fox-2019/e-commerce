<template>
  <div class="col">
    <div class="row">
      <div class="col mt-4" v-for="(product, index) in filterProduct" :key="index">
        <div class="block">
          <div class="product">
            <img :src="product.image_url" />
            <div class="buttons">
              <a class="buy" href="#">Add to cart</a>
              <a class="preview" href="#">View item</a>
            </div>
          </div>

          <div class="info">
            <h4>{{product.name}}</h4>
            <span class="description">{{product.description}}</span>
            <span class="price">Rp. {{product.price}}</span>
            <a class="buy_now" href="#">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filterProduct() {
      if (this.$store.state.search.length > 0) {
        const regex = new RegExp(this.$store.state.search, "i");
        const filterProducts = this.$store.state.products.filter(product => {
          return regex.test(product.name);
        });
        return filterProducts;
      } else if (this.$store.state.searchCategory.length > 0) {
        const regex = new RegExp(this.$store.state.searchCategory, "i");
        const filterProducts = this.$store.state.products.filter(product => {
          return regex.test(product.category);
        });
        return filterProducts;
      } else {
        return this.$store.state.products;
      }
    }
  }
};
</script>

<style scoped>
.col {
  padding: 0;
}
.row {
  margin-right: 0 !important;
}
body {
  background: #34495e;
}

.block {
  display: block;
  position: relative;
  width: 295px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 7px 10px rgba(128, 128, 128, 0.57);
  margin: 0px auto;
}

.block:hover {
  box-shadow: 0 7px 10px rgba(22, 21, 21, 0.57);
}

.product {
  display: block;
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product img {
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.info {
  display: block;
  position: relative;
  padding: 20px;
}

.details {
  border-top: 1px solid #e5e5e5;
  padding: 18px 20px;
}

.buttons {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: opacity 0.25s ease-in;
}

.product:hover .buttons,
.product:hover a {
  opacity: 1;
}

.buttons a {
  display: block;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  width: 63%;
  border-radius: 2px;
  padding: 15px 40px;
  font-family: Helvetica, sans-serif;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  opacity: 0;
  text-align: center;
}

a.buy {
  top: 20%;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #1abc9c;
  background-position: 0 -15px;
  background-size: 400px 80px;
  background-repeat: no-repeat;
  box-shadow: 0 3px 0 #16a085;
  transition: background-position 0.2s ease-in;
}

a.buy:active {
  top: 21%;
  box-shadow: 0 0px 0 #16a085;
}

a.preview {
  bottom: 20%;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #3498db;
  background-position: 0 -15px;
  background-size: 400px 80px;
  background-repeat: no-repeat;
  box-shadow: 0 3px 0 #2980b9;
  transition: background-position 0.2s ease-in;
}

.preview:hover,
.buy_now:hover {
  background-position: 0 0;
}

.preview:active,
.buy_now:active {
  transform: translateY(2px);
  box-shadow: none;
}

.info h4 {
  position: relative;
  padding: 0 0 10px 0;
  margin: 0 0 5px 0;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 25px;
  color: #372f2b;
  letter-spacing: -1px;
}

.info h4::after {
  display: block;
  position: absolute;
  bottom: 0px;
  content: "";
  width: 40px;
  height: 2px;
  background: #3b86c4;
}

.info .description {
  display: block;
  padding-bottom: 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #5f5f5f;
}

.info .price {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #372f2b;
  line-height: 26px;
}

.buy_now {
  float: right;
  position: relative;
  top: -5px;
  display: block;
  padding: 10px 10px;
  border-radius: 3px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 15px;
  text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.4);
  background: #3498db;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #2980b9;
}

.time {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #372f2b;
  /* background: url("../img/clock-icon.png") no-repeat; */
  background-position: 0 2px;
}
</style>