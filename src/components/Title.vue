<template>
  <div class="fixed">
    <div class="inner">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :default-active="$route.path"
        :router="true"
        background-color="#313131"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item index="/">文章列表</el-menu-item>
        <el-menu-item index="/article/edit">添加文章</el-menu-item>
        <el-menu-item index="/qa">问答</el-menu-item>
        <el-menu-item index="/api">开放接口</el-menu-item>
        <el-menu-item index="/about">碎碎念</el-menu-item>
        <el-menu-item index="/comment">留言</el-menu-item>
      </el-menu>
      <div class="user-top-wrapper flex">
        <el-popover
          v-model="visible"
          placement="bottom"
          width="120"
          trigger="hover"
        >
          <div style="text-align: right; margin: 0" @click="visible = !visible">
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
            <div class="user-solid" @click="visible = !visible">
              <img v-if="token" class="avatar" :src="info.avatar" alt="" />
              <i
                v-else
                style="font-size: 24px; color: #fff"
                class="el-icon-user-solid"
              ></i>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <el-dialog
      title=""
      width="600px"
      top="10vh"
      custom-class="login-dialog"
      destroy-on-close
      :visible.sync="loginVisible"
      append-to-body
      :show-close="false"
      @close="handleLoginHidden"
    >
      <login-panda></login-panda>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { userStore } from '~/store'
import { exit } from '~/utils/loginPreservationUserInfo'

@Component
export default class Index extends Vue {
  visible = false
  loginVisible = false
  info = {
    nickname: '',
    avatar: '',
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

  @Watch('dialog')
  changeVisible(isShow: boolean) {
    this.loginVisible = isShow
  }

  @Watch('userInfo')
  changeUserInfo(val: any) {
    this.info.nickname = val.nickname
    this.info.avatar = val.avatar || require('~/assets/images/user-default.png')
  }

  created() {
    this.info = {
      ...this.info,
      ...this.userInfo,
    }
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
  width: 36px;
  height: 36px;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
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
