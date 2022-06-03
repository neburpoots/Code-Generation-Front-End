<template>
    <tr>
      <td scope="row">{{user.user_id}}</td>
      <td>{{user.email}}</td>
      <td>{{user.firstname}} {{user.lastname}}</td>
      <td>  
        <div v-if="selected">
            User selected
        </div>      
        <button v-if="!selected" class="btn ml-2 btn-primary" @click="selectUser(user.user_id)">
          Select user
        </button>
      </td>
    </tr>
</template>


<script>
export default {
  name: "AllAcountsListItem",
  props: {
    user: Object,
    selected: Boolean
  },
  methods: {
    selectUser(id) {
      this.$emit('selectUser', id);
    },
  }
};
</script>

<style>

</style>