<template>
  <div>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change']
          }
        ]"
      >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="email"
        :rules="[
          {
            required: true,
            message: 'Please input your password',
            trigger: 'blur'
          }
        ]"
      >
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        password: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userLogin = {
            email: this.ruleForm.email,
            password: this.ruleForm.pass
          }
          this.$store.dispatch('login', userLogin)
          this.$emit('login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style></style>
