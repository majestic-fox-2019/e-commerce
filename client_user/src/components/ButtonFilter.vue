<template>
    <div class="dropdown">
      <a :class="`dropdown-toggle ${customStyle}`" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter by category
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <router-link class="dropdown-item" :to="{ name: 'ProductList', params : { category: 'allproduct' } }">All Product</router-link>
        <router-link :key="i" v-for="(category, i) in categories" class="dropdown-item" 
        :to="{ name: 'ProductList', params : { category: category.id } }">{{ category.category_name }}</router-link>
      </div>
    </div>  
</template>

<script>
export default {
  name: 'ButtonFilter',
  props: ['categories', 'customStyle']
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>