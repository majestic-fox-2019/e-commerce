<template>
  <b-row class="justify-content-center pt-5" id="CatCards">
      <div id="HomeCard" @click="toHome('Home')">
          <div id="title" class="homeMenu">
              <h3 style="margin:0;padding:0;">Home</h3>
          </div>
          <div id="logo" class="homeMenu">
              <h3 style="margin:0;padding:0;"><i class="fas fa-home"></i></h3>
          </div>
      </div>
      <div v-for="(category, i) in $store.state.categories" :key="i" @click="toHome(`${category.name}`)" class="CategoryCards my-3">
          <div id="title" class="CatMenu">
              <h3 style="margin:0;padding:0;text-align:left;">{{category.name}}</h3>
          </div>
          <div id="logo" class="CatMenu">
              <img :src="category.img" alt="none" class="catImg">
          </div>
      </div>
  </b-row>
</template>

<script>
export default {
  name: 'CategoryCard',
  methods: {
    toHome (target) {
      if (target === 'Home') {
        this.$store.dispatch('fetchMainProducts')
      } else {
        this.$store.dispatch('fetchProductByCategory', target)
      }
      this.$router.push(`/${target}`)
    }
  }
}
</script>

<style scoped>
#CatCards {
    overflow: scroll;
    height: 100%;
}
.CategoryCards {
    height: 15vh;
    width: 90%;
    background: #f5f5f5;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
    cursor: pointer;
    box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);
}
#HomeCard {
    height: 6vh;
    width: 90%;
    background: #f5f5f5;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    padding-left: 6%;
    padding-right: 6%;
    cursor: pointer;
    box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);
}

.homeMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.catImg {
    object-fit: cover;
    height: 85%;
    width: 70%;
    margin-left: 20%;
}
.CatMenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    flex-wrap: wrap;
}
</style>
