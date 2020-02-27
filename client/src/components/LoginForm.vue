<template>
  <v-form ref="form" lazy-validation>
    <v-text-field
      v-model="form.email"
      label="E-mail"
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
        email: null,
        password: null
      }
    }
  },
  methods: {
    sendForm() {
      this.$store.dispatch('LOGIN', this.form)
    },
    resetForm() {
      this.form.email = null
      this.form.password = null
    }
  }
}
</script>

<style lang="css" scoped></style>
