<template>
  <div>
     <div class="cont tableFixHead">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
            <th scope="col">Total Items</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody class="scroll">
          <tr class="" v-for="(history,idx) in histories" :key="idx">
            <td scope="row">{{idx+1}}</td>
            <td>{{convertDate(history.createdAt)}}</td>
            <td>
              <table class="table">
                <thead>
                  <tr>
                    <td scope="col">Name</td>
                    <td scope="col">Quantity</td>
                    <td scope="col">Price</td>
                    <td scope="col">Sub Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,idx) in history.items" :key="idx">
                    <td scope="row">{{item.name}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{convertIDR(item.price)}}</td>
                    <td>{{convertIDR(item.totalprice)}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>{{history.totalquantity}}</td>
            <td>{{convertIDR(history.totalprice)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      histories: null,
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      console.log(localStorage.getItem('token'),"<<")
      this.$axios({
        url: `/user/history`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(product=>{
          this.histories = product.data
        })
        .catch(error=>{
          if(error.response.data.error == "invalid token") {
            this.$router.push({name: 'main'})
          }
        })
    },
    convertDate(date) {
      return this.$moment.convert(date)
    },
    convertIDR(num) {
      return this.$idr.convert(num)
    }
  }

}
</script>

<style scoped>
.cont {
  margin: 20px;
}
th, td {
  text-align: center;
  vertical-align: inherit;
}
.tableFixHead    { overflow-y: auto; height: 85vh; }
.tableFixHead th { position: sticky; top: 0; }

table  { border-collapse: collapse; width: 100%; }
th, td { padding: 8px 16px; }
th     { background:#eee; }
</style>