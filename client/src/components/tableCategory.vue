<template>
  <div>
    <div class="judul" style="text-align:center">
      <h1>Category Table</h1>
    </div>
    <div class="button">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addModal">
        ADD
      </button>
    </div>
    <div class="table">
      <div></div>
      <br />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-for="(category, idx) in showData" :key="idx">
          <categoryContain :category="category" :idx="idx"></categoryContain>
        </tbody>
      </table>
    </div>
    <!-- Modal ADD -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Add Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="addCategory">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import categoryContain from './categoryContain.vue';

export default {
  name: 'tableCategory',
  data() {
    return {
      form: {
        name: null,
      },
    };
  },
  components: {
    categoryContain,
  },
  created() {
    this.$store.dispatch('showData');
    this.$store.dispatch('showCategory');
  },
  computed: {
    showData() {
      return this.$store.state.dataCategories;
    },
  },
  methods: {
    addCategory() {
      this.$axios({
        method: 'post',
        url: '/category',
        headers: { token: localStorage.token },
        data: {
          name: this.form.name,
        },
      })
        .then(() => {
          window.$('#addModal').modal('hide');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$store.dispatch('showCategory');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
