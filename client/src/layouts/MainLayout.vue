<template>
  <div id="main">
    <div class="page-wrapper chiller-theme toggled">
      <AppSidebar/>
      <fade-transition origin="center" mode="out-in" :duration="150">
        <router-view></router-view>
      </fade-transition>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/layouts/AppSidebar/AppSidebar.vue'
import { FadeTransition } from "vue2-transitions";
import { url } from '../mixins/mixins'

export default {
  name: 'MainLayout',
  mixins: [url],
  components: {
    AppSidebar,
    FadeTransition
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-move {
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
  }
</style>