<template>
  <div class="row d-flex justify-content-center">
    <b-card
      v-for="el in data"
      :key="el.id"
      :title="el.name"
      :img-src="el.imageurl"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width:20em;"
      class="mb-2 mx-1 col-md-4">
              <b-card-text style="color:grey">{{formater(el.price)}}</b-card-text>
          <b-card-body>
            <div class="button">
              <b-button variant="dark" class="mr-1"
                @click="addtocart(el)">
                <i class="fa fa-cart-plus mr" style="font-size:19px;color:white"></i>
              </b-button>
              <b-button
                @click="selecDetail(el)"
                v-b-modal.modal-1>
                Detail
              </b-button>
        </div>
      </b-card-body>
    </b-card>
    <b-modal id="modal-1" title="ITEM DETAIL">
        <div class="d-flex align-items-start flex-column">
          <img :src="selected.imageurl" alt height="300px" />
          <h2>{{selected.name}}</h2>
          <h4>{{formater(selected.price)}}</h4>
          <p>{{selected.description}}</p>
        </div>
    </b-modal>
    <div>
      <div>
        <b-modal v-model="modalShow" id="modal-center" hide-footer centered title="Please Login!">
          <div class="d-flex flex-column">
            <P>you must login first to add this item to your cart</P>
              <b-button size="sm" @click="tologin" variant="secondary">
                LOGIN
              </b-button>
          </div>
      </b-modal>
      <b-modal v-model="modalCart" id="modal-center" hide-footer centered title="Add to your cart">
          <div class="d-flex flex-column">
              <cardSide @close-modal="modalCart = !modalCart" :data="selected"></cardSide>
           </div>
      </b-modal>
  </div>
  <!-- <b-modal v-model="modalShow" id="modal-center" centered title="BootstrapVue">
  </b-modal> -->
</div>
  </div>
</template>

<script>
import cardSide from '@/components/cardSide.vue'

export default {
  props: ['data'],
  components: {
    cardSide
  },
  data () {
    return {
      selected: {},
      modalShow: false,
      modalCart: false
    }
  },
  name: 'cardUser',
  methods: {
    selecDetail (data) {
      this.selected = data
    },
    formater (price) {
      const data = `Rp. ${new Intl.NumberFormat().format(price)}`
      return data
    },
    addtocart (el) {
      if (localStorage.getItem('token')) {
        this.selected = el
        this.modalCart = !this.modalCart
      } else {
        this.modalShow = !this.modalShow
      }
    },
    tologin () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scope>
.card {
  border: 1px solid rgba(180, 180, 180, 0.534);
  background-color: rgba(100, 97, 97, 0.219);
}
.card-img {
  border: 1px solid rgba(180, 180, 180, 0.534);
}
.card-img,
.card-img-top,
.card-img-bottom {
  height: 18em;
  padding: 10px;
}
.fa {
  text-decoration: none;
}
.card-body {
  display: flex;
  flex-direction: column;
}
.button {
  margin-top: auto;
}
</style>
