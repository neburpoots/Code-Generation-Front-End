<template>
  <tr>
    <td scope="row">{{ user.user_id }}</td>
    <td>{{ user.firstname }}</td>
    <td>{{ user.lastname }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.iban }}</td>
  </tr>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: Object,
  },
};
</script>

<style>
</style>