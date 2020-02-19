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
                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            icon
                            large
                            target="_blank"
                            v-on="on"
                        >
                            <v-icon>mdi-account-plus</v-icon>
                        </v-btn>
                    </template>
                    <span>Register User</span>
                </v-tooltip>
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
                <v-btn color="primary" @click="login">Login</v-btn>
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
    login() {
      superagent
        .post('http://localhost:3000/users/login')
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
  },
};
</script>
<style scoped>

</style>
