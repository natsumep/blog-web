<template>
  <div class="user-index">
    <template v-if="!notLogin">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          >{{ isEdit ? '编辑' : '新增' }}个人资料</el-breadcrumb-item
        >
      </el-breadcrumb>

      <div class="form-wrapper">
        <el-form
          ref="userForm"
          label-position="right"
          label-width="80px"
          :model="ruleForm"
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <div style="margin: 0 0 17px 220px">
                <upload-pic
                  :check-size="true"
                  :avatar="ruleForm.avatar"
                  @avatarChange="avatarChange"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="!isEdit" label="账号" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item v-if="isEdit" label="账号">
                <span>{{ ruleForm.username }}</span>
              </el-form-item>

              <el-form-item v-if="!isEdit" label="密码" prop="password">
                <el-input
                  v-model="ruleForm.password"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item v-if="!isEdit" label="确认密码" prop="checkPass">
                <el-input
                  v-model="ruleForm.checkPass"
                  type="password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <el-form-item
                placeholder="请输入正确的email，用于更换密码"
                label="email"
                prop="email"
              >
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="自我介绍">
            <el-input
              v-model="ruleForm.profile"
              placeholder="支持自定义dom,配置个人主页about me，暂未开放。
出于安全考虑 全局样式和js代码会被过滤
如果有其他需求可以在留言提交"
              :autosize="{ minRows: 5, maxRows: 10 }"
              type="textarea"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="个人主页" prop="home">
            <el-input
              v-model="ruleForm.home"
              placeholder="个人主页支持输入1~24位字母加数字组合,通过访问 https://www.tinker.run/${个人主页} 可以进入个人主页 
暂未开放"
            ></el-input>
          </el-form-item>
          <el-form-item label="github">
            <el-input
              v-model="ruleForm.github"
              placeholder="输入个人github账号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: right">
              <el-button
                style="margin-left: 45%"
                type="primary"
                @click="submitForm"
                >保存{{ isEdit ? '编辑' : '新增' }}</el-button
              >
              <el-button @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template v-else>
      <div class="flex-center flex-warp">
        <h1 class="w-max text-centen" style="line-height: 4">error</h1>
        <h2 class="w-max text-centen" style="line-height: 4">
          由于没有登录 无法修改个人信息
        </h2>
        <h3 class="w-max text-centen" style="line-height: 4">
          前往 <nuxt-link to="/login">登录</nuxt-link> 或者
          <nuxt-link to="/user">注册</nuxt-link>
        </h3>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/no-unused-vars */

import isEmail from 'validator/es/lib/isEmail'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import { userStore } from '~/utils/store-accessor'
export default {
  data() {
    return {
      notLogin: false,
      ruleForm: {
        avatar: '',
        username: '',
        password: '',
        nickname: '',
        checkPass: '',
        name: '',
        phone: '',
        email: '',
        home: '',
        github: '',
      },
      isEdit: false,
      rules: {
        nickname: [
          {
            required: true,
            message: '请输入昵称',
            trigger: ['blur', 'change'],
          },
        ],
        username: [
          {
            required: true,
            message: '请选择账号',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: '请选择密码',
            trigger: ['blur', 'change'],
          },
        ],
        email: [
          { validator: this.validatorEmail, trigger: ['blur', 'change'] },
        ],
        phone: [
          { validator: this.validatorPhone, trigger: ['blur', 'change'] },
        ],
        home: [{ validator: this.validatorHome, trigger: ['blur', 'change'] }],
        checkPass: [
          { validator: this.validatePass2, trigger: ['blur', 'change'] },
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  watch: {
    $route() {
      this.isEdit = this.$route.query.edit && userStore.token
      this.notLogin = this.$route.query.edit && !userStore.token
      this.isEdit ? this.getUser() : this.resetForm()
    },
  },
  mounted() {
    this.isEdit = this.$route.query.edit && userStore.token
    this.notLogin = this.$route.query.edit && !userStore.token
    this.isEdit && this.getUser()
    userStore.set_login_dialog_visible(false)
  },
  destroyed() {},
  methods: {
    validatorEmail(rule, val, callback) {
      if (val && !isEmail(val)) {
        callback(new Error('请输入正确的邮箱地址'))
      }
      callback()
    },
    validatorPhone(rule, val, callback) {
      if (val && !isMobilePhone(val, ['zh-CN'])) {
        callback(new Error('请输入正确的手机号码'))
      }
      callback()
    },
    validatorHome(rule, val, callback) {
      if (val && !/^[A-Za-z0-9]{1,24}$/.test(val)) {
        callback(new Error('个人空间要求输入1~24位数字或者字母组合'))
      }
      callback()
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    getUser() {
      this.ruleForm = userStore.userinfoObj
    },
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          let api = 'user/create'
          let msg = '新增'
          if (userStore.token) {
            api = 'user/update'
            msg = '编辑'
          }
          this.$api[api](this.ruleForm).then(
            () => {
              const obj = JSON.parse(JSON.stringify(this.ruleForm))
              userStore.set_userinfo(obj)
              this.$message.success(msg + '成功')
              this.$router.replace('/')
            },
            (e) => {
              this.$message.error(e.msg || msg + '失败，请重试')
            }
          )
        } else {
          this.$message.error('请正确填写必填项')
        }
      })
    },
    resetForm() {
      this.ruleForm = { avatar: '' }
      this.$refs.ruleForm && this.$refs.ruleForm.resetFields()
    },
    avatarChange(val) {
      this.ruleForm.avatar = val
    },
  },
}
</script>

<style lang="less" scoped>
.user-index {
  width: 1200px;
  margin: 24px auto 0;
  padding: 24px;
  min-height: calc(100vh - 188px);
  background-color: rgba(255, 255, 255, 0.4);

  .form-wrapper {
    margin-top: 24px;
  }
}

.back {
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
