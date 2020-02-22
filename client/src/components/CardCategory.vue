<template>
  <v-row class="justify-center" style="overflow-x:hidden;white-space:nowrap;">
    <v-col v-for="category in categories" :key=category.id class="d-flex justify-start">
    <v-card
    class="mx-2 my-2"  shaped raised>
      <v-img
        :src="`https://dummyimage.com/600x400/`+ randColor(category.id)"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        width="25vw"
        height="20vh"
      >
        <v-card-title v-text="category.name"></v-card-title>
      </v-img>
      <v-card-actions>
        <v-spacer></v-spacer>

        <!-- <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn> -->
        <v-btn icon :to="{name:`categories.id`,params: {category:category.name} }">
          <v-icon>mdi-clipboard-list</v-icon>
        </v-btn>
        <v-btn icon @click="deleteCategory(category.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  sockets: {
    connect() {
      console.log('socket connected');
    },
    category() {
      this.getCategories();
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  created() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$http({
        url: 'category',
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteCategory(id) {
      this.$http({
        url: `category/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.name = '';
          this.$swal.fire(
            {
              title: 'Success Delete',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          console.log(err.response);
          this.$swal.fire(
            {
              title: 'Error Delete',
              text: JSON.stringify(err.response.data),
              icon: 'error',
              confirmButtonText: 'Cool',
            },
          );
        });
    },
    randColor() {
      const color = (Math.random() * 0xFFFFFF).toString(16);
      return `${color}/${color}`;
    },
  },
  computed: {
  },
};
</script>
