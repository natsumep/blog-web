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
            !detail.anonymous && detail.user && detail.user.avatar
              ? detail.user.avatar
              : defaultAvatar
          "
          alt=""
        />
        <p class="name">
          {{
            !detail.anonymous && detail.user && detail.user.nickName
              ? detail.user.nickName
              : '匿名'
          }}
        </p>
        <p class="time">创建于 {{ detail.createTime }}</p>
        <p class="time">
          <span
            role="button"
            class="show-comment"
            @click="openComment = !openComment"
          >
            评论 {{ detail.supplementTotal || 0 }}</span
          >
          · 浏览 {{ detail.views || 0 }}
        </p>
      </div>

      <markdown-viewer v-if="detail.val" :value="detail.val" height="100%" />
      <div class="tag-outter">
        <span
          v-for="(tag, tagid) in detail.type"
          :key="tagid"
          class="tag-wrapper"
          >{{ tag }}</span
        >
      </div>
      <!-- 评论 -->
      <comments
        v-show="openComment"
        api="qa/getsupplement"
        post-api="qa/supplement"
        id-name="qaId"
        type="问题补充"
        @showComments="showComments"
      />
    </div>
    <p class="title-h1 qa-detail">{{ total || 0 }} 个回复</p>
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
          <viewer
            v-if="item.answer"
            :initial-value="item.answer"
            height="100%"
          />
        </div>
        <p
          class="comments-btn"
          role="button"
          @click="
            item.hasMyComment = !item.hasMyComment
            changeHasMyComment(index, item)
          "
        >
          评论
        </p>
        <comment-box
          v-show="item.hasMyComment"
          :rows="4"
          :answer-id="item.id"
          id-name="qaId"
          post-api="qa/comment"
          :has-cancel="false"
          @refresh="refreshComment(index)"
        />
        <div class="comments">
          <comments
            ref="getComment"
            api="qa/getcomment"
            post-api="qa/comment"
            id-name="qaId"
            :qa-id="item.id"
            :has-my-comment="false"
            type="回答"
          />
        </div>
      </div>
    </div>
    <div v-show="userStore.token">
      <p class="title-h1 qa-detail">撰写回答</p>
      <!-- <ask :not-header="true" @answer="getAnswerList" /> -->
    </div>
  </div>
</template>

<script>
import { userStore } from '~/store'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { dateFormat } from '~/utils/time'
export default {
  components: {},
  filters: {
    formatTime: (val) => {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(val).getTime())
    },
  },
  data() {
    return {
      userStore,
      defaultAvatar: require('~/assets/images/user-default.png'),
      openComment: true,
      detail: {},
      total: 0,
      answerList: [],
      refreshAnswer: false,
    }
  },
  mounted() {
    this.loadData()
    this.getAnswerList()
  },
  destroyed() {},
  methods: {
    showComments(val) {
      this.openComment = val
    },
    changeHasMyComment(index, item) {
      this.$set(this.answerList, index, item)
    },
    refreshComment(index) {
      this.$refs.getComment[index].getList()
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
            (this.detail.createTime = dateFormat(
              'YYYY-mm-dd HH:MM:SS',
              this.detail.createTime
            ))
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
          this.answerList = data.list
          this.answerList.forEach((item) => {
            item.hasMyComment = false
          })
          this.total = data.total
          this.refreshAnswer = false
        }
      )
    },
  },
}
</script>

<style lang="less" scoped>
.section {
  padding: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.answer-section {
  width: 1200px;
  margin: 10px auto;
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.qa-detail {
  width: 1200px;
  margin: 24px auto;
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
  color: #999;
  font-size: 12px;
  margin: 14px 0 24px;
}

.name {
  margin-left: 14px;
}

.time {
  margin-left: 30px;
}

.show-comment {
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #ffd04b;
  }
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #eee;
  object-fit: contain;
}

.tag-outter {
  margin: 24px 0;
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
  z-index: 5;
  color: #c0c4cc;
  font-size: 20px;
  cursor: pointer;
}

.answer-content {
  width: 90%;
  margin: 0 auto;
}
.comments {
  margin-top: 10px;
  padding: 14px;
  background-color: rgba(245, 245, 245, 0.6);
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
