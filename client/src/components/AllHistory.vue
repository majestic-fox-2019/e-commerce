<template>
  <div>
     <div class="cont">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Date</th>
            <th scope="col">Email</th>
            <th scope="col">Details</th>
            <th scope="col">Total Items</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="(history,idx) in histories" :key="idx">
            <th scope="row">{{idx+1}}</th>
            <td>{{convertDate(history.createdAt)}}</td>
            <td>{{history.email}}</td>
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
      this.$axios({
        url: `/user/allhistory`,
        method: 'get',
        headers: {token: localStorage.getItem('token')},
      })
        .then(product=>{
          this.histories = product.data
        })
        .catch(error=>{
          console.log(error.response)
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