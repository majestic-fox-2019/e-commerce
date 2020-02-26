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

    <v-autocomplete
      v-model="form.userLocationId"
      :items="cityList"
      dense
      filled
      label="Your City"
    ></v-autocomplete>

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
      value: '',
      form: {
        name: null,
        phone: null,
        email: null,
        userLocation: null,
        userLocationId: null,
        password: null
      }
    }
  },
  computed: {
    cityList() {
      return this.$store.state.cityList
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val, old) {
        if (val) {
          const data = this.cityList.filter(
            el => el.value === val.userLocationId
          )
          this.form.userLocation = data[0].text
        }
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
      this.form.userLocation = null
      this.form.userLocationId = null
    }
  }
}
</script>

<style lang="css" scoped></style>
