<template>
<v-app>
  <v-content>
  <div class="login d-flex align-center">
    <v-card raised class="form mx-auto px-5 py-5">
      <v-card-title>Login</v-card-title>
        <v-form @submit.prevent="login">
        <v-text-field
            outlined
            label="Email"
            placeholder="example@exmp.com"
            color="success"
            v-model="email"
          ></v-text-field>

          <v-text-field
            outlined
            label="Password"
            type="password"
            placeholder="Password"
            color="success"
            v-model="password"
          ></v-text-field>

          <v-btn color="success" type="submit">Login</v-btn>
        </v-form>
    </v-card>
  </div>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$http({
        method: 'post',
        url: 'user/login',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((res) => {
          console.log(data)
          if(res.data.role !== 'member'){
            localStorage.token = res.data.token;
            localStorage.name = res.data.name;
            this.$router.push({ name: 'categories' });
            this.$toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            });
          }else{
            this.$swal.fire(
              {
                title: 'Error!',
                text: 'For admin only',
                icon: 'error',
                confirmButtonText: 'Cool',
              },
            );
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire(
            {
              title: 'Error!',
              text: err.response.data,
              icon: 'error',
              confirmButtonText: 'Cool',
            },
          );
        });
    },
  },
};
</script>

<style scoped>
.login{
  height: 100%;
  background-image: url("https://picsum.photos/1920/1080?random") !important;
  background-repeat: no-repeat;
  background-size: auto;
}
.form{
  width:40vw !important;
}
</style>
