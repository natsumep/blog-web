<template>
  <div>
    <div style="min-height: 100vh">
      <Nuxt />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  fetch() {},
})
export default class Home extends Vue {}
</script>
