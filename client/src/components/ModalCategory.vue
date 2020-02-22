<template>
  <v-row class="pl-5">
    <v-btn
      raised rounded
      @click.stop="dialog = true"
      v-if="icon == null"
    >
      {{type}}
    </v-btn>
    <v-btn
      icon
      @click.stop="dialog = true"
      v-if="icon != null"
    >
      <v-icon>{{icon}}</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="50vw"
    >
      <v-card class="px-5 py-5">
        <v-card-title>{{type}}</v-card-title>
        <v-form
          ref="form"
          @submit.prevent="submit"
          enctype="multipart/form-data">
          <v-text-field
            v-model="name"
            color="success"
            label="Name"
            ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="success">Submit</v-btn>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  props: ['type', 'icon'],
  data() {
    return {
      dialog: false,
      name: '',
    };
  },
  methods: {
    setImage(file) {
      console.log(file);
      this.image = file;
    },
    submit() {
      this.addCategory();
    },
    addCategory() {
      this.$http({
        url: 'category',
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: {
          name: this.name,
        },
      })
        .then((res) => {
          this.dialog = false;
          this.$swal.fire(
            {
              title: 'Success Add Category',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          this.$swal.fire(
            {
              title: 'Error!',
              text: JSON.stringify(err.response.data),
              icon: 'error',
              confirmButtonText: 'Cool',
            },
          );
        });
    },
  },
  watch: {
  },
};
</script>

<style>
</style>
