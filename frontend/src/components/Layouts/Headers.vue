<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
      <b-navbar-brand to="/" class="logo-bold">NIKE STORE</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown class="ml-3 mr-3" text="Kategori" left>
            <b-dropdown-item href="#">Sneakers</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-form class="header-search">
            <b-form-input size="sm" class="mr-1 search" placeholder="Cari barang"></b-form-input>
            <b-button size="sm" variant="dark" class="my-2 my-sm-0" type="submit">Cari</b-button>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto right-nav">
          <b-nav-item href="#">
            <span><i class="fa fa-shopping-cart"></i>&nbsp;Cart</span>
          </b-nav-item>
          <b-nav-form class="ml-3">
            <b-button size="sm" class="mr-2" variant="dark">Sign Up</b-button>
            <b-button size="sm" variant="outline-dark">Login</b-button>
          </b-nav-form>
          <b-nav-item-dropdown class="ml-3" right>
            <template v-slot:button-content>
              <span>Muhammad Anova</span>
            </template>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>