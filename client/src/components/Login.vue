<template>
    <v-container
        class="fill-height"
        fluid
    >
        <v-snackbar
            v-model="alert"
            :top="true"
        >
            {{ message }}
            <v-btn
                color="primary"
                text
                @click="alert = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-row
            align="center"
            justify="center"
        >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
            <v-card class="elevation-12">
                <v-toolbar
                    color="primary"
                    dark
                    flat
                >
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field
                        label="Email"
                        name="login"
                        type="email"
                        autocomplete="off"
                        v-model="email"
                    />

                    <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        v-model="password"
                    />
                </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="secondary" @click="register">
                        <v-icon>mdi-keyboard-backspace</v-icon>
                        Register
                    </v-btn>
                    <v-btn color="primary" @click="login">
                        Login
                        <v-icon>mdi-account-check</v-icon>
                    </v-btn>
                </v-card-actions>
                <GoogleLogin
                  :params="params"
                  :renderParams="renderParams"
                  :onSuccess="onSuccess"
                  :onFailure="onFailure"
                >
                </GoogleLogin>
            </v-card>
            <br>
            User for demo purpose
              <div>
                 admin@gmail.com
                 | user@gmail.com
                 | Password: 123</div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import GoogleLogin from 'vue-google-login';

export default {
  components: {
    GoogleLogin,
  },
  props: {
    source: String,
  },
  data() {
    return {
      email: '',
      password: '',
      alert: false,
      message: '',
      params: {
        client_id: '1056230961846-aff2ilioml6gsgo9sf4iunb6abn53e4o.apps.googleusercontent.com',
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 396,
        height: 45,
        longtitle: true,
      },
    };
  },
  methods: {
    login() {
      this.$store.state.superagent
        .post(`${this.$store.state.url_backend}/users/login`)
        .send({
          email: this.email,
          password: this.password,
        })
        .end((err, res) => {
          if (err) {
            this.alert = true;
            this.message = res.body.error;
          } else {
            localStorage.setItem('token', res.body.token);
            this.$store.commit('setIsLogin', res.body.token);
            this.$router.push({ name: 'home' });
          }
        });
    },
    register() {
      if (this.$route.name !== 'register') {
        this.$router.push({ name: 'register' });
      }
    },
    onSuccess(googleUser) {
      console.log(googleUser);
      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onFailure() {
      console.log('Test');
    },
  },
  beforeDestroy() {
    this.$store.dispatch('getCartTotal');
    this.$store.dispatch('getLoveTotal');
    this.$store.dispatch('getBookmarkTotal');
  },
};
</script>
<style scoped>

</style>
