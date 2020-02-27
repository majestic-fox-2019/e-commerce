<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Product Name</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Avalaible Stocks</th>
            <th class="text-left">Income</th>
            <th class="text-left">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in incomeData" :key="item.id">
            <td>{{ item.Product.name }}</td>
            <td>{{ item.Cart.qty }}</td>
            <td>{{ item.Product.stocks }}</td>
            <td>{{ changeFormat(item.Cart.price) }}</td>
            <td>{{ new Date(item.createdAt).toDateString() }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <h4>Total Income : {{ changeFormat(totalIncome) }}</h4>
  </div>
</template>

<script>
import Formatter from '@/helpers/formatter'

export default {
  name: 'IncomePage',
  computed: {
    incomeData() {
      return this.$store.state.incomeData
    },
    totalIncome() {
      const data = this.incomeData
      var total = 0
      data.forEach(el => {
        total += Number(el.Cart.price)
      })
      return total
    }
  },
  methods: {
    changeFormat(val) {
      return Formatter(val)
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_USER_INCOME')
  }
}
</script>
