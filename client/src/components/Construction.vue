<template>

<div class="text-center bgimg full-height">
  <div>
    <h1>COMING SOON</h1>
    <hr>
    <p>temporary just available for admin</p>
    <p>open for members at : 29 Feb 2020</p>
    <button @click="toLogin">back to login</button>
  </div>
</div>

</template>

<script>
export default {
  methods: {
    toLogin() {
      localStorage.clear()
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
.bgimg {
  padding: 20px;
  background-image: url('../../public/images/bg-mt.jpeg');
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
  font-family: "Courier New", Courier, monospace;
  font-size: 25px;
}
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
hr {
  margin: auto;
  width: 40%;
}
</style>