<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <img src="../assets/home-carousel/home-c-1.jpg" alt srcset />
            </div>
            <div class="col">
              <section class="product_details_area">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div class="product_details_text">
                        <h3>Nike Flex Run Tracksuit</h3>
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
                        <h4>Rp. 10000</h4>
                        <p>
                          Curabitur semper varius lectus sed consequat. Nam accumsan dapibus sem, sed lobortis nisi
                          porta vitae. Ut quam tortor, facilisis nec laoreet consequat, malesuada a massa. Proin
                          pretium tristique leo et imperdiet.
                        </p>
                        <div class="p_color">
                          <h4 class="p_d_title">
                            size
                            <span>*</span>
                          </h4>
                          <select class="select-css">
                            <option>Select your size</option>
                            <option>Select your size M</option>
                            <option>Select your size XL</option>
                          </select>
                        </div>
                        <div class="quantity">
                          <div class="custom">
                            <button class="reduced items-count" type="button">
                              <i class="icon_minus-06"></i>
                            </button>
                            <input
                              type="text"
                              name="qty"
                              id="sst"
                              maxlength="12"
                              value="1"
                              title="Quantity:"
                              class="input-text qty"
                            />
                            <button class="increase items-count" type="button">
                              <i class="icon_plus"></i>
                            </button>
                          </div>
                          <button class="add_cart_btn" href="#">add to cart</button>
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 7px 10px rgba(128, 128, 128, 0.57);
  background: #ffffff;
}
.card:hover {
  box-shadow: 0 7px 10px rgba(22, 21, 21, 0.57);
}
img {
  max-height: 73vh;
  transition: transform 1s, filter 2s ease-in-out;
  filter: blur(2px);
  transform: scale(1);
}
img:hover {
  max-height: 74vh;
  filter: blur(0);
  transform: scale(1);
}
.product_details_slider .tp-thumbs {
  margin-top: 18px;
}

.product_details_slider
  .tp-thumbs
  .tp-thumb-mask
  .tp-thumbs-inner-wrapper
  .tp-thumb
  .tp-thumb-over {
  background: transparent;
}

.product_details_slider
  .tp-thumbs
  .tp-thumb-mask
  .tp-thumbs-inner-wrapper
  .tp-thumb
  .tp-thumb-title {
  padding: 0px;
}

.product_details_slider
  .tp-thumbs
  .tp-thumb-mask
  .tp-thumbs-inner-wrapper
  .tp-thumb.selected
  .tp-thumb-over {
  background: transparent;
  border: 1px solid #000;
}

.product_details_slider #product_slider2 .tp-thumbs {
  margin-top: 0px;
  padding-right: 20px !important;
}

.product_details_slider
  #product_slider2
  .tp-thumbs
  .tp-thumbs-inner-wrapper
  .tp-thumb
  .tp-thumb-img-wrap {
  background: transparent;
  padding: 0px;
  border: 1px solid transparent;
}

.product_details_slider
  #product_slider2
  .tp-thumbs
  .tp-thumbs-inner-wrapper
  .tp-thumb
  .tp-thumb-img-wrap
  .tp-thumb-image {
  padding: 0px;
}

.product_details_slider
  #product_slider2
  .tp-thumbs
  .tp-thumbs-inner-wrapper
  .tp-thumb.selected
  .tp-thumb-img-wrap {
  border: 1px solid #000;
}

.product_details_text {
  max-width: 570px;
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

.shareing_icon h5 {
  display: inline-block;
  font-size: 13px;
  font-weight: bold;
  color: #666666;
  letter-spacing: 0.325px;
  text-transform: uppercase;
  font-family: "Lato", sans-serif;
}

.shareing_icon ul {
  display: inline-block;
  padding-left: 10px;
}

.shareing_icon ul li {
  display: inline-block;
  margin-right: 13px;
}

.shareing_icon ul li a {
  font-size: 14px;
  color: #999999;
  -webkit-transition: all 400ms linear 0s;
  -o-transition: all 400ms linear 0s;
  transition: all 400ms linear 0s;
}

.shareing_icon ul li:last-child {
  margin-right: 0px;
}

.shareing_icon ul li:hover a {
  color: #000;
}

.product_description_area {
  padding-top: 60px;
}

.product_description_area .tab_menu .nav-tabs a {
  padding: 0px;
  border: none;
  padding-right: 25px;
  border-bottom: 1px solid #cccccc;
  font-size: 16px;
  color: #cccccc;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  line-height: 50px;
}

.product_description_area .tab_menu .nav-tabs a.active {
  color: #000;
  border-bottom: 1px solid #000;
}

.product_description_area .tab-content {
  padding: 35px 0px;
}

.product_description_area .tab-content p {
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  line-height: 26px;
  color: #666666;
  letter-spacing: 0.35px;
}

.product_description_area .tab-content h4 {
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  color: #000;
  padding-bottom: 15px;
}

.product_description_area .tab-content ul li {
  display: inline-block;
}

.product_description_area .tab-content ul li a {
  color: #efb504;
  font-size: 15px;
}

.related_product_area {
  padding-top: 20px;
  padding-bottom: 80px;
}

.related_product_inner .single_c_title {
  padding-bottom: 45px;
  text-transform: uppercase;
}

.related_product_inner .pagination_area {
  margin-top: 30px;
}

.product_table_details {
  max-width: 535px;
  padding-top: 25px;
}

.product_table_details .table tr {
  padding-bottom: 15px;
  display: block;
}

.product_table_details .table tr th {
  padding: 0px;
  width: 120px;
  font-size: 14px;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  border: none;
}

.product_table_details .table tr td {
  border: none;
  padding: 0px;
}

.product_table_details .table tr td h6 {
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  line-height: 20px;
  color: #333333;
  padding-bottom: 8px;
}

.product_table_details .table tr td h5 {
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  color: #000000;
  padding-bottom: 5px;
}

.product_table_details .table tr td p {
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  color: #666666;
  line-height: 20px;
}

.product_table_details .table tr td p span {
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.product_table_details .table tr td img {
  padding-bottom: 5px;
}

.product_table_details .table tr:first-child p {
  padding-bottom: 5px;
}
.select-css {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.select-css::-ms-expand {
  display: none;
}
.select-css:hover {
  border-color: #888;
}
.select-css:focus {
  border-color: #aaa;
  color: #222;
  outline: none;
}
.select-css option {
  font-weight: normal;
}
</style>