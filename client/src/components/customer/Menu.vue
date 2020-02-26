<template>
  <div id="menu-body">
    <div id="menu-inner-body">
      <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpronto-cdn.prontodenim.com%2F353%2Fwp-content%2Fuploads%2Fsites%2F2%2F2013%2F02%2Fcover_deus.jpg&f=1&nofb=1"
              class="d-block w-100"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>New DEUS Thailand Version</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpronto-cdn.prontodenim.com%2F353%2Fwp-content%2Fuploads%2Fsites%2F2%2F2013%2F05%2F001.jpg&f=1&nofb=1"
              class="d-block w-100"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>New Look DEUS</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0220%2F0998%2Fproducts%2Fwhiskey2_1024x1024.jpg%3Fv%3D1520915829&f=1&nofb=1"
              class="d-block w-100"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>couple hat</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <!-- Content Item  -->

      <div id="content-item">
        <!-- content per item -->
        <div class="box-card" v-for="item in itemBarang" :key="item.id">
          <!-- {{itemBarang}} -->
          <div class="card">
            <img :src="item.image_url" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{{item.name}}</h5>
              <p class="card-text">Stock : {{item.stock}}</p>
              <p class="card-text">{{idr(item.price)}}</p>
              <button type="button" class="btn btn-secondary" @click="addCart(item.id)">
                <i class="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- en content per item -->
      </div>
    </div>
  </div>
</template>

<script>
import rupiah from "../helper/idr";
import jwt from "jsonwebtoken";
import axios from "axios";
import Swal from "sweetalert2";
const server = `http://localhost:3000`;

export default {
  props: ["category"],
  data() {
    return {};
  },
  computed: {
    itemBarang() {
      let kategoriId = null;
      if (this.category == "celana") {
        kategoriId = 1;
      } else if (this.category == "jaket") {
        kategoriId = 2;
      } else if (this.category == "baju") {
        kategoriId = 3;
      } else if (this.category == "sepatu") {
        kategoriId = 4;
      }

      let arr = this.$store.state.items;
      if (this.category == "all") {
        return arr;
      } else {
        return arr.filter(el => el.CategoryId == kategoriId);
      }
    }
  },
  created() {
    this.$store.dispatch("getAllItem");
  },

  methods: {
    idr(value) {
      return rupiah(value);
    },
    addCart(id) {
      let token = localStorage.getItem("token");
      const user = token ? jwt.verify(token, "edo tensi") : null;
      // console.log(user.role, "<<<<<<<<<<< role");
      if (localStorage.token) {
        axios({
          method: "post",
          url: `${server}/cart`,
          data: {
            ProductId: id,
            UserId: user.id,
            qty: 1
          },
          headers: { token: localStorage.token }
        })
          .then(result => {
            this.$router.push({ path: "/cart" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("belum login atau register");

        Swal.fire({
          title: "Anda Belum Login?",
          text: "Silahkan Login",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#000",
          cancelButtonColor: "#2f3640",
          confirmButtonText: "Yup saya Login!"
        }).then(result => {
          if (result.value) {
            // Swal.fire("Deleted!", "Your file has been deleted.", "success");
            this.$router.push({ path: "/Login" });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#menu-body {
  /* margin-top: 2em; */
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#menu-inner-body {
  width: 90em;
  /* border: 1px solid black; */
}
.carousel-item {
  max-height: 15em;
}
.carousel-item img {
  background-repeat: no-repeat;
  background-size: auto;
}

#content-item {
  /* border: 1px solid blue; */
  width: 100%;
  padding: 2em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.card {
  margin: 0;
  border: none;
}
.card img {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding-bottom: 1em;
}
.box-card {
  /* border: 1px solid pink; */
  margin: 1em;
  width: 15em;
}
.box-card:hover {
  /* border: 1px solid pink; */
  background-color: rgba(0, 0, 0, 0.125);
}

.card-img,
.card-img-bottom,
.card-img-top {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 20em;
  object-fit: cover;
}
</style>