<template>
  <div class="card">
      <div class="card__title">
        <div class="icon" @click="backHome" style="cursor: pointer;">
          <a><i class="fa fa-arrow-left"></i></a>
        </div>
        <h3>Products #{{product.id}}</h3>
      </div>
      <div class="card__body">
        <div class="half">
          <div class="featured_text">
            <h1>{{product.name}}</h1>
            <hr>
            <p class="price">{{product.price}}</p>
          </div>
          <div class="image">
            <img :src="product.image_url" alt="">
          </div>
        </div>
        <div class="half" id="description-product">
          <div class="description">
            <p>{{product.description}}</p>
          </div>
          <div v-if="product.stock > 0">
            <span class="stock">{{product.stock}} In stock</span>
          </div>
          <div v-if="product.stock == 0">
            <span class="stock">OUT OF STOCK</span>
          </div>
          <div class="reviews">
            <ul class="stars">
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star"></i></li>
              <li><i class="fa fa-star-o"></i></li>
            </ul>
            <span>(190 reviews)</span>
          </div>
        </div>
      </div>
      <div class="card__footer">
        <div class="recommend">
          <p>Recommended by</p>
          <h3><i class="fas fa-bolt"></i> ARDUISHOP <i class="fas fa-bolt"></i></h3>
        </div>
        <div class="action">
          <div v-if="product.stock > 0">
            <button @click="addToCart(product.id, product.price)" type="button">Add to cart</button>
          </div>
          <div v-if="product.stock == 0">
            <h3>OUT OF STOCK</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'ProductDetails',
  data() {
    return {
      id: this.$route.params.productId,
      product: {},
    };
  },
  methods: {
    backHome() {
      this.$router.push({ name: 'Home' });
    },
    showProduct() {
      this.$axios.get(`/products/${this.id}`)
        .then((user) => {
          this.product = user.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    addToCart(id, price) {
      if (this.$store.state.loginStatus) {
        this.$axios.post(`/carts/${id}`, {
          total: this.convertRpNumber(price),
          amount: 1,
        }, { headers: { token: localStorage.token } })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Succesfully added to cart',
              showConfirmButton: false,
              timer: 1200,
            });
            this.$router.push({ name: 'Home' });
          })
          .catch((err) => {
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
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1200,
              });
            }
            // console.log(err);
          });
      } else {
        this.$router.push({ name: 'Login' });
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
  mounted() {
    this.showProduct();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fjalla+One|Montserrat:300,400,700,800|Open+Sans:300");
body {
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#description-product {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card {
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
  -webkit-transition: 200ms;
  transition: 200ms;
  background: #fff;
}
.card .card__title {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  padding: 30px 40px;
}
.card .card__title h3 {
  -webkit-box-flex: 0;
          flex: 0 1 200px;
  text-align: right;
  margin: 0;
  color: #252525;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
}
.card .card__title .icon {
  -webkit-box-flex: 1;
          flex: 1 0 10px;
  background: #115dd8;
  color: #fff;
  padding: 10px 10px;
  -webkit-transition: 200ms;
  transition: 200ms;
}
.card .card__title .icon > a {
  color: #fff;
}
.card .card__title .icon:hover {
  background: #252525;
}
.card .card__body {
  padding: 0 40px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
          flex-flow: row no-wrap;
  margin-bottom: 25px;
}
.card .card__body > .half {
  box-sizing: border-box;
  padding: 0 15px;
  -webkit-box-flex: 1;
          flex: 1 0 50%;
}
.card .card__body .featured_text h1 {
  margin: 0;
  padding: 0;
  font-weight: 800;
  font-family: "Montserrat", sans-serif;
  font-size: 64px;
  line-height: 50px;
  color: #181e28;
}
.card .card__body .featured_text p {
  margin: 0;
  padding: 0;
}
.card .card__body .featured_text p.sub {
  font-family: "Montserrat", sans-serif;
  font-size: 26px;
  text-transform: uppercase;
  color: #686e77;
  font-weight: 300;
  margin-bottom: 5px;
}
.card .card__body .featured_text p.price {
  font-family: "Fjalla One", sans-serif;
  color: #252525;
  font-size: 26px;
}
.card .card__body .image {
  padding-top: 15px;
  width: 100%;
}
.card .card__body .image img {
  display: block;
  max-width: 100%;
  height: auto;
}
.card .card__body .description {
  margin-bottom: 25px;
}
.card .card__body .description p {
  margin: 0;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  line-height: 27px;
  font-size: 16px;
  color: #555;
}
.card .card__body span.stock {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #a1cc16;
}
.card .card__body .reviews .stars {
  display: inline-block;
  list-style: none;
  padding: 0;
}
.card .card__body .reviews .stars > li {
  display: inline-block;
}
.card .card__body .reviews .stars > li .fa {
  color: #f7c01b;
}
.card .card__body .reviews > span {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  margin-left: 5px;
  color: #555;
}
.card .card__footer {
  padding: 30px 40px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
          flex-flow: row no-wrap;
  -webkit-box-align: center;
          align-items: center;
  position: relative;
}
.card .card__footer::before {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  left: 40px;
  width: calc(100% - 40px);
  height: 3px;
  background: #115dd8;
  background: -webkit-gradient(linear, left top, right top,
  from(#115dd8), color-stop(20%, #115dd8), color-stop(20%, #ddd), to(#ddd));
  background: linear-gradient(to right, #115dd8 0%, #115dd8 20%, #ddd 20%, #ddd 100%);
}
.card .card__footer .recommend {
  -webkit-box-flex: 1;
          flex: 1 0 10px;
}
.card .card__footer .recommend p {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  color: #555;
}
.card .card__footer .recommend h3 {
  margin: 0;
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  color: #115dd8;
}
.card .card__footer .action button {
  cursor: pointer;
  border: 1px solid #115dd8;
  padding: 14px 30px;
  border-radius: 200px;
  color: #fff;
  background: #115dd8;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  -webkit-transition: 200ms;
  transition: 200ms;
}
.card .card__footer .action button:hover {
  background: #fff;
  color: #115dd8;
}

</style>
