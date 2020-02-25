<template>
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active ml-5">
              <router-link to='/' style="text-decoration:none;">
                <a class="nav-link">Home</a>
              </router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="">How To Buy</a>
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#">Bike-Commerce</a>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to='/cart'>
                  <b-button pill variant="outline-light" class="mr-2">Cart</b-button>
              </router-link>
             <b-button pill variant="outline-secondary" class="mr-2">Logout</b-button>
             <b-button pill variant="primary" class="mr-2">Login</b-button>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

export default {
  name: 'userNavbar'
}
</script>

<style>

</style>
