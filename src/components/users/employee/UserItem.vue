<template>
  <tr>
    <td scope="row">{{ user.user_id }}</td>
    <td>{{ user.firstname }}</td>
    <td>{{ user.lastname }}</td>
    <td>{{ user.email }}</td>
    <td>
      <span v-if="user.iban">{{ user.iban }}</span>
      <span v-else class="text-danger">None</span>
    </td>
    <td>
      <button class="btn btn-success" @click="$emit('selected', user.user_id)">
        Edit
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "UserItem",
  emits: ["selected"],
  props: {
    user: Object,
  },
};
</script>

<style>
</style>