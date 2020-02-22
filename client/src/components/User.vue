<template>
  <v-container>
    <Modal type="Add User" class="pb-2">
    </Modal>
    <v-simple-table dark fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <v-btn icon @click="deleteUser(user.id)" small>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import Modal from './ModalUser.vue';

export default {
  components: {
    Modal,
  },
  sockets: {
    users() {
      this.getUser();
    },
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http(
        {
          url: 'user',
          method: 'get',
          headers: {
            token: localStorage.token,
          },
        },
      )
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteUser(id) {
      this.$http({
        url: `user/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.$swal.fire(
            {
              title: 'Success Delete',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>

</style>
