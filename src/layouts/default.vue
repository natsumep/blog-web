<template>
  <div>
    <Title />
    <div class="main">
      <Nuxt />
    </div>
    <Bottom />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { removeTokenCookie } from '~/utils/passwordManagement'
@Component({
  fetch() {},
})
export default class Home extends Vue {
  middleware = 'auto'
  mounted() {
    if (!this.$store.getters['user/token']) {
      removeTokenCookie()
    }
  }
}
</script>
<style>
.main {
  padding-top: 60px;
  min-height: 100vh;
}
@media screen and (max-width: 400px) {
  .main {
    height: 100vh;
  }
}
</style>
