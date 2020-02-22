<template>
  <div class="flex-container">
    <div v-for="(product, idx) in listProducts()" :key="idx" class="container"
    :style="`background: url(${product.image_url}); background-color: #F4F4F4
    background-size: 100% background-repeat: no-repeat;
    background-position: center`">
      <div class="overlay">
        <div class = "items"></div>
        <div class = "items head">
          <p><router-link :to="{name: 'Product', params: { productId: product.id }}">
          {{product.name}}</router-link></p>
          <hr>
        </div>
        <div class = "items price">
          <p class="new">{{product.price}}</p>
        </div>
        <div class="items cart" @click="addToCart(product.id)">
          <i class="fa fa-shopping-cart"></i>
          <span>ADD TO CART</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'Card',
  data() {
    return {
      productId: null,
    };
  },
  methods: {
    listProducts() {
      return this.$store.getters.getListProducts;
    },
    addToCart(id) {
      if (this.$store.state.loginStatus) {
        this.$axios.post(`/carts/${id}`, {}, { headers: { token: localStorage.token } })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Succesfully added to cart',
              showConfirmButton: false,
              timer: 1200,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push('Login');
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fef5df;
}
.flex-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.container {
  width: 300px;
  height: 400px;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 10px;
  background-color: #F4F4F4;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  -webkit-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
}

.overlay {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;
  background: rgba(77, 77, 77, 0.9);
  color: #fef5df;
  opacity: 0;
  transition: all 0.5s;
  font-family: "Playfair Display", serif;
}

.items {
  padding-left: 20px;
  letter-spacing: 3px;
}

.head {
  font-size: 30px;
  line-height: 40px;
  transform: translateY(40px);
  transition: all 0.7s;
}
.head hr {
  display: block;
  width: 0;
  border: none;
  border-bottom: solid 2px #fef5df;
  position: absolute;
  bottom: 0;
  left: 20px;
  transition: all 0.5s;
}

.price {
  font-size: 22px;
  line-height: 10px;
  font-weight: bold;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.7s;
}
.price .old {
  text-decoration: line-through;
  color: #b3b3b3;
}

.cart {
  font-size: 12px;
  opacity: 0;
  letter-spacing: 1px;
  font-family: "Lato", sans-serif;
  transform: translateY(40px);
  transition: all 0.7s;
}
.cart i {
  font-size: 16px;
}
.cart span {
  margin-left: 10px;
}

.container:hover .overlay {
  opacity: 1;
}
.container:hover .overlay .head {
  transform: translateY(0px);
}
.container:hover .overlay hr {
  width: 75px;
  transition-delay: 0.4s;
}
.container:hover .overlay .price {
  transform: translateY(0px);
  transition-delay: 0.3s;
  opacity: 1;
}
.container:hover .overlay .cart {
  transform: translateY(0px);
  transition-delay: 0.6s;
  opacity: 1;
}
</style>>
