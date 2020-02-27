<template>
  <div class="home">
    <b-jumbotron
      header="Products Page"
      fluid
    >
    </b-jumbotron>
    <b-container :fluid="true">
      <router-view />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";

export default {
  name: "Products",
  created() {}
};
</script>
