<template>
  <div class="fixed">
    <div class="inner">
      <el-menu
        v-if="isWeb"
        class="el-menu-demo"
        mode="horizontal"
        :default-active="$route.path"
        :router="true"
        background-color="#313131"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item v-if="token" :index="`/${userInfo.home}`"
          >我的主页</el-menu-item
        >
        <el-menu-item index="/">文章列表</el-menu-item>
        <el-menu-item index="/article/edit">添加文章</el-menu-item>
        <el-menu-item index="/q">问答</el-menu-item>
        <el-menu-item index="/sentence">句子杂货铺</el-menu-item>
        <el-menu-item index="/caihong">彩虹屁🌈</el-menu-item>

        <el-menu-item index="/core">开放接口</el-menu-item>
        <!-- <el-menu-item index="/about">碎碎念</el-menu-item> -->
        <el-menu-item index="/comment">留言</el-menu-item>
      </el-menu>
      <div v-else class="flex-item-center">
        <i class="menu-btn el-icon-menu" @click="drawer = true"></i>
        <el-drawer
          :visible.sync="drawer"
          :append-to-body="true"
          title="菜单"
          size="50%"
          direction="ltr"
        >
          <el-menu
            :default-active="$route.path"
            :router="true"
            @select="drawer = false"
          >
            <el-menu-item v-if="token" :index="`/${userInfo.home}`"
              >我的主页</el-menu-item
            >
            <el-menu-item index="/">文章列表</el-menu-item>
            <el-menu-item index="/q">问答</el-menu-item>
            <el-menu-item index="/sentence">句子杂货铺</el-menu-item>
            <el-menu-item index="/caihong">彩虹屁🌈</el-menu-item>

            <el-menu-item index="/core">开放接口</el-menu-item>
            <!-- <el-menu-item index="/about">碎碎念</el-menu-item> -->
            <el-menu-item index="/comment">留言</el-menu-item>
          </el-menu>
        </el-drawer>
      </div>

      <div class="user-top-wrapper flex">
        <el-popover placement="bottom" width="120" trigger="click">
          <div style="text-align: right; margin: 0">
            <router-link :to="{ name: 'user' }" class="pop-btn"
              >注册</router-link
            >
            <router-link
              v-if="token"
              :to="{ name: 'user', query: { edit: true } }"
              class="pop-btn"
              >编辑</router-link
            >

            <div class="pop-btn" role="button" @click="loginToggle">
              {{ token ? '退出' : '登录' }}
            </div>
          </div>
          <div slot="reference" class="flex-item-center">
            <p class="username">{{ info.nickname }}</p>
            <div class="user-solid" :class="{ 'user-active': token }">
              <img v-if="token" class="avatar" :src="info.avatar" alt="" />
              <div v-else class="flex" style="color: #fff">
                <i
                  style="font-size: 24px; color: #fff"
                  class="el-icon-user-solid"
                ></i
                >点击登录
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <el-dialog
      title=""
      :width="isWeb ? '600px' : '100%'"
      top="10vh"
      custom-class="login-dialog"
      destroy-on-close
      :visible.sync="loginVisible"
      append-to-body
      :show-close="false"
      @close="handleLoginHidden"
    >
      <login-panda></login-panda>
      <div class="flex-center" style="padding: 20px">
        <i
          class="el-icon-circle-close"
          style="font-size: 40px; color: #fff; cursor: pointer"
          @click="loginVisible = false"
        ></i>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { userStore, systemStore } from '~/store'
import { exit } from '~/utils/loginPreservationUserInfo'
@Component
export default class Index extends Vue {
  userDefault = require('~/assets/images/user-default.png')
  visible = false
  loginVisible = false
  drawer = false
  info = {
    nickname: '',
    avatar: this.userDefault,
  }

  get userInfo() {
    return userStore.userinfoObj
  }

  get token() {
    return userStore && userStore.token
  }

  get dialog() {
    return userStore && userStore.loginDialogVisible
  }

  get isWeb() {
    return systemStore.isWeb
  }

  @Watch('dialog')
  changeVisible(isShow: boolean) {
    this.loginVisible = isShow
  }

  @Watch('userInfo')
  changeUserInfo(val: any) {
    this.info.nickname = val.nickname
    this.info.avatar = val.avatar || this.userDefault
  }

  created() {
    this.info = {
      ...this.info,
      ...this.userInfo,
    }
    this.info.avatar = this.info.avatar || this.userDefault
  }

  handleLoginHidden() {
    userStore.set_login_dialog_visible(false)
  }

  loginToggle() {
    this.token ? exit() : userStore.set_login_dialog_visible(true)
  }
}
</script>
<style lang="less" scoped>
.inner {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.fixed {
  background: #313131;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
}
.user-top-wrapper {
  align-items: center;
}
.user-solid {
  height: 36px;
  padding: 3px 10px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
}
.user-active {
  padding: 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background: #fff;
}

.username {
  max-width: 84px;
  font-size: 14px;
  color: #fff;
  margin-left: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.pop-btn {
  line-height: 32px;
  text-align: center;
  display: block;
  color: #313131;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
}
.menu-btn {
  color: #fff;
  font-size: 32px;
}
@media screen and (max-width: 400px) {
  .inner {
    width: 100%;
    padding: 0 10px;
  }
  .el-menu-demo {
    position: absolute;
  }
}
</style>

<style>
.login-dialog {
  box-shadow: none;
  background-color: transparent;
  margin-bottom: 0;
}
.login-dialog .el-dialog__body,
.login-dialog .el-dialog__header {
  padding: 0;
}
</style>
