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
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      email: '',
      password: '',
      alert: false,
      message: '',
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
            this.$store.commit('setIsLogin', true);
            this.$router.push({ name: 'home' });
          }
        });
    },
    register() {
      if (this.$route.name !== 'register') {
        this.$router.push({ name: 'register' });
      }
    },
  },
};
</script>
<style scoped>

</style>
