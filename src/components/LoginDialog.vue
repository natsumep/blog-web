<template>
  <el-dialog
    width="28%"
    title="用户登录"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :visible.sync="userStore.loginDialogVisible"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { userStore } from '~/utils/store-accessor'
import { loginAjax } from '~/utils/loginPreservationUserInfo'
import { setTokenInfo } from '~/utils/passwordManagement'
export default {
  data() {
    return {
      userStore,
      ruleForm: {},
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginAjax(this.ruleForm, (token, expiresIn) => {
            setTokenInfo(token, expiresIn)
          })
        } else {
          this.$message.error('请正确的账号或密码')
          return false
        }
      })
    },
    closeDialog() {
      this.$refs.ruleForm.resetFields()
      userStore.set_login_dialog_visible()
    },
  },
}
</script>
