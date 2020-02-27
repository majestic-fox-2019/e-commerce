<template>
  <div>
    <div class="container">
      <h5>Bootstrap 4 Equal Height Cards using Grid</h5>
      <div class="row">
        <div class="col-sm-4 py-2">
          <div class="card card-body h-100">Card. I'm just a simple card-block.</div>
        </div>
        <div class="col-sm-4 py-2">
          <div class="card h-100 text-white bg-danger">
            <div class="card-body">
              <h3
                class="card-title"
              >Danger rgdfgsdfgdgfsdgfsfdgsdfgsdgsdfgsdgsdfgsdfgsdfgsdfgsdfgsdgdfg</h3>
              <p
                class="card-text"
              >With ljjlkasfj;lkajsd;alkfjd;aslkfja;slfkjas;dlfakjsd;flaksjdf;alskdjfa;sldkfja;sdlfkajs;dflkajsdfdsdfasfsdasdfasdfasdfasdfasfasfafdsffasdfasdfasdfasfasfasfsfaff;alksfjda;sldfkj;lj supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-outline-light">Outline</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- hmmmmm -->
    <div class="allcards">
      {{checkLogin()}}
      <div class="card h-100" style="width: 15rem;" v-for="card in cards" :key="card.id">
        <img class="card-img-top" :src="[card.image ? card.image : image]" />
        <div class="card-body" v-if="isAdmin">
          <h5>{{card.name}}</h5>
          <button
            class="btn btn-outline-secondary btn-sm"
            @click="showProducts(card.name)"
          >Show All Products</button>
          <button
            class="btn btn-outline-danger btn-sm"
            @click="deleteProduct(card.id, card.name)"
          >Delete</button>
        </div>

        <div v-if="!isAdmin">
          <div class="card-body">
            <router-link :to="{name: 'oneProduct', params: {id: card.id}}">
              <h6>{{card.name}}</h6>
            </router-link>
            <p>Rp. {{card.price}}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="addCart(card.id)"
                v-if="card.stock"
              >
                <i class="fas fa-cart-plus fa-lg"></i>Add to cart
              </button>
              <button class="btn btn-outline-danger btn-sm" v-else>Out of stock</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>