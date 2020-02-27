<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Item</th>
            <th class="text-center">Amount</th>
            <th class="text-center">Price</th>
            <th class="text-center">Total</th>
            <th class="text-center">Transaction Group</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(story,i) in history" :key="story.id" class="text-center">
            <td>{{ i + 1 }}</td>
            <td>{{ story.Product.name }}</td>
            <td>{{ story.amount }}</td>
            <td>{{ $convert(story.Product.price) }}</td>
            <td>{{ $convert(story.Product.price * story.amount) }}</td>
            <td>{{ story.status }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
  
</template>

<script>
export default {
  name:"History",
  data() {
    return {
      history:[]
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getHistory() {
      this.$http({
        url:'/cart/history',
        method:'GET',
        headers:{
          token: localStorage.token
        }
      })
      .then(({data}) => {
        this.history = data
        console.log(data)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }
}
</script>

<style>

</style>