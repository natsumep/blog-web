<template>
  <div>
    <login-panda></login-panda>
    <div style="text-align: center">
      <nuxt-link to="/">随便看看</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'none',
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
