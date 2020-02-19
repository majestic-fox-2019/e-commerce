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
        New to us? Register
        <a href @click="toRegister">Here</a>
      </div>
    </b-modal>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style>
</style>