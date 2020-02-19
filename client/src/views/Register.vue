<template>
  <div>
    <div class="d-flex mx-auto">
      <div class="col-6 left">Hai</div>
      <div class="col-6 right mt-5">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="Name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="password">
            <el-input type="password" v-model="ruleForm.confirmPass"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        confirmPass: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
            type: "email"
          }
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur"
          },
          {
            min: 6,
            message: "Length must be at least 6 characters",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.password !== this.ruleForm.confirmPass) {
            this.$message.error("Oops, password does not match");
          } else {
            let dataReg = {
              name: this.ruleForm.name,
              email: this.ruleForm.email,
              password: this.ruleForm.password
            };
            this.$store.dispatch("register", dataReg);
          }
        } else {
          this.$message.error("Please input required datas");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    errMSG() {
      return this.$store.state.errMSG;
    }
  },
  watch: {
    errMSG() {
      this.$message.error(this.errMSG);
    }
  }
};
</script>

<style scoped>
</style>