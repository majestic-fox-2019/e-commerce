<template>
  <!-- eslint-disable max-len -->
  <div>
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :color="'#d47a90'"
        :loader="'dots'"
        :width="100"
      ></loading>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white justify-content-center fixed-top">
      <a class="navbar-brand">
        <router-link to="/" class="home">Face UP</router-link>
        <i class="fas fa-angle-double-up"></i>
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-link serif">Fulfill your needs</li>
        </ul>
        <div class="cartlogin" v-if="isLogin == false">
          <div>
            <router-link to="/login">
              <p class="cart">
                <i class="fas fa-cart-plus"></i>
                MY CART (0)
              </p>
            </router-link>
          </div>
          <div>
            <router-link to="/login" class="serif btn btn-outline-danger btn-sm">
              <i class="fas fa-sign-in-alt"></i>LOGIN
            </router-link>
          </div>
        </div>
        <div v-else class="cartlogin">
          <div>
            <router-link to="/carts">
              <p class="cart">
                <i class="fas fa-cart-plus"></i>
                MY CART ({{getAmount}})
              </p>
            </router-link>
          </div>
          <div>
            <button class="serif btn btn-outline-danger btn-sm" @click="logout">
              LOGOUT
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      amounts: null,
      isLogin: false,
      isLoading: false,
    };
  },
  mounted() {
    this.$store.dispatch('userCarts');
    this.login();
  },
  computed: {
    token() {
      return localStorage.token;
    },
    getAmount() {
      const { carts } = this.$store.state;
      let amounts = 0;
      if (carts) {
        carts.forEach((amount) => {
          amounts += amount.UserProduct.amount;
        });
        this.amounts = amounts;
        // this.$store.dispatch("userCarts");
      }
      return this.amounts;
    },
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          title: 'Log out of Face UP?',
          text: 'You can always log back in at anytime',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#e79796',
          cancelButtonColor: '#ffc988',
          confirmButtonText: 'Log out',
        })
        .then((result) => {
          this.isLogin = false;
          if (result.value) {
            this.isLoading = true;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
          } else {
            this.isLoading = false;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.response, '< err navbar logout');
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data.message,
            icon: 'question',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    login() {
      if (!localStorage.token) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
  },

  watch: {
    isLogin() {
      this.login();
    },
  },
};
</script>

<style scoped>
* {
  color: #f0908a;
}
.cart {
  margin-right: 10px;
  font-family: "Montserrat";
  font-size: 14px;
  cursor: pointer;
}
.cartlogin {
  display: flex;
}
.home {
  cursor: pointer;
  font-family: "Dancing Script";
  font-size: 26px;
  letter-spacing: 2px;
  margin-right: 4px;
}
.serif {
  font-family: "Montserrat";
  letter-spacing: 2px;
}
</style>
