<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant.sync="miniVariant"
    :src="bg"
    dark
    absolute
    app
  >
    <v-list
      dense
      nav
      class="py-0"
    >
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img :src="profile">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>E-commerce CMS</v-list-item-title>
          <v-list-item-subtitle>{{name}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="submit(item.link)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/categories' },
        { title: 'User', icon: 'mdi-account', link: '/user' },
        { title: 'Logout', icon: 'mdi-logout', link: 'logout' },
      ],
      color: 'blue',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      miniVariant: true,
      expandOnHover: true,
      background: false,
    };
  },
  methods: {
    submit(type) {
      if (type === 'logout') {
        this.logout();
      } else {
        this.$router.push(type);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login' });
    },
  },
  computed: {
    name() {
      return localStorage.name;
    },
    profile() {
      return `https://dummyimage.com/200x200/000/fff&text=${localStorage.name[0]}`;
    },
    bg() {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined;
    },
  },
};
</script>
