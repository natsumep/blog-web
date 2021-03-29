<template>
  <div class="sentence" :style="style">
    <div class="sentence-body flex-center">
      <div style="margin-bottom: 10vh; max-width: 50vw">
        <div class="sentence-btns flex-just-center">
          <div class="icon-content" :class="{ 'like-active': isLiked }">
            <like-icon
              v-if="wordInfo.id"
              :width="40"
              :is-load="likeLoading"
              :is-active="isLiked"
              :can-click="!isLiked"
              @change="likeChange"
            ></like-icon>
            <div class="icon-length">
              {{ likeLenght }}
            </div>
          </div>
          <div
            class="icon-content"
            style="margin-left: 30px"
            :class="{ 'collce-active': isCollceed }"
          >
            <collce-icon
              v-if="wordInfo.id"
              :width="40"
              :is-load="collceLoading"
              :is-active="isCollceed"
              @change="collceChange"
            ></collce-icon>
            <div class="icon-length">
              {{ collceLenght }}
            </div>
          </div>
          <div>
            <div style="margin-left: 30px">
              <img
                src="~/assets/images/refresh.svg"
                style="width: 40px; cursor: pointer"
                alt="刷新"
                @click="hanldeRefresh"
              />
            </div>
          </div>
        </div>
        <div class="sentence-text">
          {{ word }}
        </div>
        <div class="sentence-author">
          {{ formName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { isSupportWebp } from '@/utils/browser'
import { userStore } from '@/utils/store-accessor'
async function loadData(api: any) {
  let data
  try {
    data = await api['sentence/index']()
    return data
  } catch (e) {
    return null
  }
}

@Component({
  async asyncData({ $api }) {
    const data = await loadData($api)
    return { wordInfo: data } || {}
  },
})
export default class Home extends Vue {
  style: any = {}

  get isLiked() {
    return this.wordInfo.isLike
  }

  get isCollceed() {
    return this.wordInfo.isCollect
  }

  likeLoading = false
  collceLoading = false

  wordInfo: any = {
    content: '一日不见兮，思之如狂。',
    source: '凤求凰 / 琴歌',
    author: '司马相如',
  }

  get word() {
    return this.wordInfo.content
  }

  get formName() {
    const author = this.wordInfo.author
    const data = [author, this.wordInfo.source].filter((item) => !!item)
    return data.join(' · ')
  }

  get likeLenght() {
    return this.wordInfo.likes
  }

  get collceLenght() {
    return this.wordInfo.collects
  }

  async collceChange() {
    if (!userStore.token) {
      this.$message.warning('请先登录在收藏哟~')
      return
    }
    this.collceLoading = true
    const url = this.isCollceed ? 'sentence/uncollce' : 'sentence/collce'
    const msg = this.isCollceed ? '取消收藏' : '收藏'
    try {
      await (this as any).$api[url]({ id: this.wordInfo.id })
      if (this.isCollceed) {
        this.wordInfo.collects -= 1
      } else {
        this.wordInfo.collects += 1
      }
      this.wordInfo.isCollect = !this.isCollceed
      this.$message.success(`${msg}成功~`)
    } catch (e) {
      this.$message.warning('请求过于频繁，缓缓 缓缓...')
    }
    this.collceLoading = false
  }

  async likeChange() {
    // 如果喜欢不让取消了 接口也停用了
    if (this.isLiked) return
    this.likeLoading = true
    const url = this.isLiked ? 'sentence/unlike' : 'sentence/like'
    try {
      await (this as any).$api[url]({ id: this.wordInfo.id })
      this.wordInfo.likes += 1
      this.wordInfo.isLike = !this.isLiked
      this.$message.success('点赞成功~~')
    } catch (e) {
      this.$message.warning('请求过于频繁，缓缓 缓缓...')
    }
    this.likeLoading = false
    // isLike
  }

  async hanldeRefresh() {
    this.wordInfo = await loadData((this as any).$api)
  }

  mounted() {
    const canWebp = isSupportWebp()
    const hours = new Date().getHours()
    let url = ''
    if (canWebp) {
      if (hours > 16 || hours < 6) {
        url = require('~/assets/images/sentence.webp')
      } else {
        url = require('~/assets/images/sentence-morning.webp')
      }
    } else if (hours > 16 || hours < 6) {
      url = require('~/assets/images/sentence.jpeg')
    } else {
      url = require('~/assets/images/sentence-morning.jpeg')
    }

    this.style = { 'background-image': `url('${url}')` }
  }
  // and more functionality to discover
}
</script>

<style lang="less" scoped>
.sentence {
  height: 100%;
  height: calc(100vh - 60px);
  background-size: 100% 100%;
}
.sentence-body {
  height: 100%;
  width: 100%;
  // background: rgba(0, 0, 0, 0.2);
}
.sentence-btns {
  margin-bottom: 15px;
}
.icon-length {
  color: #333;
  text-align: center;
  font-size: 14px;
}
.like-active .icon-length,
.collce-active .icon-length {
  color: #f66e6f;
}

.sentence-text {
  background: #2193b0;
  // background-image: linear-gradient(to right, #ec6f66, #f3a183);
  background-image: radial-gradient(
    circle 248px at center,
    #16d9e3 0%,
    #30c7ec 47%,
    #46aef7 100%
  );
  //  Passionate Bed
  // background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  // Crystalline
  // background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
  margin: 40px 0 20px 0;
  text-align: center;
}
.sentence-author {
  text-align: center;
  font-size: 24px;
  color: #999;
}
</style>
