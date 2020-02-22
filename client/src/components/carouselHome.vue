<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/carousel1.png" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="../assets/carousel2.png" class="d-block w-100" />
        </div>
        <div class="carousel-item">
          <img src="../assets/carousel3.png" class="d-block w-100" />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <div class="owl-next">
          <i class="fas fa-arrow-left"></i>
        </div>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <div class="owl-prev">
          <i class="fas fa-arrow-right"></i>
        </div>
      </a>
    </div>
    <section class="home_carousel_area variable slider">
      <div class="home_carousel_slider owl-carousel d-flex">
        <div class="item">
          <div class="h_carousel_item">
            <img src="../assets/home-carousel/home-c-1.jpg" />
            <div class="carousel_hover">
              <h3>Yuk Belanja</h3>
              <h4>Belanja murah harga terjangkau</h4>
              <h5>category toko kami:</h5>
              <p>Pakaian Pria, Pakaian Wanita, Sepatu Pria, Sepatu Wanita, Tas Wanita, Tas Pria, Aksesoris</p>
              <a class="discover_btn" href="#">discover now</a>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="h_carousel_item">
            <img src="../assets/home-carousel/home-c-2.jpg" />
            <div class="carousel_hover">
              <h3>Yuk Belanja</h3>
              <h4>Belanja murah harga terjangkau</h4>
              <h5>category toko kami:</h5>
              <p>Pakaian Pria, Pakaian Wanita, Sepatu Pria, Sepatu Wanita, Tas Wanita, Tas Pria, Aksesoris</p>
              <a class="discover_btn" href="#">discover now</a>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="h_carousel_item">
            <img src="../assets/home-carousel/home-c-3.jpg" />
            <div class="carousel_hover">
              <h3>Yuk Belanja</h3>
              <h4>Belanja murah harga terjangkau</h4>
              <h5>category toko kami:</h5>
              <p>Pakaian Pria, Pakaian Wanita, Sepatu Pria, Sepatu Wanita, Tas Wanita, Tas Pria, Aksesoris</p>
              <a class="discover_btn" href="#">discover now</a>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="h_carousel_item">
            <img src="../assets/home-carousel/home-c-4.jpg" />
            <div class="carousel_hover">
              <h3>Yuk Belanja</h3>
              <h4>Belanja murah harga terjangkau</h4>
              <h5>category toko kami:</h5>
              <p>Pakaian Pria, Pakaian Wanita, Sepatu Pria, Sepatu Wanita, Tas Wanita, Tas Pria, Aksesoris</p>
              <a class="discover_btn" href="#">discover now</a>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="h_carousel_item">
            <img src="../assets/home-carousel/home-c-5.jpg" />
            <div class="carousel_hover">
              <h3>Yuk Belanja</h3>
              <h4>Belanja murah harga terjangkau</h4>
              <h5>category toko kami:</h5>
              <p>Pakaian Pria, Pakaian Wanita, Sepatu Pria, Sepatu Wanita, Tas Wanita, Tas Pria, Aksesoris</p>
              <a class="discover_btn" href="#">discover now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.main_slider_area #main_slider ul li .slider_text_box .secand_text {
  font-family: "Poppins", sans-serif;
  font-weight: 600 !important;
  color: #000;
}

.main_slider_area #main_slider ul li .slider_text_box .third_btn .checkout_btn {
  padding: 0px 40px !important;
  line-height: 48px !important;
  -webkit-transition: all 300ms linear !important;
  -o-transition: all 300ms linear !important;
  transition: all 300ms linear !important;
}

.main_slider_area #fullwidth_slider ul li .slider_text_box .first_text {
  font-weight: 600 !important;
  font-family: "Poppins", sans-serif;
  color: #000;
}

.main_slider_area #fullwidth_slider ul li .slider_text_box .secand_text {
  font-weight: 600 !important;
  font-family: "Poppins", sans-serif;
  color: #012f45;
  text-transform: uppercase;
}

.main_slider_area #fullwidth_slider ul li .slider_text_box .third_text {
  color: #666666;
  font-family: "Poppins", sans-serif;
  font-weight: normal !important;
}

.main_slider_area
  #fullwidth_slider
  ul
  li
  .slider_text_box
  .four_btn
  .checkout_btn {
  padding: 0px 40px !important;
  line-height: 48px !important;
  -webkit-transition: all 300ms linear !important;
  -o-transition: all 300ms linear !important;
  transition: all 300ms linear !important;
}

.main_slider_area #home_box_slider ul li .slider_text_box .first_text {
  font-weight: 600 !important;
  font-family: "Poppins", sans-serif;
  color: #000;
}

.main_slider_area #home_box_slider ul li .slider_text_box .secand_text {
  color: #666666;
  font-family: "Poppins", sans-serif;
  font-weight: normal !important;
}

.main_slider_area
  #home_box_slider
  ul
  li
  .slider_text_box
  .third_btn
  .checkout_btn {
  padding: 0px 40px !important;
  line-height: 48px !important;
  -webkit-transition: all 300ms linear !important;
  -o-transition: all 300ms linear !important;
  transition: all 300ms linear !important;
  background: #000000;
  color: #fff;
  border-color: #000;
}

.main_slider_area
  #home_box_slider
  ul
  li
  .slider_text_box
  .third_btn
  .checkout_btn:hover {
  background: #d91522;
  border-color: #d91522;
}

.home_carousel_slider .h_carousel_item {
  position: relative;
  overflow: hidden;
  z-index: 3;
}

.home_carousel_slider .h_carousel_item img {
  -webkit-transition: all 600ms linear;
  -o-transition: all 600ms linear;
  transition: all 600ms linear;
}

.home_carousel_slider .h_carousel_item:before {
  content: "";
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-transition: all 300ms ease-out;
  -o-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
  z-index: 1;
}

.home_carousel_slider .h_carousel_item .carousel_hover {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  color: #fff;
  z-index: 2;
}

.home_carousel_slider .h_carousel_item .carousel_hover h3 {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition: all 400ms linear;
  -o-transition: all 400ms linear;
  transition: all 400ms linear;
  opacity: 0;
  -webkit-transform: translateY(2rem);
  -ms-transform: translateY(2rem);
  transform: translateY(2rem);
}

.home_carousel_slider .h_carousel_item .carousel_hover h4 {
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  line-height: 30px;
  text-transform: uppercase;
  padding: 20px 0px;
  -webkit-transition: all 650ms linear;
  -o-transition: all 650ms linear;
  transition: all 650ms linear;
  opacity: 0;
  -webkit-transform: translateY(2rem);
  -ms-transform: translateY(2rem);
  transform: translateY(2rem);
}

.home_carousel_slider .h_carousel_item .carousel_hover h5 {
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  color: #b5b5b5;
  -webkit-transition: all 400ms linear;
  -o-transition: all 400ms linear;
  transition: all 400ms linear;
  opacity: 0;
}

.home_carousel_slider .h_carousel_item .carousel_hover p {
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  color: #b5b5b5;
  line-height: 24px;
  padding: 3px 0px 35px 0px;
  -webkit-transition: all 600ms linear;
  -o-transition: all 600ms linear;
  transition: all 600ms linear;
  opacity: 0;
}

.home_carousel_slider .h_carousel_item .carousel_hover .discover_btn {
  opacity: 0;
  -webkit-transform: translateY(2rem);
  -ms-transform: translateY(2rem);
  transform: translateY(2rem);
  -webkit-transition: all 700ms linear;
  -o-transition: all 700ms linear;
  transition: all 700ms linear;
}

.home_carousel_slider .h_carousel_item:hover img {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}

.home_carousel_slider .h_carousel_item:hover:before {
  opacity: 1;
}

.home_carousel_slider .h_carousel_item:hover .carousel_hover h3 {
  opacity: 1;
  -webkit-transform: translateY(0rem);
  -ms-transform: translateY(0rem);
  transform: translateY(0rem);
}

.home_carousel_slider .h_carousel_item:hover .carousel_hover h4 {
  opacity: 1;
  -webkit-transform: translateY(0rem);
  -ms-transform: translateY(0rem);
  transform: translateY(0rem);
}

.home_carousel_slider .h_carousel_item:hover .carousel_hover h5 {
  opacity: 1;
}

.home_carousel_slider .h_carousel_item:hover .carousel_hover p {
  opacity: 1;
}

.home_carousel_slider .h_carousel_item:hover .carousel_hover .discover_btn {
  opacity: 1;
  -webkit-transform: translateY(0rem);
  -ms-transform: translateY(0rem);
  transform: translateY(0rem);
}

.owl-next,
.owl-prev {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 4;
  height: 60px;
  width: 60px;
  border: 2px solid #fff;
  text-align: center;
  line-height: 60px;
  font-size: 36px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.owl-prev {
  left: 0px;
}

.owl-next {
  right: 0px;
}
img {
  max-height: 66.6vh;
  width: 100%;
}
.discover_btn {
  display: inline-block;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0px 20px;
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  line-height: 38px;
  font-family: "Poppins", sans-serif;
  font-weight: normal;
  text-decoration: none;
}
</style>