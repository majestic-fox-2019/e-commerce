<template>
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Left</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="//codeply.com">Codeply</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
        </ul>
    </div>
    <div class="mx-auto order-0">
        <a class="navbar-brand mx-auto" href="#">Navbar 2</a>
        <button class="navbar-toggler" type="button"
        data-toggle="collapse" data-target=".dual-collapse2">
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
             <button type="button" @click="logout" class="btn btn-primary btn-sm">Log Out</button>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
    },
  },
};

</script>


<style>

</style>
