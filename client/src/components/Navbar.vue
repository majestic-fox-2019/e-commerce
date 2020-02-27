<template>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <nav class=" d-flex justify-content-between navbar navbar-expand-md navbar-dark bg-dark">
        <div>
          <!-- <a class="navbar-brand" href="#">Logos</a> -->
          <router-link to="/" class="navbar-brand">
          <img src="../assets/image/logo-sm.png" style="width: 3vw"/></router-link>
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
          </ul>

        </div>
        <div class="glyphicon glyphicon-shopping-cart mx-2">
          <router-link :to="`/carts`"
          class="d-flex justify-content-end align-items-center">
            <div class="mx-2">
              <span>Carts</span>
              <!-- <b-icon-archive>
              </b-icon-archive> -->
            </div>
            <div>
              <!-- <b-alert show variant="primary" class="sm-show"> -->
                {{totalCart}}
              <!-- </b-alert> -->
            </div>
          </router-link>
          <!-- <form class="form-inline my-2 my-md-1" >
            <input class="form-control" type="text" placeholder="Search">
          </form> -->
        </div>
        <div>
          <ul class="navbar-nav mr-right mr-md-3">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown04"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acoount</a>
              <div class="dropdown-menu" aria-labelledby="dropdown04">
                <a class="dropdown-item" href="#">Profile</a>
                <button @click.prevent="logout" to="/login" class="dropdown-item">
                Logout</button>
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
  data() {
    return {
      totalCart: 0,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    allCart() {
      return this.$store.state.allCarts;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getAllCarts');
  },
  watch: {
    allCart() {
      this.totalCart = this.allCart.length;
    },
  },
};

</script>

<style>

</style>
