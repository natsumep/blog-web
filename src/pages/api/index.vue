<template>
  <div class="api-content">
    <iframe
      ref="ifarme"
      width="100%"
      :height="height"
      src="https://api.tinker.run/docs"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  layout: 'nobottom',
})
export default class Index extends Vue {
  height = '100%'
  mounted() {}
}
</script>
<style lang="less" scoped>
.api-content {
  width: 100%;
  height: calc(100vh - 61px);
}
</style>
