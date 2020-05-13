<template>
  <div class="register">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-5 text-center">
          <h1>Jadilah Pembeli Terbaik!</h1>
          <p>Belanja di shoppe banyak diskonnya</p>
          <img class="mt-5" src="../assets/shoppe-admin.png" alt="register-new" width="360" />
        </div>
        <div class="col-5">
          <div class="user-accounts-form shadow p-5">
            <div class="user-accounts-form-header">
              <h2 class="title">Daftar Sekarang</h2>
              <p class="text">
                Sudah punya akun Shoppe?
                <a @click="goLogin" class="link-page">Masuk</a>
              </p>
            </div>
            <form @submit.prevent="submitRegister">
              <div class="form-group">
                <label>Username</label>
                <input v-model="username" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control" />
                <p class="user-input-info">Contoh: email@shopee.com</p>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control" />
              </div>
              <button type="submit" class="btn btn-register btn-block mt-4">Daftar</button>
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
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submitRegister() {
      this.$store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password
      });
    },
    goLogin() {
      this.$store.state.accountWhatToShow = "login";
    }
  }
};
</script>

<style scoped>
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
.user-accounts-form-header {
  text-align: center;
  margin-bottom: 32px;
}
.user-accounts-form-header .title {
  font-weight: 600;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1;
}
.user-accounts-form-header .text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
}
.user-accounts-form-header .link-page {
  color: #ee4d2d;
  font-weight: 600;
  cursor: pointer;
}
h1 {
  font-size: 32px;
  font-weight: 500px;
  color: #ee4d2d;
  line-height: 57px;
}
p {
  color: #666;
  font-size: 18px;
}
</style>