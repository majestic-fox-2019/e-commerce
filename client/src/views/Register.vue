<template>
  <div>
    <h1 class="mt-5">Welcome to CherryChenka</h1>
    <div class="container">
      <div class="mt-5">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
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
      <div class="mt-5 ml-5 container">
        <el-button type="primary" @click="google">
          <i class="fab fa-google mr-3"></i>Sign in with Google
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import firebase from "firebase";
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
              password: this.ruleForm.password,
              role: "user"
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
    },
    google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let data = {
            name: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email
          };
          this.$store.dispatch("socialLogin", data).then(() => {
            Swal.fire("Yay!", "Welcome to cherrychenka!", "success");
            this.$router.push("/");
          });
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // // The email of the user's account used.
          // var email = error.email;
          // // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // console.log("error");
          // console.log(errorCode, errorMessage, email, credential);
          // ...
          Swal.fire("Oops", error.message, "error");
        });
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