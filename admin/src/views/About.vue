<template>
  <el-table
    v-if="tableData"
    :data="tableData"
    style="width: 100%"
    max-height="400"
  >
    <el-table-column fixed prop="category" label="Category" width="150">
    </el-table-column>
    <el-table-column prop="name" label="Name" width="200"> </el-table-column>
    <el-table-column prop="price" label="Price" width="200"> </el-table-column>
    <el-table-column prop="stock" label="Stock" width="200"> </el-table-column>
    <el-table-column prop="imageUrl" label="image Url" width="300">
      <template slot-scope="scope">
        <a :href="tableData[scope.$index].imageUrl" target="_blank">
          Image
        </a>
      </template>
    </el-table-column>
    <el-table-column label="createdAt" width="200">
      <template slot-scope="scope">
        <span>{{
          tableData[scope.$index].createdAt.toString()
            | moment('dddd, MMMM Do YYYY')
        }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Operations" width="200">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small"
        >
          Remove
        </el-button>
        <el-button @click="handleClick" type="text" size="small"
          >Detail</el-button
        >
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    deleteRow(index, rows) {
      // rows.splice(index, 1)
      console.log(index, rows)
    },
    handleClick() {
      console.log('click')
    }
  },
  data() {
    return {
      tableData: null
    }
  },
  created() {
    if (!localStorage['e_musicToken_admin']) {
      this.$router.push({
        path: '/registerlogin'
      })
    }
    axios({
      method: 'get',
      url: `${this.$store.state.baseUrl}/malls`
    })
      .then(({ data }) => {
        console.log(data)
        this.tableData = data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
