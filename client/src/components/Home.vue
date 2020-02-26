<template>
  <div>
    <AllContent></AllContent>
  </div>
</template>
<script>
import axios from "axios";
import Menu from "./menu.vue";
import AllContent from "./allcontent.vue";
export default {
  components: { Menu, AllContent },
  methods: {
    getAllData() {
      return this.$store.state.products;
    },
    addcart(id) {
      axios({
        method: "POST",
        url: `http://localhost:3000/carts/${id}`,
        data: { quantity: 1 },
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          this.$Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "One Item per Customer"
          });
        });
    }
  },
  created() {
    this.$store.dispatch("getAllCarts");
    this.$store.dispatch("getAllProduct");
  }
};
</script>
<style scoped>
.box {
  margin-top: 50px;
}
.button {
  color: rgb(182, 174, 174);
}
.inhalt {
  min-height: 350px;
}
.kiste {
  margin-bottom: 15px;
}
.card-img-top {
  height: 220px;
}
</style>