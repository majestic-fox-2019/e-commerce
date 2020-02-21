<template>
  <div>
        <button type="button" class="btn btn-primary"
        data-toggle="modal" data-target="#addModal">ADD</button>
        <button type="button" class="btn btn-primary"
        v-on:click = "$emit('getCategory',null)">showAll</button>
        <button v-for = "(category,idx) in categories"
        :key="idx" type="button" class="btn btn-primary"
        v-on:click = "$emit('getCategory',category.name)">{{category.name}}</button>
  </div>
</template>

<script>
export default {
  name: 'buttonCategory',
  data() {
    return {
    };
  },
  props: ['categories'],
};
</script>

<style>

</style>
