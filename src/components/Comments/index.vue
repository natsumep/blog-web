<template>
  <div class="comment-wrapper">
    <div v-if="hasMyComment && showComment" class="my-commoent">
      <img class="avatar" :src="avatar" alt="" />
      <comment-box
        :has-cancel="hasCancel"
        :rows="4"
        @hideBox="hideBox"
        @addItem="addItemParent($event)"
      />
    </div>
    <div class="comment-li">
      <p v-if="hasMyComment" class="total-comment">
        <span class="solid">|</span>全部{{ type }}
      </p>
      <p v-if="!comments.length && showMsg" class="no-data">暂无数据</p>
      <template v-else>
        <div v-for="(item, index) in comments" :key="index" class="li-wrapper">
          <comment-list
            :item="item"
            :type="type"
            @addItem="addItem($event)"
            @deleteItem="deleteItem(item.id)"
          >
            <template v-if="item.children && item.children.length" #commentLi>
              <div class="comment-child-list">
                <div>
                  <template v-for="(option, idx) in item.children">
                    <comment-list
                      v-if="idx < (item.showMoreNum || 2)"
                      :key="idx"
                      :type="type"
                      :layout-block="true"
                      :item="option"
                      @deleteItem="deleteItem(option.id)"
                      @addItem="addItem($event)"
                    ></comment-list>
                  </template>
                </div>
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
                      : `展开其他 ${
                          item.children.length - (item.showMoreNum || 2)
                        } 条回复`
                  }}
                </p>
              </div>
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
    comments: {
      type: Array,
      default: () => [],
    },
    showMsg: {
      type: Boolean,
      default: false,
    },
    hasCancel: {
      type: Boolean,
      default: false,
    },
    showComment: {
      type: Boolean,
      default: true,
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
    // this.getList()
  },
  methods: {
    deleteItem(id) {
      this.$emit('deleteItem', id)
    },
    addItem(content) {
      this.$emit('addItem', content)
    },
    addItemParent(content) {
      this.$emit('addItem', { content, item: {} })
    },
    getList() {
      // this.$api[this.api]()
      //   .then((data) => {
      //     this.comments = data
      //     this.comments.forEach((item) => {
      //       item.showCommentBox = false
      //       item.showMoreNum = 2
      //     })
      //     this.$emit('showComments', this.comments.length)
      //   })
      //   .catch()
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
      ;(item.nickName || item.user.nickName) &&
        (this.nickName = item.nickName || item.user.nickName)
      ;(item.email || item.user.email) &&
        (this.email = item.email || item.user.email)
    },
    hideBox() {
      this.$emit('hideBox')
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
.comment-child-list {
  background: #f5f5f5;
  padding: 15px 15px 5px 15px;
  border-radius: 5px;
  margin-top: 10px;
  /deep/ .comment-conten {
    margin-left: 46px;
  }
}
.no-data {
  text-align: center;
  color: #999;
}
</style>
