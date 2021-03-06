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
        @click="release"
        >发布</el-button
      >
      <div v-else>
        <el-popover v-model="visible" placement="top" width="300">
          <p style="text-align: center; margin-bottom: 14px">
            您尚未登录, 可自定义邮箱或者昵称哦~
          </p>
          <el-form label-width="60px">
            <el-form-item label="昵称" style="margin-bottom: 0">
              <el-input v-model="commentNickName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="commentEmail" size="mini"></el-input>
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
    pid: {
      type: [String, Number],
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      placeholder: '写下你的评论...',
      hasInfo: false,
      visible: false,
      comment: '',
      commentNickName: '',
      commentEmail: '',
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
    nickName(val) {
      if (val) {
        this.comment = ''
        this.placeholder = `@${val} `
      }
    },
    email(val) {
      if (val && !this.nickName) {
        this.comment = ''
        this.comment += `@${val} `
      }
    },
  },
  created() {
    this.setInfo()
  },
  mounted() {},
  methods: {
    setInfo() {
      const userInfo = this.userInfo
      if (userInfo) {
        this.commentNickName = userInfo.nickname
        this.commentEmail = userInfo.email
        ;(this.commentNickName.trim() || this.commentEmail.trim()) &&
          (this.hasInfo = true)
        return
      }
      if (sessionStorage.getItem('comment_info')) {
        this.commentNickName = JSON.parse(
          sessionStorage.getItem('comment_info')
        ).nickName
        this.commentEmail = JSON.parse(
          sessionStorage.getItem('comment_info')
        ).email
        ;(this.commentNickName.trim() || this.commentEmail.trim()) &&
          (this.hasInfo = true)
      }
    },
    release() {
      this.visible = false
      const comment = this.comment.trim()
      if (!comment) {
        this.$message.error('请输入评论内容')
        return
      }
      if (comment.length > 200) {
        this.$message.error('评论内容最多支持200')
        return
      }
      // 未登录的话让他自己掰个昵称或邮箱
      if (!this.userInfo) {
        const obj = {
          nickName: this.commentNickName,
          email: this.commentEmail,
        }
        sessionStorage.setItem('comment_info', JSON.stringify(obj))
        ;(this.commentNickName.trim() || this.commentEmail.trim()) &&
          (this.hasInfo = true)
      }
      const data = {
        articleId: this.$route.params.id,
        pid: this.pid, //   如果是回复的别人的回复需要传回复的id
        comment,
        nickName: this.commentNickName,
        email: this.commentEmail,
      }
      this.$api['comments/create'](data)
        .then(() => {
          this.comment = ''
          this.$emit('refresh')
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
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
