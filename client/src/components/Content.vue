<template>
  <div>
    <!-- Banner -->
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Pricing</h1>
      <p class="lead">
        Quickly build an effective pricing table for your potential customers with this Bootstrap
        example. It’s built with default Bootstrap components and utilities with little
        customization.
      </p>
    </div>
    <!-- Content -->
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mb-4">
          <div class="card h-100">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <svg class="bd-placeholder-img card-img-top" width="100%" height="180"
             xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
              focusable="false" role="img" aria-label="Placeholder: Image cap">
              <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
              <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
            <div class="card-body">
              <h5 class="card-title"><router-link to="/detail_product">Card title</router-link></h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.
              </p>
              <button type="button" class="btn btn-primary">Add Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Content',
  components: {},
};
</script>

<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
.mb-4{
  flex: 0 0 25%;
  max-width: 25%;
}

</style>
