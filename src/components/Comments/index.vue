<template>
  <div class="comment-wrapper">
    <div v-if="hasMyComment && showComment" class="my-commoent">
      <img class="avatar" :src="avatar" alt="" />
      <comment-box
        :rows="4"
        :post-api="postApi"
        :has-cancel="false"
        :id-name="idName"
        @refresh="getList"
      />
    </div>
    <div class="comment-li">
      <p v-if="hasMyComment" class="total-comment">
        <span class="solid">|</span>全部{{ type }}
      </p>
      <p v-if="!comments.length" class="no-data">暂无数据</p>
      <template v-else>
        <div v-for="(item, index) in comments" :key="index" class="li-wrapper">
          <comment-list
            :item="item"
            @refresh="getList"
            @showBox="
              item.showCommentBox = true
              toggelBox(index, item)
              setItem(item)
            "
          >
            <template #commentLi>
              <template v-for="(option, idx) in item.children">
                <comment-list
                  v-if="idx < item.showMoreNum"
                  :key="idx"
                  :layout-block="true"
                  :item="option"
                  @refresh="getList"
                  @showBox="
                    item.showCommentBox = true
                    toggelBox(index, item)
                    setItem(option)
                  "
                ></comment-list>
              </template>
              <p
                v-show="item.children.length > 2"
                class="more"
                @click="
                  item.showMoreNum =
                    item.showMoreNum == 2 ? item.children.length : 2
                  toggelBox(index, item)
                "
              >
                {{
                  item.showMoreNum == item.children.length
                    ? '收起'
                    : `展开其他 ${item.children.length - 2} 条回复`
                }}
              </p>
            </template>

            <template #commentBox>
              <comment-box
                v-show="item.showCommentBox"
                style="width: calc(100% - 46px); margin-left: 46px"
                :nick-name="nickName"
                :pid="pid"
                :index="index"
                :email="email"
                :answer-id="qaId"
                :id-name="idName"
                :post-api="postApi"
                :type="type"
                @refresh="getList"
                @hideBox="
                  item.showCommentBox = false
                  toggelBox(index, item)
                "
              ></comment-box>
              <p
                v-show="!item.showCommentBox"
                role="button"
                class="edit-outline"
                @click="
                  item.showCommentBox = true
                  toggelBox(index, item)
                  setItem(item)
                "
              >
                <i class="el-icon-edit-outline"></i> 添加新评论
              </p>
            </template>
          </comment-list>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CommentList from './CommentList'
import CommentBox from './CommentBox'
import { userStore } from '~/utils/store-accessor'
export default {
  components: {
    CommentList,
    CommentBox,
  },
  props: {
    qaId: {
      type: [String, Number],
      default: '',
    },
    showComment: {
      type: Boolean,
      default: true,
    },
    idName: {
      type: String,
      default: '',
      require: true,
    },
    api: {
      type: String,
      default: '',
      require: true,
    },
    postApi: {
      type: String,
      default: '',
      require: true,
    },
    hasMyComment: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: '评论',
    },
  },
  data() {
    return {
      avatar: '',
      nickName: '',
      pid: '',
      email: '',
      comments: [],
    }
  },
  computed: {
    userInfo() {
      return userStore.userinfoObj || {}
    },
  },
  watch: {
    userInfo(val) {
      this.avatar = val.avatar
    },
  },
  created() {},
  mounted() {
    this.avatar =
      this.userInfo.avatar || require('~/assets/images/user-default.png')
    this.getList()
  },
  methods: {
    getList() {
      if (this.api) {
        const params = {}
        params[this.idName] = this.qaId ? this.qaId : this.$route.params.id
        this.$api[this.api](params)
          .then((data) => {
            this.comments = data
            this.comments.forEach((item) => {
              item.showCommentBox = false
              item.showMoreNum = 2
            })
            this.$emit('showComments', this.comments.length)
          })
          .catch()
      }
    },
    toggelBox(index, item) {
      this.comments.forEach((option, idx) => {
        if (idx !== index) {
          option.showCommentBox = false
          this.$set(this.comments, idx, option)
        }
      })
      this.$set(this.comments, index, item)
    },
    setItem(item) {
      this.pid = item.id
      if (this.idName === 'qaId' && item.isParent) {
        this.pid = ''
        // 如果是回复的回复  pid 给回复的id, 路由要给答案的id
      }
      ;(item.nickName || item.user.nickName) &&
        (this.nickName = item.nickName || item.user.nickName)
      ;(item.email || item.user.email) &&
        (this.email = item.email || item.user.email)
    },
  },
}
</script>

<style lang="less" scoped>
.comment-wrapper {
  .my-commoent {
    display: flex;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #eee;
    object-fit: contain;
  }

  .total-comment {
    font-size: 18px;
    margin-bottom: 14px;
  }
  .solid {
    font-weight: 700;
    color: #ffd04b;
    margin: 0 3px 0 45px;
  }

  .more {
    text-align: center;
    color: #999;
    font-size: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      color: #ffd04b;
    }
  }

  .edit-outline {
    color: #999;
    font-size: 14px;
    margin: 0 0 14px 46px;
    cursor: pointer;

    &:hover {
      color: #ffd04b;
    }
  }
}

.no-data {
  text-align: center;
  color: #999;
}
</style>
