<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link :to="{name:'Home'}" class="navbar-brand" href="#">Home</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link :to="{name:'Cart'}" class="nav-link" href="#">
                Cart
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">number</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,idx) in carts" :key="idx">
            <th scope="row">{{idx}}</th>
            <td>
              <img class="bild" :src="data.image_url" />
            </td>
            <td>{{data.name}}</td>
            <td>{{data.price}}</td>
            <td>{{data.Cart.quantity}}</td>
            <td>
              <i
                @click="deleteCart(data.id,data.Cart.ProductId, data.Cart.UserId)"
                class="fas fa-trash-alt but"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button @click="checkout" type="button" class="btn btn-primary btn-lg">Check Out</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      carts: null
    };
  },
  methods: {
    getAllData() {
      axios({
        method: "GET",
        url: `http://localhost:3000/carts`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          this.carts = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCart(id, userid, productid) {
      this.$Swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            axios({
              method: "DELETE",
              url: `http://localhost:3000/carts/${id}`,
              data: {
                UserId: userid,
                ProductId: productid
              },
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(res => {
                this.getAllData();
              })
              .catch(error => {
                console.log(error);
              });
            this.$Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    },
    checkout() {
      axios({
        method: "DELETE",
        url: "http://localhost:3000/carts/checkout",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(response => {
        this.$Swal.fire("Good job!", "You clicked the button!", "success");
        this.$router.push({ name: "Home" });
      });
    }
  },
  created() {
    this.getAllData();
  }
};
</script>
<style scoped>
.bild {
  height: 40px;
}
.but {
  cursor: pointer;
}
</style>