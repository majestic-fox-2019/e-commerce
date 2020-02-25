<template>
  <div>
    <v-simple-table fixed-header height="500px">
      <template v-slot:default>
        <thead>
          <tr>
            <th>No.</th>
            <th class="text-left">Category</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart, i) in carts" :key="cart.id">
            <td>{{ i+1 }}</td>
            <td>{{ cart.Product.CategoryId === 1 ? 'Ebooks' : 'Tutorials' }}</td>
            <td>{{ cart.Product.name }}</td>
            <td>{{ formatMoney(cart.price) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn
      block
      color="primary"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Checkout
      <v-icon right dark>mdi-credit-card-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import moneyFormatter from '../helpers/formatMoney';
import parseJwt from '../helpers/jwtParser';

export default {
  data() {
    return {
      carts: [],
    };
  },
  methods: {
    formatMoney(money) {
      return moneyFormatter(money);
    },
  },
  created() {
    const objUser = parseJwt(this.$store.state.isLogin);

    this.$store.state.superagent
      .get(`${this.$store.state.url_backend}/transactions/${objUser.id}`)
      .set('accesstoken', this.$store.state.isLogin)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.carts = res.body;
        }
      });
  },
};
</script>

<style scoped>

</style>
