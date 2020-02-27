<template>
    <v-card>
        <v-img
            v-if="!data.image_url"
            src="@/assets/no-image-available.png"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
        >
            <v-card-title v-text="data.name"></v-card-title>
        </v-img>
        <v-img
            v-if="data.image_url"
            :src="data.image_url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
        >
            <v-card-title v-text="data.name"></v-card-title>
            <v-card-title v-text="formatMoney(data.price)"></v-card-title>
        </v-img>

        <v-card-actions>
            Available Stock: {{ebook.stock}}
            <v-spacer></v-spacer>

            <v-btn
            icon
            @click="objBook = ebook; dialog_buy = true"
            >
            <v-icon>mdi-cart</v-icon>
            </v-btn>


            <v-btn
            icon
            @click="objBook = ebook; dialog_love = true"
            >
            <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn
            icon
            @click="objBook = ebook; dialog_bookmark = true"
            >
            <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {

};
</script>

<style>

</style>




















































<!-- Kudu sesuain -->