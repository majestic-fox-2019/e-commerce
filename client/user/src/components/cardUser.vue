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
      style="max-width: 15em;"
      class="mb-2 mx-1 col-md-4"
    >
      <b-card-text>{{el.name}}</b-card-text>
      <b-card-body>
        <div class="button">
      <b-card-text style="color:red">{{formater(el.price)}}</b-card-text>
          <b-button size="sm" variant="success" class="mr-1">
            <i class="fa fa-cart-plus mr" style="font-size:19px;color:white"></i>
          </b-button>
          <b-button size="sm" @click="selecDetail(el)" variant="info" v-b-modal.modal-1>Detail</b-button>
        </div>
      </b-card-body>
    </b-card>
          <b-modal id="modal-1" title="BootstrapVue">
            <div class="d-flex align-items-start flex-column">
              <img :src="selected.imageurl" alt="" height="300px">
              <h2>{{selected.name}}</h2>
              <h4>{{formater(selected.price)}}</h4>
            </div>
          </b-modal>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      selected: {}
    }
  },
  name: 'cardUser',
  methods: {
    selecDetail (data) {
      this.selected = data
    },
    formater (price) {
      const data = new Intl.NumberFormat().format(price)
      return data
    }
  }
}
</script>

<style>
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
  height: 15em;
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
