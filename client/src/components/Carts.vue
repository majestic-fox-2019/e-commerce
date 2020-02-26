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
        v-if="carts.length > 0"
        :amount="total_pay"
        currency="USD"
        :client="paypal_credentials"
        env="sandbox"
        @payment-completed="onComplete"
      >
    >
    </PayPal>
    <div v-if="carts.length <= 0" class="no-product">
      There is no product in your cart. belanja gih... :)
    </div>
    <!-- <v-btn
      block
      color="primary"
      class="ma-2 white--text"
      @click="loader = 'loading3'"
    >
      Checkout
      <v-icon right dark>mdi-credit-card-outline</v-icon>
    </v-btn> -->
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
      rates: {
        USD: 1,
      },
    };
  },
  methods: {
    formatMoney(money) {
      return moneyFormatter(money);
    },
    moneyConvertRate() {
      this.$store.state.superagent
        .get('https://api.exchangeratesapi.io/latest?base=IDR')
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            this.rates = res.body.rates;
          }
        });
    },
    onComplete() {
      const objUser = parseJwt(this.$store.state.isLogin);
      this.$store.state.superagent
        .post(`${this.$store.state.url_backend}/transactions/${objUser.id}/settled`)
        .set('accesstoken', this.$store.state.isLogin)
        .end((err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
            this.$store.dispatch('getCartTotal');
            this.$router.push({ name: 'payment_success' });
          }
        });
    },
  },
  created() {
    this.moneyConvertRate();
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
      const strUSD = totalPay * this.rates.USD;
      const strUSDtwoDecimals = strUSD.toString().split('.');
      if (typeof strUSDtwoDecimals[1] !== 'undefined') {
        return `${strUSDtwoDecimals[0]}.${strUSDtwoDecimals[1].substring(0, 2)}`;
      }
      return `${strUSDtwoDecimals[0]}.00`;
    },
  },
};
</script>

<style scoped>
.paypal-button{
  margin: 2% 2% 0 0;
  text-align: right;
}

.no-product {
  position: absolute;
  top: 40%;
  left: 25%;
  font-size: 24pt;
}
</style>
