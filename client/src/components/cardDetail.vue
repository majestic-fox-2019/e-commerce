<template>
  <div class="card col-md-10 offset-md-1">
    <div class="card-body">
      <div class="row">
        <div class="col">
          <img class="progress" :src="$store.state.product.image_url" alt srcset />
        </div>
        <div class="col">
          <section class="product_details_area">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="product_details_text">
                    <h3>{{$store.state.product.name}}</h3>
                    <ul class="p_rating">
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-star"></i>
                        </a>
                      </li>
                    </ul>
                    <h6>
                      Available In
                      <span>Stock</span>
                    </h6>
                    <h4>Rp. {{$store.state.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</h4>
                    <p>{{$store.state.product.description}}</p>
                    <div class="p_color">
                      <h4 class="p_d_title">
                        Stock : {{$store.state.product.stock}}
                        <span>*</span>
                      </h4>
                    </div>
                    <div class="quantity">
                      <div class="custom">
                        <button @click="min" class="reduced items-count" type="button">
                          <i class="fas fa-minus"></i>
                        </button>
                        <input
                          type="text"
                          name="qty"
                          id="sst"
                          maxlength="12"
                          v-model="qty"
                          title="Quantity:"
                          class="input-text qty"
                        />
                        <button @click="plus" class="increase items-count" type="button">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <button
                        @click="addCart($store.state.product.id)"
                        class="add_cart_btn"
                      >add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      qty: 1
    };
  },
  methods: {
    min() {
      if (this.qty < 1) {
        this.qty = 0;
      } else {
        this.qty -= 1;
      }
    },
    plus() {
      this.qty += 1;
    },
    addCart(id) {
      this.$store.dispatch("addToCart", { quantity: this.qty, productId: id });
    }
  },
  created() {
    axios({
      url: `http://localhost:3000/products/${this.$route.params.id}`,
      method: "GET"
    })
      .then(({ data }) => {
        this.$store.state.product = data;
      })
      .catch(({ response }) => {
        Swal.fire("Error!", response.data.message, "error");
      });
  }
};
</script>

<style lang="scss" scoped>
.progress {
  cursor: progress;
}
.card {
  box-shadow: 0 7px 10px rgba(128, 128, 128, 0.57);
  background: #ffffff;
  margin-top: 1.5vh;
}
.card:hover {
  box-shadow: 0 7px 10px rgba(22, 21, 21, 0.57);
}
img {
  max-height: 78vh;
  max-width: 36vw;
  min-width: 36vw;
  min-height: 79vh;
  transition: transform 1s, filter 2s ease-in-out;
  filter: blur(2px);
  transform: scale(1);
}
img:hover {
  max-height: 79vh;
  filter: blur(0);
  transform: scale(1);
}

.product_details_text {
  max-width: 450px;
}

.product_details_text h3 {
  font-size: 18px;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  padding-bottom: 13px;
}

.product_details_text .p_rating {
  display: inline-block;
}

.product_details_text .p_rating li {
  display: inline-block;
}

.product_details_text .p_rating li a {
  color: #efb504;
  font-size: 15px;
}

.product_details_text .add_review {
  display: inline-block;
  padding-left: 15px;
}

.product_details_text .add_review a {
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  color: #666666;
  margin-right: 35px;
  position: relative;
}

.product_details_text .add_review a:before {
  content: "";
  width: 2px;
  height: 14px;
  background: #666666;
  position: absolute;
  right: -17px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.product_details_text .add_review a:last-child {
  margin-right: 0px;
}

.product_details_text .add_review a:last-child:before {
  display: none;
}

.product_details_text h6 {
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  color: #666666;
  padding: 5px 0px 10px 0px;
}

.product_details_text h6 span {
  color: #0dda2a;
}

.product_details_text h4 {
  font-size: 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: #000;
  padding-bottom: 15px;
}

.product_details_text p {
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  line-height: 24px;
  color: #666666;
  letter-spacing: 0.325px;
  border-top: 1px solid #d6d6d6;
  border-bottom: 1px solid #d6d6d6;
  padding: 16px 0px;
}

.p_d_title {
  font-size: 16px;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding-bottom: 15px;
}

.p_d_title span {
  color: #ff0400;
}

.p_color {
  max-width: 460px;
  margin-top: 22px;
}

.p_color .color_list li {
  display: inline-block;
  margin-right: 10px;
}

.p_color .color_list li a {
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background: #1cbbb4;
  display: inline-block;
}

.p_color .color_list li:nth-child(2) a {
  background: #000000;
}

.p_color .color_list li:nth-child(3) a {
  background: #00aeef;
}

.p_color .color_list li:nth-child(4) a {
  background: #00a99d;
}

.p_color .color_list li:nth-child(5) a {
  background: #e7352b;
}

.p_color .color_list li:last-child {
  margin-right: 0px;
}

.p_color .color_list li:last-child a {
  background: #fbf4d9;
}

.p_color .bootstrap-select {
  width: 100% !important;
  cursor: pointer;
}

.p_color .bootstrap-select .dropdown-toggle {
  padding: 0px 20px;
  border: 1px solid #cccccc;
  border-radius: 0px;
  height: 40px;
  cursor: pointer;
}

.p_color .bootstrap-select .dropdown-toggle span {
  font-size: 14px;
  color: #666666;
  font-family: "Poppins", sans-serif;
}

.p_color .bootstrap-select .dropdown-toggle:after {
  border-top: 0.3em solid #666;
  position: relative;
  right: 10px;
}

.p_color .bootstrap-select .dropdown-menu .dropdown-menu.inner {
  display: block;
}

.p_color .bootstrap-select .dropdown-menu .dropdown-menu.inner li a {
  padding: 0px 10px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  color: #666666;
  line-height: 30px;
  -webkit-transition: all 400ms linear 0s;
  -o-transition: all 400ms linear 0s;
  transition: all 400ms linear 0s;
}

.p_color .bootstrap-select .dropdown-menu .dropdown-menu.inner li:hover a {
  color: #000;
}

.quantity {
  margin-top: 30px;
  margin-bottom: 18px;
}

.quantity .custom {
  display: inline-block;
  position: relative;
}

.quantity .custom .reduced,
.quantity .custom .increase {
  padding: 0px;
  border: none;
  background: transparent;
  outline: none !important;
  font-size: 18px;
  color: #000;
  cursor: pointer;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.quantity .custom .reduced {
  left: 10px;
}

.quantity .custom .increase {
  right: 10px;
}

.quantity .custom input {
  height: 50px;
  width: 150px;
  padding: 0px 20px;
  text-align: center;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.4px;
  border: 1px solid #cccccc;
  outline: none;
}

.quantity .custom input.placeholder {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.4px;
}

.quantity .custom input:-moz-placeholder {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.4px;
}

.quantity .custom input::-moz-placeholder {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.4px;
}

.quantity .custom input::-webkit-input-placeholder {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  letter-spacing: 0.4px;
}

.quantity .add_cart_btn {
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
  background: #ee4d2d;
  transition: background-position 0.2s ease-in;
  box-shadow: 0 3px 0 #e04b2dda;
  outline: none;
  height: 6.5vh;
}
</style>