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
          <tr v-for="(bookmark, i) in bookmarks" :key="bookmark.id">
            <td>{{ i+1 }}</td>
            <td>{{ bookmark.Product.CategoryId === 1 ? 'Ebooks' : 'Tutorials' }}</td>
            <td>{{ bookmark.Product.name }}</td>
            <td>{{ formatMoney(bookmark.Product.price) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div v-if="bookmarks.length <= 0" class="no-bookmark">
      You don't have any bookmarked product... cari cari gih :)
    </div>
  </div>
</template>

<script>
import moneyFormatter from '../helpers/formatMoney';
import parseJwt from '../helpers/jwtParser';

export default {
  data() {
    return {
      bookmarks: [],
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
      .get(`${this.$store.state.url_backend}/bookmarks/${objUser.id}`)
      .set('accesstoken', this.$store.state.isLogin)
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.bookmarks = res.body;
        }
      });
  },
};
</script>

<style scoped>
.no-bookmark {
  position: absolute;
  top: 40%;
  left: 25%;
  font-size: 24pt;
}
</style>
