<template>
<div>
  <div class="vld-parent">
  <loading :active.sync="isLoading" 
  :can-cancel="true" 
  :loader="'bars'" :color="'#1161EE'"></loading>
  </div>
  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://images.unsplash.com/photo-1553063085-dbbf64d936ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80" class="d-block" style="height: 500px; width: 100%;" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h1>Arduino</h1>
        <p style="font-size: 20px;">Arduino is an open-source electronics platform
          based on easy-to-use hardware and software.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1553408226-d7bf0d27f9e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" class="d-block" style="height: 500px; width: 100%;" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h1>Arduino</h1>
        <p style="font-size: 20px;">Arduino boards are able to read inputs - light on a sensor,
          a finger on a button, or a Twitter message - and turn it into an output - activating a
          motor, turning on an LED, publishing something online.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1555543451-eeaff357e0f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80" class="d-block" style="height: 500px; width: 100%;" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h1>Arduino</h1>
        <p style="font-size: 20px;">You can tell your board what to do by sending a set
          of instructions to the microcontroller on the board.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
  <div class="flex-container">
    <div v-for="(product, idx) in listProducts()" :key="idx">
    <div v-if="product.stock > 0" class="container"
    :style="`background: url(${product.image_url}); background-color: #F4F4F4;
    background-size: contain; background-repeat: no-repeat;
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
        <div class="items cart" @click="addToCart(product.id, product.price)"
        style="cursor: pointer;">
          <i class="fa fa-shopping-cart"></i>
          <span>ADD TO CART</span>
      </div>
    </div>
  </div>
  <div v-if="product.stock == 0" class="container"
    :style="`background: url(${product.image_url}); background-color: #F4F4F4;
    background-size: contain; background-repeat: no-repeat;
    background-position: center`">
      <div class="overlay">
        <div class = "items"></div>
        <div class = "items head">
          <p><router-link :to="{name: 'Product', params: { productId: product.id }}">
          {{product.name}}</router-link></p>
          <hr>
        </div>
        <div class = "items price">
          <p class="new">OUT OF STOCK</p>
        </div>
        <div class="items cart">
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Card',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      productId: null,
    };
  },
  methods: {
    listProducts() {
      return this.$store.getters.getListProducts;
    },
    addToCart(id, price) {
      this.isLoading = true;
      if (this.$store.state.loginStatus) {
        this.$axios.post(`/carts/${id}`, {
          total: this.convertRpNumber(price),
          amount: 1,
        }, { headers: { token: localStorage.token } })
          .then(() => {
            this.isLoading = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Succesfully added to cart',
              showConfirmButton: false,
              timer: 1200,
            });
          })
          .catch((err) => {
            this.isLoading = false;
            if (err.response.data.message === 'This Product is out of stock') {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1200,
              });
            } else {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1200,
              });
            }
            console.log(err.response.data.message);
          });
      } else {
        this.$router.push('Login');
      }
    },
    convertRpNumber(value) {
      const arrRp = value.split('');
      arrRp.splice(0, 4);
      arrRp.reverse();
      for (let i = 0; i < arrRp.length; i += 1) {
        if (arrRp[i] === '.') {
          arrRp.splice(i, 1);
        }
      }
      const numberPrice = arrRp.reverse().join('');
      console.log(numberPrice);
      return numberPrice;
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
  margin-top: 40px;
}

.container {
  width: 300px;
  height: 300px;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 15px 10px;
  background-color: #F4F4F4;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  /* cursor: pointer; */
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
