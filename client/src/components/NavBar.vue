<template>
  <div class="navBar">
        <img @click="homeRoute" src="../assets/shopLogo.png" alt="Shop Logo" id="NavLogo">
      <div class="searchBar">
          <div class="search-wrapper">
            <input type="text" id="searchProd" placeholder="Search Products. . .">
          </div>
      </div>
      <div class="right-button" style="z-index:2;">
          <SignInButton v-if="!$store.state.userInfo"></SignInButton>
          <div v-if="$store.state.loading.userInfo" style="display: flex; justify-content: space-around;" class="pt-3">
              <div>
                  <b-spinner type="grow" label="Spinning"></b-spinner>
              </div>
              <div>
                  <b-spinner type="grow" label="Spinning"></b-spinner>
              </div>
          </div>
          <div v-if="$store.state.userInfo && !$store.state.loading.userInfo" id="afterLoginMenu">
              <div id="cartMenu" v-if="$store.state.userInfo.role !== 'admin'">
                <p href="" style="margin:0;padding:0;" class="mx-3"><i class="fas fa-shopping-cart"></i></p>
            </div>
          <div class="dropdown">
                <button class="dropbtn"><i class="fas fa-user"></i></button>
                <div class="dropdown-content">
                    <h4 style="text-align:center;margin:0;padding:0;">{{$store.state.userInfo.name}}</h4>
                    <a href="#" @click="toShop" style="font-size:1.7em;" v-if="$store.state.userInfo.shopName"><i class="fas fa-store mr-3"></i>{{$store.state.userInfo.shopName}}</a>
                    <div @click="$bvModal.show('registerShop')" v-if="!$store.state.userInfo.shopName && $store.state.userInfo.role !== 'admin'" class="dropMenu my-3 custMenu">
                        <h4><i class="fas fa-plus-circle"></i></h4>
                        <h4>Register Shop</h4>
                    </div>
                    <hr style="border-top:1px solid black;height:0.1vh;">
                    <div v-if="$store.state.userInfo.shopName" class="dropMenu mb-3 custMenu">
                        <h4><i class="fas fa-chart-bar"></i></h4>
                        <h4>Income Statement</h4>
                    </div>
                    <div class="dropMenu mb-3 custMenu" v-if="$store.state.userInfo.role !== 'admin'">
                        <h4><i class="fas fa-money-check-alt"></i></h4>
                        <h4>Purchase History</h4>
                    </div>
                    <div class="dropMenu mb-3 custMenu" @click="toAdmin" v-if="$store.state.userInfo.role == 'admin'">
                        <h4><i class="fas fa-user-shield"></i></h4>
                        <h4>Admin Site</h4>
                    </div>
                    <div class="dropMenu mb-3 custMenu" @click="logout">
                        <h4><i class="fas fa-power-off"></i></h4>
                        <h4>Logout</h4>
                    </div>
                </div>
            </div>
            </div>
      </div>
      <b-modal id="registerShop" centered hide-header hide-footer>
    <h1 style="text-align: center">Shop Registration</h1>
    <form @submit.prevent="registerShop" class="mt-4">
      <label for="shopNameRegist">Enter Shop Name:</label>
      <br>
      <input type="text" id="shopNameRegist" v-model="form.shopName">
      <p style="color: #808080;" class="mt-2">Note: You will not be able to change your shop name in the future</p>
      <b-button type="submit">Register Shop</b-button>
    </form>
  </b-modal>
  </div>
</template>

<script>
import SignInButton from './signInButton'
import Swal from 'sweetalert2'
export default {
  name: 'NavBar',
  components: {
    SignInButton
  },
  data () {
    return {
      form: {
        shopName: ''
      }
    }
  },
  methods: {
    toShop () {
      this.$router.push(`/shop/${this.$store.state.userInfo.id}`)
    },
    registerShop () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('registerShop', {
            shopName: this.form.shopName
          })
          this.form.shopName = ''
        }
      })
    },
    homeRoute () {
      this.$store.dispatch('fetchMainProducts')
      this.$router.push('/Home')
    },
    logout () {
      this.$store.dispatch('logout')
    },
    toAdmin () {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
#shopNameRegist {
  border-radius: 10px;
  width: 80%;
}
.custMenu:hover {
    background: #a8a8a8;
    cursor: pointer;
}
.dropMenu {
    display: flex;
    justify-content: space-around;
}
#cartMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
}
#cartMenu:hover {
    background: #808080;
}
#afterLoginMenu {
    display: flex;
    justify-content: space-around;
}
#searchProd {
    width: 50%;
    padding-top: 0.4%;
    padding-bottom: 0.4%;
    padding-left: 0.6%;
    border-radius: 7px;
    border: none;
    background: #dfdfdf93;
}
.search-wrapper {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.searchBar {
    flex-grow: 1;
    align-self: center;
}
.right-button {
    display: flex;
    justify-content: space-evenly;
    margin-right: 2%;
    height: 100%;
}
.navBar {
    height: 6vh;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    padding-right: 1%;
    align-items: center;
    box-shadow: 0px 4px 24px -6px #c1c1c1;
}
#NavLogo {
    height: 100%;
    margin-left: 1%;
    cursor: pointer;
}
.dropbtn {
  width: 125%;
  height: 100%;
  color: rgb(31, 31, 31);
  padding: 16px;
  font-size: 100%;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
  height: 100%;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: -30%;
  background-color: #f9f9f9;
  width: 16vw;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding-top: 50%;
  border-radius: 0 0 15px 15px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
  transition: 1s;
}

.dropdown:hover .dropbtn {
  background-color: #808080;
}
</style>
