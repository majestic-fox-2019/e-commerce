<template>
    <v-container fluid>
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
      <v-row dense>
        <v-col
          v-for="ebook in ebooks"
          :key="ebook.title"
          :cols="ebook.flex"
        >
          <v-card>
            <v-img
              v-if="!ebook.image_url"
              src="@/assets/no-image-available.png"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="ebook.name"></v-card-title>
            </v-img>
            <v-img
              v-if="ebook.image_url"
              :src="ebook.image_url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="ebook.name"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-cart</v-icon>
              </v-btn>


              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    alert: false,
    message: '',
    ebooks: [],
  }),
  created() {
    this.$store.state.superagent
      .get(`${this.$store.state.url_backend}/products/1`)
      .set('accesstoken', this.$store.state.isLogin)
      .end((err, res) => {
        if (err) {
          this.alert = true;
          this.message = res ? res.body.error : err;
        } else {
          const ebooks = res.body.map((ebook) => {
            ebook.flex = 6;
            return ebook;
          });
          this.ebooks = ebooks;
        }
      });
  },
};
</script>
<style scoped>
</style>
