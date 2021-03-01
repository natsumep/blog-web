<template>
  <div>
    <login-panda></login-panda>
    <h1 class="red">Hello {{ name }}!</h1>
  </div>
</template>

<script>
export default {
  asyncData() {
    // called every time before loading the component
    return { name: 'World' }
  },
  fetch() {
    // The fetch method is used to fill the store before rendering the page
  },
  head() {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover
}
</script>

<style>
.red {
  color: red;
}
</style>
