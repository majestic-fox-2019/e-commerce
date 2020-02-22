<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="form.name"
      type="text"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.phone"
      type="text"
      label="Phone Number"
      hint="ex: 081312345678"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.email"
      type="email"
      label="E-mail"
      hint="ex: email@mail.com"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :counter="6"
      type="password"
      hint="At least 6 character"
      label="Password"
      required
    ></v-text-field>
    <v-btn color="success" class="mr-4" @click.prevent="sendForm">
      Submit
    </v-btn>

    <v-btn color="error" class="mr-4" @click.prevent="resetForm">
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        name: null,
        phone: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    sendForm() {
      this.$store.dispatch('REGISTER', this.form)
    },
    resetForm() {
      this.form.email = null
      this.form.password = null
      this.form.phone = null
      this.form.name = null
    }
  }
}
</script>

<style lang="css" scoped></style>
