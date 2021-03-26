<template v-slot:commentLi>
  <div class="comment-list">
    <div class="comment-list-wrapper">
      <img
        v-if="!layoutBlock"
        :src="item.user.avatar || defaultAvatar"
        alt=""
        class="avatar"
      />
      <div
        class="content"
        :class="{ 'not-child': !item.children || !item.children.length }"
      >
        <div class="comment-content">
          <div class="comment-list-wrapper">
            <img
              v-if="layoutBlock"
              :src="item.user.avatar || defaultAvatar"
              alt=""
              class="avatar"
            />
            <p class="nickname">
              {{
                item.nickName ||
                item.user.nickName ||
                item.email ||
                item.user.email ||
                '匿名'
              }}
              <span class="txt"> · {{ item.createTime | formatTime }}</span>
            </p>
          </div>
          <div class="comment-conten">
            <p class="nickname">
              <span v-if="content.isComment" style="color: #2196f3">
                @{{ content.commentName }} </span
              >{{ content.comment }}
            </p>
            <div class="comment-btn-wrapper">
              <button class="comment-btn" @click="showBox">
                <i
                  style="font-size: 16px; position: relative; top: 1px"
                  class="el-icon-chat-dot-square"
                ></i>
                回复
              </button>
              <el-popconfirm
                v-if="item.canDelete"
                title="确认删除当前回复？"
                @confirm="deleteItem"
              >
                <button
                  slot="reference"
                  class="comment-btn delete"
                  style="color: red"
                >
                  <i
                    style="font-size: 16px; position: relative; top: 1px"
                    class="el-icon-delete"
                  ></i>
                  删除
                </button>
              </el-popconfirm>
            </div>
            <comment-box
              v-show="showCommentBox"
              style="margin-top: 8px"
              :item="item"
              :type="type"
              @addItem="addItem($event)"
              @hideBox="showCommentBox = false"
            ></comment-box>
          </div>
        </div>
        <slot name="commentLi"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import CommentBox from './CommentBox'
import { dateFormat } from '~/utils/time.ts'

export default {
  components: {
    CommentBox,
  },
  filters: {
    formatTime: (val) => {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(val).getTime())
    },
  },
  props: {
    type: {
      type: String,
      default: '评论',
    },
    layoutBlock: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
    deleteApi: {
      type: String,
      default: '',
      require: true,
    },
    postApi: {
      type: String,
      default: '',
      require: true,
    },
  },
  data() {
    return {
      showCommentBox: false,
      defaultAvatar: require('~/assets/images/user-default.png'),
    }
  },
  computed: {
    content() {
      const nickName =
        this.item.commentParentInfo &&
        (this.item.commentParentInfo.nickName ||
          this.item.commentParentInfo.user.nickName)
      return {
        isComment: !!this.item.commentParentInfo,
        commentName: nickName,
        comment: this.item.comment,
      }
    },
  },
  created() {},
  mounted() {},
  methods: {
    showBox() {
      this.showCommentBox = true
    },
    addItem(content) {
      this.showCommentBox = false
      this.$emit('addItem', { content, item: this.item })
    },
    deleteItem() {
      this.$emit('deleteItem')
      // this.$api[this.deleteApi]({ id: this.item.id })
      //   .then(() => {
      //     this.$message.success('删除成功')
      //     this.$emit('refresh')
      //   })
      //   .catch((err) => {
      //     this.$message.error(err.msg)
      //   })
    },
  },
}
</script>

<style lang="less" scoped>
.comment-list-wrapper {
  display: flex;
  .comment-btn.delete {
    display: none;
  }
  .comment-content:hover .comment-btn.delete {
    display: inline-block;
  }
  .content {
    flex: 1 1 auto;
    padding-bottom: 10px;
    &.not-child {
      border-bottom: 1px solid #e4e4e4;
      margin-bottom: 10px;
    }
  }

  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 50%;
    flex: 0 0 auto;
    border: 1px solid #eee;
    object-fit: contain;
  }

  .nickname {
    font-size: 16px;
    line-height: 36px;
    word-wrap: break-word;
    word-break: break-all;
  }

  .txt {
    font-size: 10px;
    color: #999;
    margin: 8px 0;
  }

  .comment-btn {
    background-color: transparent;
    border: none;
    font-size: 14px;
    color: #313131;
    outline: 0;
    padding: 0;
    cursor: pointer;
  }

  .comment-btn-wrapper {
    margin-top: 8px;
  }
}
.comment-list:first-child {
  .content {
    border: 0;
    padding-bottom: 0;
  }
}
.comment-list + .comment-list {
  &:last-child {
    .content {
      border: 0;
      padding-bottom: 0;
    }
  }
}
.li-wrapper + .li-wrapper:last-child {
  .content {
    border: 0;
  }
}
</style>
