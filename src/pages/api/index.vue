<template>
  <div class="api-content">
    <iframe
      width="100%"
      height="100%"
      src="https://api.tinker.run/docs"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Index extends Vue {}
</script>
<style lang="less" scoped>
.api-content {
  width: 100%;
  height: calc(100vh - 61px);
}
</style>
