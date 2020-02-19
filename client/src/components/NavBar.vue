<template>
  <div class="navBar">
        <img src="../assets/shopLogo.png" alt="Shop Logo" id="NavLogo">
      <div class="searchBar">
          <div class="search-wrapper">
            <input type="text" id="searchProd" placeholder="Search Products. . .">
          </div>
      </div>
      <div class="right-button" style="z-index:2;">
          <b-button v-if="!$store.state.userInfo">login</b-button>
          <div id="afterLoginMenu">
              <div id="cartMenu">
                <p href="" style="margin:0;padding:0;" class="mx-3"><i class="fas fa-shopping-cart"></i></p>
            </div>
          <div class="dropdown">
                <button class="dropbtn"><i class="fas fa-user"></i></button>
                <div class="dropdown-content">
                    <p style="font-size:1em;text-align:center;margin:0;padding:0;" v-if="$store.state.userInfo">USER NAME</p>
                    <a href="#" style="font-size:1.7em;" v-if="$store.state.userInfo"><i class="fas fa-store"></i> SHOP NAME</a>
                    <hr style="border-top:1px solid black;height:0.1vh;" v-if="$store.state.userInfo">
                    <div class="dropMenu mb-3">
                        <h4><i class="fas fa-chart-bar"></i></h4>
                        <h4>Income Statement</h4>
                    </div>
                    <div class="dropMenu mb-3" v-if="$store.state.userInfo.role !== 'admin'">
                        <h4><i class="fas fa-money-check-alt"></i></h4>
                        <h4>Purchase History</h4>
                    </div>
                    <div class="dropMenu mb-3" v-if="$store.state.userInfo.role == 'admin'">
                        <h4><i class="fas fa-user-shield"></i></h4>
                        <h4>Admin Site</h4>
                    </div>
                </div>
            </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
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
