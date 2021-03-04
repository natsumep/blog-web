<template v-slot:commentLi>
  <div>
    <div class="comment-list-wrapper">
      <img
        v-if="!layoutBlock"
        :src="item.user.avatar || defaultAvatar"
        alt=""
        class="avatar"
      />
      <div class="content">
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
        <p class="nickname">
          <span v-if="content.isComment" style="color: #2196f3">
            @{{ content.commentName }} </span
          >{{ content.comment }}
        </p>
        <div class="comment-btn-wrapper">
          <button class="comment-btn" @click="showBox">
            <i
              style="font-size: 16px; position: relative; top: 2px"
              class="el-icon-chat-dot-square"
            ></i>
            回复
          </button>
        </div>
        <slot name="commentLi"></slot>
      </div>
    </div>
    <slot name="commentBox"></slot>
  </div>
</template>

<script>
import { dateFormat } from '~/utils/time.ts'

export default {
  filters: {
    formatTime: (val) => {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(val).getTime())
    },
  },
  props: {
    layoutBlock: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
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
      this.$emit('showBox')
    },
  },
}
</script>

<style lang="less" scoped>
.comment-list-wrapper {
  display: flex;

  .content {
    flex: 1 1 auto;
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
    cursor: pointer;
  }

  .comment-btn-wrapper {
    margin: 8px 0 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }
}
</style>
