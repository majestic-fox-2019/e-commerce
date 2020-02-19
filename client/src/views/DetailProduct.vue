<template>
  <div>
    <!-- Content -->
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3">
        <div class="col mb-4">
          <div class="card h-100">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <svg class="bd-placeholder-img card-img-top" width="100%" height="100%"
             xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
              focusable="false" role="img" aria-label="Placeholder: Image cap">
              <title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect>
              <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
          </div>
        </div>
        <!-- <div class="col text-left">
            <ul>
                <li>Nama</li>
                <li>Harga</li>
                <li>Stock</li>
                <li>Nama</li>
            </ul>
        </div> -->
                <div class="col mb-4">
          <div class="card h-100">
            <div class="card-body d-flex align-items-end flex-column
             bd-highlight mb-3 align-items-sm-center">
                <div class="p-2 bd-highlight ">
                    <h5 class="card-title">Card title</h5>
                </div>
                <div class="p-2 bd-highlight text-left">
                    <p class="card-text d-flex align-items-end flex-column bd-highlight mb-3">
                        This is a longer card with supporting text below as a natural lead-in to
                         additional content. This content is a little bit longer.
                    </p>
                </div>
              <div class="mt-auto p-2 bd-highlight">
                <button type="button" class="btn btn-primary">Add Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailProduct',
  components: {},
};
</script>

<style scoped>
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
  flex: 0 0 50%;
  max-width: 500vh;
  height: 70vh;
}
.container{
    margin: 5%
}
</style>
