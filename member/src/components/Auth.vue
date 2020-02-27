<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="480px">
      <v-card color="teal lighten-5">
        <v-card-text>
          <v-container>
            <br />
            <br />
            <h2 class="text-center">{{isRegister ? 'Register an account' : 'Login to your account' }}</h2>
            <br />
            <v-text-field label="Email" v-model="auth.email" outlined required></v-text-field>
            <v-text-field
              label="Password"
              v-model="auth.password"
              outlined
              type="password"
              required
            ></v-text-field>
            <v-btn
              block
              :loading="loading"
              color="teal"
              @click="isRegister ? register() : login()"
            >{{isRegister ? 'Register' : 'Login'}}</v-btn>
            <br />
            <div v-if="!isRegister">
              <p class="text-center">Atau login menggunakan</p>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
            </div>
            <br />
            <p class="text-center" @click="isRegister = !isRegister">
              {{isRegister ?"Already have an account" :"Don't have any account?"}}
              <a>{{isRegister ?"Login" :"Register here"}}</a>
            </p>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import api from "../helper/api";
import GoogleLogin from "vue-google-login";
import swal from "sweetalert2";
export default {
  components: {
    GoogleLogin
  },
  data: () => ({
    dialog: false,
    loading: false,
    isRegister: false,
    auth: {
      email: "",
      password: "",
      roleId: 3
    },
    params: {
      client_id:
        "490316882342-75pbske0vok7rsi6c1ms786uj4vrvqq9.apps.googleusercontent.com"
    },
    renderParams: {
      width: 240,
      height: 50,
      longtitle: true
    }
  }),
  mounted() {
    this.dialog = !this.dialog;
  },
  methods: {
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      api
        .post("/google-signin", { id_token })
        .then(({ data }) => {
          this.$store.commit("login", data);
          this.$router.go(-1);
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.loading = !this.loading;
      api
        .post("/login", this.auth)
        .then(({ data }) => {
          this.loading = !this.loading;
          if (data.role === "member") {
            this.$store.commit("login", data);
            // this.$store.commit("setCarts", data.carts);
            this.$router.go(-1);
          } else {
            swal.fire("Error", "You cannot access this page", "error");
          }
          // this.$store.dispatch("getCarts");
        })
        .catch(err => {
          console.log(err.response);
          this.loading = !this.loading;
          swal.fire("Error", err.response.data.message, "error");
        });
    },
    register() {
      this.loading = !this.loading;
      api
        .post("/users", this.auth)
        .then(({ data }) => {
          this.loading = !this.loading;
          swal
            .fire("Success", "Successfully registered user", "success")
            .then(result => {
              if (result.value) {
                this.isRegister = false;
              }
            });
        })
        .catch(err => {
          this.loading = !this.loading;
          if (err.response.data.message instanceof Array) {
            swal.fire("Error", err.response.data.message.join(", "), "error");
          } else {
            swal.fire("Error", err.response.data.message, "error");
          }
        });
    }
  }
};
</script>