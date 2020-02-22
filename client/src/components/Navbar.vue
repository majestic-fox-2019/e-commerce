<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <b-navbar-brand>e-commerce</b-navbar-brand>
        <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#" @click="logout">logout</b-nav-item>
            </b-navbar-nav>
        </b-collapse>   
    </b-navbar>
  </div>
</template>

<script>
export default {
    methods: {
        logout(){
            localStorage.clear()
        }
    }
}
</script>

<style>

</style>