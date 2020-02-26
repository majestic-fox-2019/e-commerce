<template>
  <div>
    <b-modal :id="'bv-modal-example'" ref="modal-login" hide-footer>
      <b-form @submit="onSubmit">
        <b-form-group
          :id="'input-group-email'+ $route"
          label="Email address:"
          label-for="emailLogin"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            :id="'emailLogin'+ $route"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group :id="'input-group-password'+ $route" label="Password:" label-for="password">
          <b-form-input
            :id="'password'+$route"
            v-model="password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
      <div class="mt-2">
        <div class="row d-flex flex-column">
          <div class="col-6">
            New to us? Register
            <a href @click="toRegister">Here</a>
          </div>
          <div class="col-1">
            <p>or</p>
          </div>
          <div class="col-5">
            <el-button type="primary" size="mini" @click="social">
              <i class="fab fa-google mr-3"></i>Log in in with Google
            </el-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import firebase from "firebase";
export default {
  name: "modalLogin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let dataUser = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", dataUser);
      this.$bvModal.hide("bv-modal-example");
    },
    toRegister() {
      this.$bvModal.hide("bv-modal-example");
      this.$router.push("/register");
    },
    social() {
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
            this.$bvModal.hide("bv-modal-example");
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
          Swal.fire("Oops", error.message, "error");
          // ...
        });
    }
  }
};
</script>

<style>
</style>