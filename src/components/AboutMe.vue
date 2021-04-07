/* eslint-disable vue/no-v-html */
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>About Me</span>
    </div>
    <div>
      <div class="flex flex-just-center">
        <img class="user-img" :src="userinfo.avatar || userDefault" alt="" />
      </div>
      <div class="text-centen" style="color: #3c68e6; margin-bottom: 10px">
        {{ userinfo.nickname }}
      </div>
      <div
        v-if="!profile"
        class="text-centen"
        style="font-size: 13px; color: #999"
      >
        这个人很懒，啥都没留下~~
      </div>
      <div v-else style="font-size: 14px; color: #333" v-html="profile"></div>
    </div>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  userDefault = require('~/assets/images/user-default.png')

  @Prop()
  userinfo!: any

  get profile() {
    const userinfo = this.userinfo
    return userinfo && userinfo.profile
  }
}
</script>

<style lang="less" scoped>
.user-img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
</style>
