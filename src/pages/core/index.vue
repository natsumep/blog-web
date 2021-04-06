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
  head: {
    title: '句子杂货铺/彩虹屁🌈 文档 _ docs',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: `句子杂货铺：这是一个分类句子合集,你可以查看、收藏、喜欢各种各样的句子，还可以上传自己喜欢的句子，利用chrome插件，可以在chrome浏览器查看句子，上传句子。
          开放的句子api接口，可以通过接口查询到句子`,
      },
      {
        name: 'keywords',
        content: '句子 杂货铺 文艺 chrome插件 句子api接口 句子合集 彩虹屁🌈',
      },
    ],
  },
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
