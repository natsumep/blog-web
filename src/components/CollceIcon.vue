<template>
  <div
    v-loading="isLoad"
    class="like-button"
    element-loading-spinner="el-icon-loading"
    :class="{ liked: isActive }"
    @click="changeLike"
  >
    <img
      class="collce-icon"
      :class="{ 'collce-icon-active': isActive, 'can-click': canClick }"
      :style="{ width: width + 'px', height: width + 'px' }"
      src="~/assets/images/collce_btn.svg"
      alt=""
      srcset=""
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  @Prop({ default: false }) private isActive!: boolean
  @Prop({ default: false }) private isLoad!: boolean
  @Prop({ default: true }) private canClick!: boolean
  @Prop({ default: 24 }) private width!: number

  @Emit()
  change() {}

  changeLike() {
    if (this.isLoad) return
    this.change()
  }
}
</script>

<style lang="less" scoped>
.collce-icon {
  filter: grayscale(100);
}
.can-click {
  cursor: pointer;
}
.collce-icon-active {
  filter: grayscale(0);
}
</style>
