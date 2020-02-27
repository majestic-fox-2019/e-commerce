<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Product</th>
          <th class="text-center">Product's Name</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Price</th>
          <th class="text-center">Total</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getData" :key="item.name">
          <td class="imgtd"><img :src="item.Product.image_url" class="imgcarts"></td>
          <td class="text-center">{{ item.Product.name}}</td>
          <td class="text-center">
            <v-btn @click.prevent='decrement(item)' class="mx-2" fab x-small color="primary">
              <v-icon dark>mdi-minus</v-icon></v-btn>
              {{ item.quantity }}
                  <v-btn @click.prevent='increment(item)' class="mx-2" fab x-small color="primary">
                    <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
              </td>
          <td class="text-center">{{ item.Product.price }}</td>
          <td class="text-center">{{ item.quantity * item.Product.price }}</td>
          <td class="text-center"><v-btn class="ma-2" color="red" dark @click="destroy(item.id)">
           cancel
        <v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
      </td>
        </tr>
      </tbody>
      <thead>
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center"><h2> Total</h2></th>
          <th class="text-center"><h2>Rp. {{total}}</h2></th>
      </thead>
            <thead>
          <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center"></th>
            <th class="text-center"></th>
          <th class="text-center"></th>
          <th class="text-center">
            <v-btn class="ma-2" color="red" dark @click="checkout(getData)">
            CHECKOUT!
            </v-btn>
          </th>
      </thead>
    </template>
  </v-simple-table>
</template>

<script>
const superagent = require('superagent');

export default {
  name: 'showcart',
  data() {
    return {
      total: 0,
    };
  },
  computed: {
    // total(quantity, price) {
    //   return quantity * price;
    // },
    getData() {
      return this.$store.state.carts;
    },

    getAllData() {
      return this.$store.state.products;
    },
  },
  beforeCreate() {
    this.$store.dispatch('getCart');
  },
  watch: {
    getData() {
      let totalprice = 0;
      this.getData.forEach((el) => {
        totalprice += el.quantity * el.Product.price;
      });
      this.total = totalprice;
    },
  },
  methods: {
    destroy(id) {
      console.log(this.$store.state.carts);
      superagent
        .delete(`${this.$store.state.url_base}/carts/${id}`)
        .set('token', this.$store.state.isLogin)
        .end((err, res) => {
          console.log(res, 'masukk??');
          this.$store.dispatch('getCart');
        });
    },
    increment(data) {
      // console.log(data.quantity + 1);
      const increment = data.quantity + 1;
      console.log(increment);
      superagent
        .patch(`${this.$store.state.url_base}/carts/${data.id}`)
        .set('token', this.$store.state.isLogin)
        .send({ quantity: increment })
        .end(() => {
          // console.log(res, ' paan nihhh ');
          this.$store.dispatch('getCart');
        });
    },
    decrement(data) {
      // console.log(data.quantity + 1);
      const increment = data.quantity - 1;
      console.log(increment);
      superagent
        .patch(`${this.$store.state.url_base}/carts/${data.id}`)
        .set('token', this.$store.state.isLogin)
        .send({ quantity: increment })
        .end(() => {
          // console.log(res, ' paan nihhh ');
          this.$store.dispatch('getCart');
        });
    },

    checkout(data) {
      console.log(data, 'checkout');
      this.getAllData.forEach((el) => {
        data.forEach((element) => {
          console.log(el.id, 'el nihh', element.ProductId, 'element nih');
          console.log(el.stock, ' ini stock', element.UserId, 'UserID nihhh cuyyy', el.id, 'id nihhh', element.quantity, 'ini quantity', element.Product.id, 'ProductId');
          if (element.ProductId === el.id) {
            superagent
              .patch(`${this.$store.state.url_base}/products/${el.id}`)
              .set('token', this.$store.state.isLogin)
              .send({
                stock: (el.stock - element.quantity),
              })
              .end(() => {
                // this.$store.dispatch('loadData');
                // console.log(res, 'masuk?/');
                superagent
                  .delete(`${this.$store.state.url_base}/checkout/${element.UserId}`)
                  .set('token', this.$store.state.isLogin)
                  .end(() => {
                    // console.log(res);
                    this.$store.dispatch('loadData');
                    this.$store.dispatch('getCart');
                    this.$store.commit('showCart', false);
                  });
              });
          }
        });
      });
    // superagent
      // .patch(`${this.$store.state.url_base}/products/${element.ProductId}`)
      // .set('token', this.$store.state.isLogin)
      // .send({stock: (element.quantity) })
    },
  },
};
</script>

<style>
.imgcarts {
  /* max-width: 25%; */
  width: 20em;
}
td.imgtd {
  width: 20%;
  height: 100%;
}
td.imgtd img {
  height: 15em;
}
</style>
