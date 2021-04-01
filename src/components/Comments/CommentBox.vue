<template v-slot:commentBox>
  <div class="comment-box-wrapper">
    <el-input
      v-model="comment"
      type="textarea"
      :placeholder="placeholder"
      :rows="rows"
    ></el-input>
    <div class="btn-wrapper">
      <el-button
        v-if="hasInfo"
        size="mini"
        style="margin-left: 10px"
        type="primary"
        round
        @click="postData"
        >发布</el-button
      >
      <div v-else>
        <el-popover v-model="visible" placement="top" width="300">
          <p style="text-align: center; margin-bottom: 14px">
            您尚未登录, 可自定义邮箱或者昵称哦~
          </p>
          <el-form ref="form" :model="user" label-width="60px">
            <el-form-item
              prop="commentNickName"
              label="昵称"
              style="margin-bottom: 10px"
              :rules="{
                required: true,
                message: '昵称不能为空',
                trigger: 'blur',
              }"
            >
              <el-input
                v-model="user.commentNickName"
                maxlength="10"
                show-word-limit
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="commentEmail"
              :rules="[
                {
                  required: true,
                  message: '请输入邮箱地址',
                  trigger: ['blur', 'change'],
                },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
              label="邮箱"
            >
              <el-input
                v-model="user.commentEmail"
                maxlength="50"
                show-word-limit
                placeholder="邮箱不会被公布"
                size="mini"
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button
              size="mini"
              type="text"
              @click="
                visible = false
                commentNickName = ''
                commentEmail = ''
              "
              >取消</el-button
            >
            <el-button type="primary" size="mini" @click="release"
              >确定</el-button
            >
          </div>
          <el-button
            slot="reference"
            size="mini"
            style="margin-left: 10px"
            type="primary"
            round
            >发布</el-button
          >
        </el-popover>
      </div>
      <el-button v-if="hasCancel" size="mini" round @click="hideBox"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import { userStore } from '~/utils/store-accessor'

export default {
  props: {
    layout: {
      type: String,
      default: 'block', // 'flex' 浮窗使用
    },
    type: {
      type: String,
      default: '评论',
    },
    rows: {
      type: Number,
      default: 2,
    },
    hasCancel: {
      type: Boolean,
      default: true,
    },
    nickName: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      placeholder: `写下你的${this.type}...`,
      hasInfo: false,
      visible: false,
      comment: '',
      user: {
        commentNickName: '',
        commentEmail: '',
      },
    }
  },
  computed: {
    userInfo() {
      return userStore.userinfoObj
    },
  },
  watch: {
    userInfo(val) {
      val && this.setInfo()
    },
  },
  created() {
    this.setInfo()
  },
  mounted() {
    const nikeName =
      (this.item.user && this.item.user.nickName) || this.item.nickName
    if (nikeName) {
      this.placeholder = `回复 @${nikeName}`
    }
  },
  methods: {
    setInfo() {
      const userInfo = this.userInfo
      if (userInfo) {
        this.commentNickName = userInfo.nickname || ''
        this.commentEmail = userInfo.email || ''
        ;(this.commentNickName.trim() || this.commentEmail.trim()) &&
          (this.hasInfo = true)
        return
      }
      if (sessionStorage.getItem('comment_info')) {
        this.user.commentNickName = JSON.parse(
          sessionStorage.getItem('comment_info')
        ).nickName
        this.user.commentEmail = JSON.parse(
          sessionStorage.getItem('comment_info')
        ).email
        ;(this.user.commentNickName.trim() || this.user.commentEmail.trim()) &&
          (this.hasInfo = true)
      }
    },
    release() {
      this.$refs.form.validate((v) => {
        if (v) {
          this.visible = false
          this.postData()
        }
      })

      // this.$api[this.postApi](data)
      //   .then(() => {
      //     this.comment = ''
      //     this.$message.success('新增成功')
      //     this.$emit('refresh')
      //   })
      //   .catch((err) => {
      //     this.$message.error(err.msg)
      //   })
    },
    postData() {
      const comment = this.comment.trim()
      if (!comment) {
        this.$message.error(`请输入${this.type}内容`)
        return
      }
      if (comment.length > 200) {
        this.$message.error(`${this.type}内容最多支持200字`)
        return
      }

      if (!this.userInfo) {
        const obj = {
          nickName: this.user.commentNickName,
          email: this.user.commentEmail,
        }
        sessionStorage.setItem('comment_info', JSON.stringify(obj))
        ;(this.user.commentNickName.trim() || this.user.commentEmail.trim()) &&
          (this.hasInfo = true)
      }
      const data = {
        comment,
        nickName: this.user.commentNickName,
        email: this.user.commentEmail,
      }
      this.comment = ''
      this.$emit('addItem', data)
    },
    hideBox() {
      this.$emit('hideBox')
    },
  },
}
</script>

<style lang="less" scoped>
.comment-box-wrapper {
  width: 100%;
}

.btn-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
}
</style>
