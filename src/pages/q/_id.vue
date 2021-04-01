<template>
  <div>
    <el-breadcrumb
      style="width: 1200px; margin: 24px auto"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/q' }">问答</el-breadcrumb-item>
      <el-breadcrumb-item>问答详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="section qa-detail" style="margin-top: 24px">
      <h1 class="title">{{ detail.title }}</h1>
      <div v-if="detail.canDelete" class="del">
        <el-popconfirm title="确定删除这篇文章吗？" @confirm="del">
          <i slot="reference" class="el-icon-delete"></i>
        </el-popconfirm>
      </div>

      <div class="info">
        <img
          class="avatar"
          :src="
            detail.user && detail.user.avatar
              ? detail.user.avatar
              : defaultAvatar
          "
          alt=""
        />
        <p class="name">
          {{
            detail.user && detail.user.nickName
              ? detail.user.nickName
              : detail.nickName
              ? detail.nickName
              : '匿名'
          }}
        </p>
        <p class="time">创建于 {{ detail.createTime }}</p>
      </div>
      <client-only placeholder="markdow内容loading...">
        <markdown-viewer
          v-if="detail.val && isClient"
          :value="detail.val"
          height="100%"
        />
      </client-only>
      <div class="tag-outter">
        <span
          v-for="(tag, tagid) in detail.type"
          :key="tagid"
          class="tag-wrapper"
          >{{ tag }}</span
        >
      </div>
      <div style="padding-bottom: 10px">
        <span
          role="button"
          class="show-comment"
          @click="openComment = !openComment"
        >
          问题补充 [ {{ supplementComment.length || 0 }} ]</span
        >
        <span style="font-size: 20px; margin: 0 3px"> · </span
        ><span style="color: #888"> 浏览：{{ detail.views || 0 }}</span>
      </div>
      <!-- 评论 -->
      <comments
        :show-comment="!!openComment"
        :has-cancel="true"
        :comments="supplementComment"
        id-name="qaId"
        type="问题补充"
        @deleteItem="deleteSupplementComment"
        @addItem="addSupplementComment"
        @hideBox="openComment = false"
      />
    </div>

    <div class="qa-detail" style="background: none; padding: 0">
      <p class="title-h1">{{ total || 0 }} 个回复</p>
      <div
        v-if="total === 0"
        style="text-align: center; color: #999; padding: 20px"
      >
        等待回复中...
      </div>
      <div v-if="!refreshAnswer">
        <div
          v-for="(item, index) in answerList"
          :key="index"
          class="answer-section"
        >
          <div class="info" style="margin-bottom: 14px">
            <img
              class="avatar"
              :src="
                !item.anonymous && item.user && item.user.avatar
                  ? item.user.avatar
                  : defaultAvatar
              "
              alt=""
            />
            <p class="name">
              {{ !item.anonymous && item.user ? item.user.nickName : '匿名' }}
            </p>
            <p class="time">创建于 {{ item.createTime | formatTime }}</p>
          </div>
          <div class="answer-content">
            <client-only placeholder="markdow内容loading...">
              <markdown-viewer
                v-if="item.answer"
                :value="item.answer"
                height="100%"
              />
            </client-only>
          </div>
          <p
            class="comments-btn"
            role="button"
            @click="item.hasMyComment = !item.hasMyComment"
          >
            评论
          </p>
          <div class="comments">
            <comments
              :comments="item.children"
              :show-comment="!!item.hasMyComment"
              :has-cancel="true"
              @addItem="addQaComment($event, item)"
              @deleteItem="deleteQaComment($event, item)"
              @hideBox="item.hasMyComment = false"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-show="userStore.token" class="qa-detail" style="padding-bottom: 1px">
      <p class="title-h1" style="margin-top: 10px">撰写回答</p>
      <div class="widget-vertical-three-main" style="margin-top: 10px">
        <div class="flex-end">
          <el-button
            type="primary"
            style="margin: -45px 0 9px 0"
            @click="submit"
            >发表</el-button
          >
        </div>
        <client-only placeholder="markdown编辑器loading...">
          <markdown-editor v-if="isClient" ref="viweMain"></markdown-editor>
        </client-only>
      </div>
      <!-- <ask :not-header="true" @answer="getAnswerList" /> -->
    </div>
  </div>
</template>

<script>
import { userStore } from '~/store'
import { dateDiff } from '~/utils/time'
function getHTMLLength(html) {
  let div = document.createElement('div')
  div.innerHTML = html
  const length = div.textContent.trim().length
  div = null
  return length
}
export default {
  components: {
    markdownEditor: () => import('~/components/MarkdownEditor.client'),
    markdownViewer: () => import('~/components/MarkdownViewer.client'),
  },
  filters: {
    formatTime: (val) => {
      return dateDiff(val)
    },
  },
  data() {
    return {
      isClient: process.client,
      userStore,
      defaultAvatar: require('~/assets/images/user-default.png'),
      openComment: false,
      detail: {},
      total: 0,
      answerList: [],
      refreshAnswer: false,

      supplementComment: [],
      qaComment: [],
    }
  },
  mounted() {
    this.loadData()
    this.loadSupplementComment()
    this.getAnswerList()
  },
  destroyed() {},
  methods: {
    // showComments(val) {
    //   this.openComment = val
    // },
    loadSupplementComment() {
      this.$api['qa/getsupplement']({ qaId: this.$route.params.id })
        .then((data) => {
          this.supplementComment = data.map((item) => {
            item.showCommentBox = false
            item.showMoreNum = 2
            return item
          })
        })
        .catch()
    },
    deleteSupplementComment(id) {
      this.$api['qa/supplementDelete']({ id })
        .then(() => {
          this.$message.success('删除成功')
          this.loadSupplementComment()
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    addSupplementComment(dataInfo) {
      const { content, item } = dataInfo
      const option = { ...content, qaId: this.$route.params.id }
      if (item.id) {
        option.pid = item.id
      }
      this.$api['qa/supplement'](option)
        .then(() => {
          this.loadSupplementComment()
          this.$message.success('新增成功')
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    async loadQaComment(answerId) {
      let data = []
      try {
        data = await this.$api['qa/getcomment']({
          answerId,
        })
      } catch (_e) {
        return data
      }

      return (this.supplementComment = data.map((item) => {
        item.showCommentBox = false
        item.showMoreNum = 2
        return item
      }))
    },
    deleteQaComment(id, answer) {
      this.$api['qa/commentDelete']({ id })
        .then(async () => {
          this.$message.success('删除成功')
          const data = await this.loadQaComment(answer.id)
          answer.children = data
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    addQaComment(dataInfo, answer) {
      const { content, item } = dataInfo
      const option = {
        ...content,
        answerId: answer.id,
        qaId: this.$route.params.id,
      }
      if (item.id) {
        option.pid = item.id
      }
      this.$api['qa/comment'](option)
        .then(async () => {
          const data = await this.loadQaComment(answer.id)
          answer.children = data
          this.$message.success('新增成功')
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },

    changeHasMyComment(index, item) {
      this.$set(this.answerList, index, item)
    },
    del() {
      this.$api['qa/del']({ id: this.$route.params.id }).then(() => {
        this.$message.success('删除成功')
        this.$router.replace('/q')
      })
    },
    loadData() {
      this.$api['qa/detail']({ id: this.$route.params.id }).then(
        (data) => {
          this.detail = data
          this.detail.createTime &&
            (this.detail.createTime = dateDiff(this.detail.createTime))
          this.detail.type && (this.detail.type = this.detail.type.split('/'))
        },
        () => {
          this.$router.replace('/q')
        }
      )
    },
    getAnswerList() {
      this.refreshAnswer = true
      this.$api['qa/getanswer']({ qaId: this.$route.params.id }).then(
        (data) => {
          this.answerList = data.list.map((item) => {
            item.hasMyComment = false
            item.children &&
              item.children.map &&
              item.children.map((item) => {
                item.showCommentBox = false
                item.showMoreNum = 2
                return item
              })
            return item
          })
          this.total = data.total
          this.refreshAnswer = false
        }
      )
    },
    submit() {
      const answer = this.$refs.viweMain.getMarkdown()
      const length = getHTMLLength(this.$refs.viweMain.getHtml())
      if (!length) {
        this.$message.error('请输入回答内容再提交~')
        return false
      }
      const option = {
        answer,
        qaId: this.$route.params.id,
      }
      this.$api['qa/answer'](option).then(
        () => {
          this.$message.success('添加回答' + '成功')
          this.hadEdit = false
          this.$refs.viweMain.clearValue()
          this.getAnswerList()
        },
        () => {
          this.$message.error('添加回答' + '失败，请重试')
        }
      )
    },
  },
}
</script>

<style lang="less" scoped>
.section {
  position: relative;
}

.answer-section {
  width: 1200px;
  margin: 10px auto;
  padding: 8px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.qa-detail {
  width: 1200px;
  padding: 25px 50px;
  margin: 24px auto;
  background: #fff;
  border-radius: 10px;
}

.title {
  font-size: 32px;
  line-height: 1.2;
}

.title-h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 30px auto 14px;
}

.info {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 14px 0 24px;
}

.name {
  margin-left: 14px;
  color: #2196f3;
}

.time {
  margin-left: 15px;
  color: #999;
}

.show-comment {
  color: #409eff;
  cursor: pointer;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #eee;
  object-fit: contain;
}

.tag-outter {
  margin: 12px 0;
}
/deep/ .total-comment {
  display: none;
}

.tag-wrapper {
  font-size: 12px;
  font-weight: 400;
  padding: 2px 8px;
  color: #ffd04b;
  background-color: rgba(255, 208, 75, 0.1);
  margin-right: 8px;
  border-radius: 4px;
}

.del {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
  color: #c0c4cc;
  font-size: 20px;
  cursor: pointer;
}

.answer-content {
  width: 90%;
  margin: 0 auto;
}
.comments {
  margin: 10px 0 0 30px;
}
.comments-btn {
  line-height: 32px;
  font-size: 15px;
  color: #999;
  width: 90%;
  margin: 0 auto;
  cursor: pointer;
}
</style>
