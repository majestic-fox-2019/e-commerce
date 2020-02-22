<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Product name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Category">
      <el-select
        v-model="form.category"
        placeholder="Please select the category"
      >
        <el-option label="Keyboard" value="keyboard"></el-option>
        <el-option label="Drum" value="drum"></el-option>
        <el-option label="Synthesizer" value="synthesizer"></el-option>
        <el-option label="Guitar" value="guitar"></el-option>
        <el-option label="Bass" value="bass"></el-option>
      </el-select>
    </el-form-item>

    <b-form-file
      @change="onFileChange"
      v-model="form.file"
      class="btn btn-light my-3 inputFile"
      plain
    ></b-form-file>

    <el-form-item label="Product stock">
      <el-input-number
        v-model="form.stock"
        :min="1"
        :max="99"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="Product price">
      <el-input v-model="form.price"></el-input>
    </el-form-item>

    <el-form-item label="Resources">
      <el-radio-group v-model="form.condition">
        <el-radio label="New"></el-radio>
        <el-radio label="Second"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Product Description">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        name: '',
        category: '',
        condition: '',
        desc: '',
        stock: 1,
        file: null
      },
      url: null
    }
  },
  methods: {
    onSubmit() {
      let formData = new FormData()
      formData.append('file', this.form.file)
      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      formData.append('category', this.form.category)
      formData.append('condition', this.form.condition)
      formData.append('desc', this.form.desc)
      formData.append('stock', this.form.stock)
      axios({
        method: 'post',
        url: `${this.baseUrl}/products`,
        data: formData,
        headers: {
          token: localStorage.getItem('e_musicToken')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getItem')
          this.$router.push({
            path: '/'
          })
        })
        .catch(err => {
          if (err.response.status == 401) {
            console.log('please login first')
            this.$router.push({
              path: '/login'
            })
          }
        })
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  },
  computed: {
    baseUrl() {
      return this.$store.state.baseUrl
    }
  }
}
</script>

<style scoped></style>
