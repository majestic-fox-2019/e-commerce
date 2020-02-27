<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky text-left">
        <h6 class="sidebar-heading d-flex justify-content-between
         align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Product Menus</span>
        </h6>
        <hr>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/admin/productadd" class="nav-link">Add Product</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/product" class="nav-link">List Product</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'SideNav',
};
</script>

<style>

</style>
