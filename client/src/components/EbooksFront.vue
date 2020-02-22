<template>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

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
    cards: [
      { title: 'Discount 30% for Ebooks Category', src: 'https://www.odoo.com/web/image/website/1/social_default_image?unique=31255c3', flex: 6 },
      { title: 'Coupon Buy 1 Get 1 for Tutorials Category', src: 'https://1.bp.blogspot.com/-8ZwKM5M417Q/WfA9EH4HXpI/AAAAAAAAEg0/RQTAr_-I70IoN1opffOx4m5W_xtu1J2yQCLcBGAs/s640/php-mysql-logo.png', flex: 6 },
      { title: 'Discount 50% for All Category ', src: 'https://miro.medium.com/max/1200/1*aLg1-G2UAlaKpBopRnmCRg.png', flex: 6 },
    ],
  }),
};
</script>
<style scoped>
    body{
        overflow: auto;
    }
</style>
