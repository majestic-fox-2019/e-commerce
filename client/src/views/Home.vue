<template>
  <div>
    <adminNavbar></adminNavbar>
    <AdminControl></AdminControl>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import adminNavbar from '@/components/Navbar.vue';
import AdminControl from '@/components/AdminControl.vue';


export default {
  name: 'Home',
  components: {
    AdminControl,
    adminNavbar,
  },
  data() {
    return {
      alldata: '',
    };
  },
};
</script>
