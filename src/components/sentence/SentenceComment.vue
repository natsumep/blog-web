<template>
  <div class="comment">
    <div class="comment-box">
      <comments type="评论" @addItem="addItem" />
    </div>

    <div>
      <template v-if="list.length">
        <div v-for="(item, index) in list" :key="index" class="answer-section">
          <div
            class="flex flex-just-beew flex-item-center"
            style="margin-bottom: 14px"
          >
            <div class="info">
              <img
                class="avatar"
                :src="
                  item.user && item.user.avatar
                    ? item.user.avatar
                    : defaultAvatar
                "
                alt=""
              />
              <p class="name">
                {{
                  item.user && item.user.nickName
                    ? item.user.nickName
                    : item.nickName
                    ? item.nickName
                    : '匿名'
                }}
              </p>
              <p class="time">创建于 {{ item.createTime | formatTime }}</p>
              <p style="margin-left: 10px">{{ item.number }}楼</p>
            </div>
            <el-popconfirm
              v-if="item.canDelete"
              title="确定要删除这条留言吗？"
              @confirm="deleteMessage(item.id)"
            >
              <i
                slot="reference"
                style="cursor: pointer"
                class="el-icon-delete delete-btn"
              ></i>
            </el-popconfirm>
          </div>
          <div class="answer-content">
            {{ item.message }}
          </div>
          <p
            class="comments-btn"
            role="button"
            @click="item.hasMyComment = !item.hasMyComment"
          >
            回复
          </p>
          <div class="comments">
            <comments
              :comments="item.children"
              :show-comment="!!item.hasMyComment"
              :has-cancel="true"
              @addItem="addComment($event, item)"
              @deleteItem="deleteComment($event, item)"
              @hideBox="item.hasMyComment = false"
            />
          </div>
        </div>
      </template>
      <div
        v-else
        class="font-color flex-center flex-warp"
        style="width: 100%; margin-top: 30px"
      >
        <div class="flex-center flex-warp" style="width: 80%">
          <img width="60%" src="~/assets/images/null.svg" alt="" />
          <div style="margin-top: 10px">暂时没有评论，期待你的第一条~</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import userImg from '~/assets/images/user-default.png'
import { dateDiff } from '~/utils/time'

@Component({
  filters: {
    formatTime: (val: any) => {
      return dateDiff(val)
    },
  },
})
export default class Home extends Vue {
  list = []
  defaultAvatar = userImg
  total = 0
  page = 1
  rows = 10

  @Prop({
    default: 'caihong',
  })
  type: any

  @Prop({
    required: true,
  })
  id: any

  mounted() {
    this.refresComment()
  }

  async refresComment() {
    const data = await this.$api['sentenceMessage/' + this.type + 'message']({
      id: this.id,
    })
    this.total = data.total
    this.list = data.list.map(
      (
        item: { hasMyComment: boolean; number: number; children: any[] },
        index: number
      ) => {
        item.hasMyComment = false
        item.number = this.total - ((this.page - 1) * this.rows + index)
        item.children &&
          item.children.map &&
          item.children.map((item) => {
            item.showCommentBox = false
            item.showMoreNum = 2
            return item
          })
        return item
      }
    )
  }

  async addItem(data: any) {
    const { comment, email, nickName } = data.content
    await this.$api['sentenceMessage/' + this.type + 'messagePost']({
      message: comment,
      id: this.id,
      email,
      nickName,
    })
    this.$message.success('回复成功~')
    this.refresComment()
  }

  async deleteMessage(id: number) {
    await this.$api['sentenceMessage/' + this.type + 'messageDelete']({ id })
    this.$message.success('删除成功~')
    this.refresComment()
  }

  deleteComment(id: number, message: any) {
    this.$api['sentenceMessage/' + this.type + 'commentDelete']({ id })
      .then(async () => {
        this.$message.success('删除成功')
        const data = await this.loadComment(message.id)
        message.children = data
      })
      .catch((err: any) => {
        this.$message.error(err.msg)
      })
  }

  async loadComment(messageId: number) {
    let data = []
    try {
      data = await this.$api['sentenceMessage/' + this.type + 'comment']({
        messageId,
      })
    } catch (_e) {
      return data
    }

    return data.map((item: any) => {
      item.showCommentBox = false
      item.showMoreNum = 2
      return item
    })
  }

  addComment(dataInfo: any, message: any) {
    const { content, item } = dataInfo
    const option = {
      ...content,
      messageId: message.id,
      userId: this.$route.params.id || 1,
    }
    if (item.id) {
      option.pid = item.id
    }
    this.$api['sentenceMessage/' + this.type + 'commentPost'](option)
      .then(async () => {
        const data = await this.loadComment(message.id)
        message.children = data
        this.$message.success('新增成功')
      })
      .catch((err: any) => {
        this.$message.error(err.msg)
      })
  }
}
</script>
<style lang="less" scoped>
.comment {
  max-width: 800px;
  min-width: 500px;
  min-height: 100vh;
  padding: 20px;
  background: #fff;
  margin: 0 auto;
  .comment-title {
    height: 150px;
    border: 1px solid #666;
    border-radius: 10px;
    margin: 30px 0;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.banner {
  height: 250px;
  margin-bottom: 20px;
}
.comment-box {
  width: 80%;
  margin: 0 auto;
}
.font-color {
  background: #2193b0;
  text-shadow: rgb(28 216 210 / 38%) 0.1em 0.1em 0.2em;
  background-image: radial-gradient(
    circle 248px at center,
    #16d9e3 0%,
    #30c7ec 47%,
    #46aef7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.answer-section {
  margin: 10px auto;
  padding: 8px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  position: relative;
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
  margin-top: 6px;
}

.name {
  margin-left: 14px;
  color: #2196f3;
}

.time {
  margin-left: 15px;
  color: #999;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #eee;
  object-fit: contain;
}

/deep/ .total-comment {
  display: none;
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
.delete-btn {
  cursor: pointer;
  &:hover {
    transition: transform 0.3s;
    color: red;
    transform: scale(1.1);
  }
}
@media screen and (max-width: 400px) {
  .comment {
    width: 100%;
    min-width: 200px;
    padding: 20px;
    .banner {
      height: 180px;
    }
    .comment-box {
      width: 100%;
    }
  }
}
</style>
