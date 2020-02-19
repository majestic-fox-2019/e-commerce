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
                    <v-toolbar-title>Register</v-toolbar-title>
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
                    <v-btn color="secondary" @click="login">
                        <v-icon>mdi-keyboard-backspace</v-icon>
                        Goto Form Login
                    </v-btn>
                    <v-btn color="primary" @click="register">
                        Register
                        <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
const superagent = require('superagent');

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
    register() {
      superagent
        .post('http://localhost:3000/users/register')
        .send({
          email: this.email,
          password: this.password,
        })
        .end((err, res) => {
          if (err) {
            this.message = res.body.error;
          } else {
            this.message = 'User has been added';
            setTimeout(() => {
              this.$store.commit('setIsLogin', true);
              this.$router.push({ name: 'login' });
            }, 3000);
          }
          this.alert = true;
        });
    },
    login() {
      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>
<style scoped>

</style>
