<template>
  <div>
    <h5 class="check">OTHERS ALSO BOUGHT</h5>
    <div class="contain">
      <div class="row">
        <div class="row__inner">
          <div class="tile" v-for="product in allproducts" :key="product.id">
            <div class="tile__media" @click="getOne(product.id)">
              <img class="tile__img" :src="product.image" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.products = this.$store.dispatch('allProducts');
  },
  computed: {
    allproducts() {
      return this.$store.state.products;
    },
  },
  methods: {
    getOne(ProductId) {
      this.$router.push({ name: 'oneProduct', params: { id: ProductId } });
      this.$emit('getOne', ProductId);
    },
  },
};
</script>

<style scoped>
body,
html {
  padding: 0 10px;
  margin: 0;
  background: #0e0f11;
  color: #ecf0f1;
  font-family: "Open Sans", sans-serif;
  min-height: 100vh;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
}
* {
  box-sizing: border-box;
}
.check {
  color: #e79796;
  margin-top: 80px;
  margin-bottom: 0;
}
h1,
p {
  text-align: center;
}
p {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
a:link,
a:hover,
a:active,
a:visited {
  -webkit-transition: color 150ms;
  transition: color 150ms;
  color: #95a5a6;
  text-decoration: none;
}
a:hover {
  color: #7f8c8d;
  text-decoration: underline;
}
.contain {
  width: 100%;
  margin-top: 0;
}
.row {
  overflow: scroll;
  width: 100%;
}
.row__inner {
  -webkit-transition: 450ms -webkit-transform;
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  margin: 70.3125px 0;
  padding-bottom: 10px;
}
.tile {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 140.625px;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
  -webkit-transition: 450ms all;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.tile__img {
  width: 100px;
  -o-object-fit: cover;
  object-fit: cover;
}
.tile__details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(rgba(0, 0, 0, 0.9)),
    to(rgba(0, 0, 0, 0))
  );
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-transition: 450ms opacity;
  transition: 450ms opacity;
}
.tile__details:after,
.tile__details:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: #000;
}

.tile__details:before {
  left: 0;
  width: 100%;
  font-size: 30px;
  margin-left: 7px;
  margin-top: -18px;
  text-align: center;
  z-index: 2;
}
.tile:hover .tile__details {
  opacity: 1;
}
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.row__inner:hover {
  -webkit-transform: translate3d(-62.5px, 0, 0);
  transform: translate3d(-62.5px, 0, 0);
}
.row__inner:hover .tile {
  opacity: 0.3;
}
.row__inner:hover .tile:hover {
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  opacity: 1;
}
.tile:hover ~ .tile {
  -webkit-transform: translate3d(125px, 0, 0);
  transform: translate3d(125px, 0, 0);
}
</style>
