<template>
  <div>
    <table class="table table-striped table-bordered table-hover">
        <thead class="text-center">
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          <tr :key="i" v-for="(user, i) in data_user" class="text-center">
            <td>{{ i+1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <th><span :class="user.roles === 'admin' ? 'badge badge-primary' : 'badge badge-success'">{{ user.roles }}</span></th>
            <td>
              <router-link :to="{ name: 'UpdateUser', params : { user_id : user.id } }" class="btn btn-sm btn-info text-light"><i class="fa fa-pencil" aria-hidden="true"></i></router-link>&nbsp;
              <ButtonDelete :data_id="user.id" content="users"/>
            </td>
          </tr>
      </tbody>
      <!-- <tbody v-else>
        <tr>
            <td colspan="5" class="text-center p-2"><h5>{{ data_user.message }}</h5></td>
        </tr>
      </tbody> -->
    </table>  
  </div>
</template>

<script>
import ButtonDelete from '../components/Main/layouts/ButtonDelete';

export default {
  name : "Table",
  props : ["data_user"],
  components : {
    ButtonDelete
  },
  data(){
    return {
      pageSize : null
    }
  },
  mounted(){
    this.pageSize = this.data_user
  },  
}
</script>

<style>
  thead{
    font-size: 14px;
  }
  tbody {
    font-size: 12px;
  }
</style>