<template>
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-10 col-sm-offset-1 text-center" style="max-width: 86%;">
            <div class="four_zero_four_bg">
              <h1 class="text-center">404</h1>
            </div>

            <div class="contant_box_404">
              <h3 class="h2">Look like you're lost</h3>

              <p>the page you are looking for not avaible!</p>

              <button @click="goHome" class="link_404">Go to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goHome() {
      if (localStorage.getItem("role") === "admin") {
        this.$router.push("/seller");
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-left: 125px;
}
.page_404 {
  padding: 34px 0;
  background: #fff;
  font-family: "Arvo", serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #ee4d2d;
  margin: 20px 0;
  display: inline-block;
  outline: none;
}
.contant_box_404 {
  margin-top: -50px;
}
</style>