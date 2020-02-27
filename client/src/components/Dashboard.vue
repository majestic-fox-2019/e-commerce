<template>
  <v-app>
    <NavigationDrawer/>
    <v-content style="height:100vh;">
      <v-breadcrumbs :items="items" large>
        <v-breadcrumbs-item
          slot="item"
          slot-scope="{ item }"
          exact
          :to="item.to">
          <div :class="item.class">
            {{ item.text }}
          </div>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './NavigationDrawer.vue';

export default {
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = this.$route.meta.breadcrumb;
  },
  watch: {
    $route() {
      this.items = this.$route.meta.breadcrumb;
    },
  },
};
</script>

<style>

</style>
