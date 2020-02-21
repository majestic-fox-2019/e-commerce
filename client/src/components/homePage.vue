<template>
    <div>
        <navBar></navBar>
        <router-view></router-view>

    </div>
</template>

<script>
import navBar from './navBar.vue';

export default {
  name: 'homePage',
  components: {
    navBar,
  },
};
</script>

<style>

</style>
