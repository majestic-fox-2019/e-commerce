<template>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <nav class=" d-flex justify-content-between navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <!-- <a class="navbar-brand" href="#">Logos</a> -->
          <router-link to="/" class="navbar-brand">Logo</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarsExample04" aria-controls="navbarsExample04"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarsExample04">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="#" class="nav-link">#</router-link>
            </li>
          </ul>

        </div>
        <div >
          <form class="form-inline my-2 my-md-1" >
            <input class="form-control" type="text" placeholder="Search">
          </form>
        </div>
        <div>
          <ul class="navbar-nav mr-right mr-md-3">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown04"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acoount</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
                <a class="dropdown-item" href="#">Profile</a>
                <!-- <a class="dropdown-item" href="#">Logout</a> -->
                <router-link to="/login" class="dropdown-item">Logout</router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
};

</script>

<style>

</style>
