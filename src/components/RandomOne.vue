<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>句子杂货铺</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        <i class="el-icon-refresh" style="font-size: 20px" @click="loadData">
        </i>
      </el-button>
    </div>
    <div class="flex flex-item-center">
      <div class="w-max">
        <p>{{ word }}</p>
        <p class="author">——{{ formName }}</p>
      </div>
      <div
        :class="{ 'like-actied': isLiked }"
        style="padding-left: 5px; width: 50px"
      >
        <like-icon
          v-if="wordInfo.id"
          style="
            cursor: pointer;
            position: relative;
            display: flex;
            justify-content: center;
          "
          :is-load="likeLoading"
          :is-active="isLiked"
          @change="likeChange"
        ></like-icon>
        <div class="likes">
          {{ likeLenght }}
        </div>
      </div>
    </div>
    <nuxt-link to="/api/word"
      ><div class="want-api">我也要用这个接口</div></nuxt-link
    >
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  likeLoading = false
  isLiked = false
  timer: any = null
  wordInfo: any = {
    content: '一日不见兮，思之如狂。',
    source: '凤求凰 / 琴歌',
    author: '司马相如',
  }

  get word() {
    return this.wordInfo.content
  }

  get likeLenght() {
    return this.isLiked ? this.wordInfo.likes + 1 : this.wordInfo.likes
  }

  get formName() {
    const author = this.wordInfo.author
    const data = [author, this.wordInfo.source].filter((item) => !!item)
    return data.join(' · ')
  }

  mounted() {
    this.loadData()
    this.timer = setInterval(() => {
      this.loadData()
    }, 10000)
  }

  destroyed() {
    this.timer && clearInterval(this.timer)
  }

  async loadData() {
    try {
      this.wordInfo = await (this as any).$api['sentence/index']()
      this.isLiked = false
    } catch (e) {
      this.$message.warning('请求过于频繁，缓缓 缓缓...')
    }
  }

  async likeChange() {
    // 如果喜欢不让取消了 接口也停用了
    if (this.isLiked) return
    this.likeLoading = true
    const url = this.isLiked ? 'sentence/unlike' : 'sentence/like'
    try {
      await (this as any).$api[url]({ id: this.wordInfo.id })
    } catch (e) {
      this.$message.warning('请求过于频繁，缓缓 缓缓...')
    }
    this.isLiked = !this.isLiked
    this.likeLoading = false
    // isLike
  }
}
</script>

<style lang="less" scoped>
.author {
  text-align: right;
  color: #999;
  font-size: 14px;
  margin-top: 12px;
}
.likes {
  color: #333;
  text-align: center;
  font-size: 12px;
}

.like-actied .likes {
  color: #ff6e6f;
}
.want-api {
  background-image: linear-gradient(135deg, #fec163 10%, #de4313 100%);
  background-clip: text;
  color: transparent;
  font-size: 12px;
  margin-bottom: -10px;
  margin-top: 10px;
  transition: all 0.3s;
  transform-origin: left;
}
.want-api:hover {
  transform: scale(1.1);
}
</style>
