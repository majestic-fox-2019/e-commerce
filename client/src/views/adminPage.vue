<template>
  <!-- eslint-disable max-len -->
  <div>
    <nav class="main-menu">
      <p>
        Face UP
        <i class="fas fa-angle-double-up"></i>
      </p>
      <ul>
        <router-link class="link" :to="{ name: 'productTable' }">
          <li>
            <a>
              <i class="fa fa-home fa-2x"></i>
              <span class="nav-text">All Products</span>
            </a>
          </li>
        </router-link>
        <li class="link" data-toggle="modal" data-target="#addProduct">
          <a>
            <i class="fa fa-plus fa-2x"></i>
            <span class="nav-text">Add Products</span>
          </a>
        </li>
        <router-link class="link" to="/categories">
          <li class="has-subnav">
            <a>
              <i class="fab fa-gratipay fa-2x"></i>
              <span class="nav-text">Categories</span>
            </a>
          </li>
        </router-link>
        <li class="link" data-toggle="modal" data-target="#addCategory">
          <a>
            <i class="fa fa-plus fa-2x"></i>
            <span class="nav-text">Add Category</span>
          </a>
        </li>
      </ul>
      <ul class="logout" @click="logout">
        <li>
          <a href="#">
            <i class="fa fa-power-off fa-2x"></i>
            <span class="nav-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
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
          if (result.value) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            this.$router.push({ name: 'home' });
          }
        })
        .catch((err) => {
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: 'question',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  },
};
</script>

<style>
@import url(//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);
@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);

p {
  color: white;
  font-family: "Dancing Script";
  font-size: 23px;
  text-align: center;
  margin-top: 5px;
}
.link {
  color: white;
  cursor: pointer;
}
.fa-2x {
  font-size: 2em;
  color: white;
}
.fa {
  position: relative;
  display: table-cell;
  width: 140px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
}
.fab {
  position: relative;
  display: table-cell;
  width: 140px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
}
.main-menu:hover,
nav.main-menu.expanded {
  width: 250px;
  overflow: visible;
}

.main-menu {
  background: #e79796;
  border-right: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  left: 0;
  width: 100px;
  overflow: hidden;
  -webkit-transition: width 0.05s linear;
  transition: width 0.05s linear;
  -webkit-transform: translateZ(0) scale(1, 1);
  z-index: 1000;
}

.main-menu > ul {
  margin: 7px 0;
}

.main-menu li {
  position: relative;
  display: block;
  width: 250px;
}

.main-menu li > a {
  position: relative;
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  color: #999;
  font-family: arial;
  font-size: 14px;
  text-decoration: none;
  -webkit-transform: translateZ(0) scale(1, 1);
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;
}

.main-menu .nav-icon {
  position: relative;
  display: table-cell;
  width: 60px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
}

.main-menu .nav-text {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  width: 190px;
  font-family: "Titillium Web", sans-serif;
  font-size: 16px;
}

.main-menu > ul.logout {
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
}

.no-touch .scrollable.hover {
  overflow-y: hidden;
}

.no-touch .scrollable.hover:hover {
  overflow-y: auto;
  overflow: visible;
}

a:hover,
a:focus {
  text-decoration: none;
}

nav {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

nav ul,
nav li {
  outline: 0;
  margin: 0;
  padding: 0;
}
.main-menu li:hover > a,
nav .main-menu li.active > a,
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus,
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus,
.no-touch .dashboard-page nav .dashboard-menu ul li:hover a,
.dashboard-page nav .dashboard-menu ul li.active a {
  color: #fff;
  background-color: #858585;
}
.area {
  float: left;
  background: #e2e2e2;
  width: 100%;
  height: 100%;
}
@font-face {
  font-family: "Titillium Web";
  font-style: normal;
  font-weight: 300;
  src: local("Titillium WebLight"), local("TitilliumWeb-Light"),
    url(http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff)
      format("woff");
}
</style>
