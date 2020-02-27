<template>
  <div class="container">
    <div class="row" style="place-content:center">
      <div class="col-10">
        <el-table
          v-if="allTransaction"
          :data="allTransaction"
          style="width: 100%"
          max-height="400"
        >
          <el-table-column
            fixed
            prop="Mall.category"
            label="Category"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="User.name" label="User Name" width="200">
          </el-table-column>
          <el-table-column prop="Mall.name" label="Product Name" width="200">
          </el-table-column>

          <el-table-column prop="Mall.price" label="Price" width="200">
          </el-table-column>
          <!-- <el-table-column prop="stock" label="Stock" width="200"> </el-table-column> -->
          <el-table-column prop="Mall.imageUrl" label="image Url" width="300">
            <template slot-scope="scope">
              <a
                :href="allTransaction[scope.$index]['Mall'].imageUrl"
                target="_blank"
              >
                Image
              </a>
            </template>
          </el-table-column>
          <el-table-column label="Transaction Date" width="200">
            <template slot-scope="scope">
              <span>{{
                allTransaction[scope.$index]['Mall'].createdAt.toString()
                  | moment('dddd, MMMM Do YYYY')
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Transaction',
  data() {
    return {
      allTransaction: null
    }
  },
  methods: {},
  created() {
    axios({
      method: 'get',
      url: `${this.$store.state.baseUrl}/charts/mall`
    })
      .then(({ data }) => {
        console.log('ini adalah data transaction', data)
        this.allTransaction = data
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>

<style></style>
