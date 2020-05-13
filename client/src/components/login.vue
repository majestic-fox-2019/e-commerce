<template>
  <div class="login">
    <div class="container">
      <div class="row justify-content-center bg-shopee">
        <div class="col-5">
          <div class="user-accounts-form shadow p-5">
            <form @submit.prevent="submitLogin">
              <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control" />
                <p class="user-input-info">Contoh: email@shopee.com</p>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control" />
              </div>
              <button type="submit" class="btn btn-register btn-block mt-4">Masuk</button>
              <p class="text">
                Belum punya akun Shopee?
                <a @click="goRegister" class="link-page">Daftar</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitLogin() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    },
    goRegister() {
      this.$store.state.accountWhatToShow = "register";
    }
  }
};
</script>

<style scoped>
.bg-shopee {
  background-image: url("../assets/shoppe-admin.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 7%;
}
.btn {
  padding: 1.075rem 0.75rem;
}
.btn-register {
  background-color: #ee4d2d;
  border-color: #ee4d2d;
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 18px;
}
.user-accounts-form {
  border-radius: 3px;
  background-color: #fff;
}
.user-accounts-form label {
  color: rgba(0, 0, 0, 0.54);
  line-height: 1.33;
}
.user-accounts-form .user-input-info {
  font-size: 12px;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.38);
  padding-top: 5px;
}
.user-accounts-form .text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  text-align: center;
  padding-top: 10px;
}
.user-accounts-form .link-page {
  color: #ee4d2d;
  font-weight: 600;
  cursor: pointer;
}
</style>