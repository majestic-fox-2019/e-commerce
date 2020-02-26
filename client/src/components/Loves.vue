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
          <tr v-for="(love, i) in loves" :key="love.id">
            <td>{{ i+1 }}</td>
            <td>{{ love.Product.CategoryId === 1 ? 'Ebooks' : 'Tutorials' }}</td>
            <td>{{ love.Product.name }}</td>
            <td>{{ formatMoney(love.Product.price) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-if="loves.length <= 0" class="no-love">
      You don't have any loved product... cari cari gih :)
    </div>
  </div>
</template>

<script>
import moneyFormatter from '../helpers/formatMoney';
import parseJwt from '../helpers/jwtParser';

export default {
  data() {
    return {
      loves: [],
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
      .get(`${this.$store.state.url_backend}/loves/${objUser.id}`)
      .set('accesstoken', this.$store.state.isLogin)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.loves = res.body;
        }
      });
  },
};
</script>

<style scoped>
.no-love {
  position: absolute;
  top: 40%;
  left: 25%;
  font-size: 24pt;
}
</style>
