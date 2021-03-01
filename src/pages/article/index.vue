<template>
  <div
    style="height: 100%; padding-top: 20px; min-height: calc(100vh - 66px)"
  ></div>
</template>

<script>
// import { easeout } from '~/utils/animation'
export default {
  mounted() {
    if (!this.$route.params.id) {
      this.$router.replace('/')
    }
    this.id = this.$route.params.id
  },

  destroyed() {},
  created() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.top-system {
  span {
    margin-right: 20px;
  }
}
</style>
