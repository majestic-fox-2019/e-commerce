<template>
  <div class="container">
    <div class="row mt-5" style="place-content:center">
      <div class="col-10">
        <el-tabs type="border-card">
          <el-tab-pane label="Penjualan">User</el-tab-pane>
          <el-tab-pane label="History Pembelian">
            <el-table
              v-if="allHistory"
              :data="allHistory"
              style="width: 100%"
              max-height="400"
            >
              <el-table-column
                fixed
                prop="Product.category"
                label="Category"
                width="150"
              >
              </el-table-column>
              <el-table-column prop="Product.name" label="Name" width="200">
              </el-table-column>
              <el-table-column prop="Product.price" label="Price" width="200">
              </el-table-column>
              <el-table-column prop="quantity" label="Quantity" width="200">
              </el-table-column>
              <el-table-column
                prop="Product.imageUrl"
                label="image Url"
                width="300"
              >
                <template slot-scope="scope">
                  <a
                    :href="allHistory[scope.$index]['Product'].imageUrl"
                    target="_blank"
                  >
                    Image
                  </a>
                </template>
              </el-table-column>
              <el-table-column label="Transaction Date" width="200">
                <template slot-scope="scope">
                  <span>{{
                    allHistory[scope.$index]['Product'].createdAt.toString()
                      | moment('dddd, MMMM Do YYYY')
                  }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'history',
  data() {
    return {
      allHistory: null
    }
  },
  methods: {
    getHistory() {
      let status = 'done'
      console.log(status)
      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/charts/product/user`,
        data: {
          status
        },
        headers: {
          token: localStorage.getItem('e_musicToken')
        }
      })
        .then(({ data }) => {
          this.$store.commit('SET_QUANTITY', data.length)
          console.log(data)
          this.allHistory = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    if (!localStorage['e_musicToken']) {
      this.$router.push({
        path: '/login'
      })
    }
    this.getHistory()
  }
}
</script>

<style></style>
