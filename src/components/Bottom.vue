<template>
  <div>
    <div v-if="isWeb" class="footer">
      <div>
        2019 ~ {{ new Date().getFullYear() }} 🐈 Copyright© by pp - zy ✏
        <div>
          备案号：<a href="http://beian.miit.gov.cn/" target="_blank"
            >湘ICP备20010808号</a
          >
        </div>
      </div>
      <span style="color: #666; margin-left: 10px">
        今日访问量 {{ views.toDoyCount }}; 总计访问量
        {{ views.count }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { systemStore } from '~/utils/store-accessor'
@Component
export default class Index extends Vue {
  views: any = {}
  get isWeb() {
    return systemStore.isWeb
  }

  async created() {
    const data = await this.$axios.get('/views').catch()
    this.views = data
  }
}
</script>
<style>
.footer {
  min-height: 20px;
  text-align: center;
  padding: 12px;
}
</style>
