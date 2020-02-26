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
     <PayPal
      :amount="total_pay"
      currency="USD"
      :client="paypal_credentials"
      env="sandbox"
      notify-url="/payment-sucess">
    >
    </PayPal>
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
import PayPal from 'vue-paypal-checkout';
import moneyFormatter from '../helpers/formatMoney';
import parseJwt from '../helpers/jwtParser';

export default {
  components: {
    PayPal,
  },
  data() {
    return {
      carts: [],
      paypal_credentials: {
        sandbox: 'AQWsshiaXa_uMKjhtrIcoDRLREm7em_MDjbpkoOoLRdD0wedCzFJ7iahqji_eDDruFZN2dJBQ-6XylAl',
        production: '<production client id>',
      },
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
  computed: {
    total_pay() {
      let totalPay = 0;
      this.carts.forEach((cart) => {
        totalPay += cart.price;
      });
      return totalPay;
    },
  },
};
</script>

<style scoped>

</style>
