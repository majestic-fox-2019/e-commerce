<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">Category List</h3>
    <div class="text-right mb-4">
      <button @click="gotoAddForm" class="btn btn-light font-weight-bold">
        <i :class="isAddData ?'fa fa-arrow-left mr-2': 'fa fa-plus mr-2'"></i>
        {{isAddData ? 'Cancel' : 'ADD'}}
      </button>
    </div>
    <div v-if="!isAddData">
      <div v-if="Array.isArray(categories)">
        <table class="table text-white table-dark text-left">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, i) in categories" :key="category.id">
              <th scope="row">{{i +1}}</th>
              <td>{{category.name}}</td>
              <td>
                <router-link :to="{name: 'UpdateCategory', params: {id: category.id}}">
                  <i class="btn btn-info fa mx-2 fa-edit"></i>
                </router-link>

                <!-- <router-link :to="{name: 'DeleteCategory', params: {id: category.id}}"> -->
                  <i @click.prevent="deleteCategory(category.id)" class="btn btn-warning fa mx-2 fa-trash"></i>
                <!-- </router-link> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <no-data v-else :msg="categories.message" />
    </div>
    <router-view @success-add-category="success"></router-view>
  </div>
</template>

<script>
import NoData from "../components/NoData";
import api from '../helper/api'
export default {
  components: {
    NoData
  },
  data() {
    return {
      isAddData: false
    };
  },
  methods: {
    gotoAddForm() {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/category");
      } else {
        this.$router.push({ name: "AddCategory" });
      }
    },
    success() {
      this.isAddData = !this.isAddData;
      this.$store.dispatch("getCategories");
    },
    updateCategory() {
      this.$router.push({
        name: "UpdateCategory",
        params: { id: categoriy.id }
      });
    },
    deleteCategory(id){
      api
        .delete(`/categories/${id}`, {headers: {token: localStorage.access_token}})
        .then(({data}) => {
          console.log(data)
          this.$store.dispatch('getCategories')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    if (this.categories === null) {
      this.$store.dispatch("getCategories");
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>

<style>
</style>
