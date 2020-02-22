<template>
  <div class="row">
    <div class="col-6 offset-md-3 box">
      <div class="jumbotron">
        <h1 class="display-4">Hallo</h1>
        <p class="lead">click here to login</p>
        <p class="lead">
          <router-link
            :to="{name:'EditContent'}"
            class="btn btn-primary btn-lg"
            href="#"
            role="button"
          >Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.box {
  margin-top: 200px;
}
.button {
  color: black;
}
</style>