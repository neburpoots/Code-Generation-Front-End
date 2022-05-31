<template>
  <div class="d-flex thanksforordering">
      <div class="content">
      <h1 class="thanks">Thank you for ordering at the best videocard website</h1>
      <h2 class="pt-5 text-center">Your order with id: {{Id}} is being prepared</h2>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ThanksForOrdering',
  props: {
      Id: String
  }
}
</script>

<style>

</style>