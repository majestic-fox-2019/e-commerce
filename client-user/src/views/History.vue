<template>
  <v-container>
    <v-simple-table class="mt-12" width="100" fixed-header height="86vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center title-table" width="5%">#</th>
            <th class="text-center title-table" width="20%">Date</th>
            <th class="text-center title-table" width="35%">Transaction Detail</th>
            <th class="text-center title-table" width="10%">Total Qty</th>
            <th class="text-center title-table" width="20%">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history,i) in histories" :key="i" class="text-center">
            <td style="font-weight: bold">{{ i + 1 }}</td>
            <td>{{ $dateFormat(history.createdAt) }}</td>
            <td>
              <v-simple-table class="mt-4 mb-4" width="100" dense style="z-index: -100 !important">
                <template v-slot:default>
                  <thead style="background-color: rgba(202, 197, 190, 0.69);">
                    <tr>
                      <td class="text-center title-detail-table" width="25%">Product Name</td>
                      <td class="text-center title-detail-table" width="20%">Price</td>
                      <td class="text-center title-detail-table" width="20%">Stock</td>
                      <td class="text-center title-detail-table" width="20%">SubTotal</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, i) in history.product" :key="i" class="text-center">
                      <td>{{ product.name }}</td>
                      <td>{{ $currencyConverter(product.price) }}</td>
                      <td>{{ product.qty }}</td>
                      <td>{{ $currencyConverter(product.subTotal) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </td>
            <td>{{history.totalQty}}</td>
            <td>{{ $currencyConverter(history.totalPrice) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      histories: null
    };
  },
  created() {
    this.getHistory();
  },
  methods: {
    getHistory() {
      this.$axios
        .get("/histories", {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          this.histories = res.data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    changeDateFormat(date) {
      return moment(date).format("LLL");
    },
    changeCurrencyFormat(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(number);
    }
  }
};
</script>

<style scoped>
.title-table {
  background-color: rgba(175, 170, 170, 1) !important;
}

.title-detail-table {
  font-weight: bold;
}
</style>