<template>
    <nav class="fixed-top d-flex justify-content-between
    navbar navbar-expand-md p-1 navbar-dark bg-dark">
        <div class="logo">
          <router-link to="/admin/" class="navbar-brand">Logo</router-link>
        </div>
        <div>
          <ul class="navbar-nav mr-right mr-md-3">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown04"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acoount</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
                <a class="dropdown-item" href="#">Profile</a>
                <!-- <a class="dropdown-item" href="#">Logout</a> -->
                <router-link to="/admin/login" class="dropdown-item">Logout</router-link>
              </div>
            </li>
          </ul>
        </div>
    </nav>
</template>

<script>
export default {

};
</script>

<style>

</style>
