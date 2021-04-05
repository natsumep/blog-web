<template>
  <div class="sentence" :class="{ 'sentence-night': isNight }" :style="style">
    <div class="sentence-body flex-center">
      <div class="top-btns">
        <div style="margin-bottom: 20px" class="flex flex-warp flex-center">
          <div class="flex-item-center">
            轮询：
            <el-switch
              v-model="needLoop"
              active-color="#13ce66"
              active-text="开启"
              inactive-text="关闭"
              @change="changeLoop"
            ></el-switch>
          </div>
          <div style="margin-left: 20px" class="flex-item-cente">
            轮询时间(秒)：
            <el-select
              v-model="loopTime"
              style="width: 80px"
              placeholder="请选择"
              size="mini"
              @change="changeLoopTime"
            >
              <el-option
                v-for="item in [10, 20, 30, 40, 50, 60, 100, 200]"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div style="margin-left: 20px" class="flex-item-center">
            显示内容：
            <el-switch
              v-model="isCaihong"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="彩虹屁🌈"
              inactive-text="句子杂货铺"
              @change="changeType"
            >
            </el-switch>
          </div>
        </div>
        <div class="top-menus flex flex-right">
          <el-button type="primary" @click="handleTabBtnClick('myself')"
            >我的</el-button
          >
          <el-button type="primary" @click="handleTabBtnClick('check')"
            >我要审核</el-button
          >
          <el-button type="primary" @click="handleTabBtnClick('upload')">
            我要上传
            <i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
      </div>
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
          <div>
            <div style="margin-left: 60px">
              <img
                src="~/assets/images/report.svg"
                style="width: 40px; cursor: pointer"
                alt="举报"
                @click="showReport = true"
              />
            </div>
          </div>
        </div>
        <div class="sentence-text" :class="{ 'caihong-sentence': isCaihong }">
          {{ word }}
        </div>
        <div class="sentence-author">
          {{ formName }}
        </div>
      </div>
    </div>
    <sentence-report
      v-model="showReport"
      :sententce="wordInfo.content"
      :sententce-id="wordInfo.id"
      :sententce-type="searchType"
    ></sentence-report>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { isSupportWebp } from '@/utils/browser'
import { userStore } from '@/utils/store-accessor'
async function loadData(api: any, type = 'caihong') {
  let data
  const url = type === 'sentence' ? 'sentence/index' : 'sentence/caihong'
  try {
    data = await api[url]()
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
  needLoop = true
  isCaihong = true
  likeLoading = false
  loopTime = 30
  collceLoading = false
  timer: any = null
  showReport = false
  isNight = false
  wordInfo: any = {
    content: '一日不见兮，思之如狂。',
    source: '凤求凰 / 琴歌',
    author: '司马相如',
  }

  get searchType() {
    return this.isCaihong ? 'caihong' : 'sentence'
  }

  get isLiked() {
    return this.wordInfo.isLike
  }

  get isCollceed() {
    return this.wordInfo.isCollect
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
    const url = this.isCollceed
      ? `sentence/${this.isCaihong ? 'caihong' : ''}uncollce`
      : `sentence/${this.isCaihong ? 'caihong' : ''}collce`
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
    const url = this.isLiked
      ? `sentence/${this.isCaihong ? 'caihong' : ''}unlike`
      : `sentence/${this.isCaihong ? 'caihong' : ''}like`
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
    this.wordInfo = await loadData((this as any).$api, this.searchType)
  }

  loopSearch() {
    this.clearLoop()
    this.timer = setInterval(() => {
      this.hanldeRefresh()
    }, this.loopTime * 1000)
  }

  clearLoop() {
    clearInterval(this.timer)
  }

  changeLoopTime() {
    if (this.needLoop) {
      this.loopSearch()
    }
  }

  changeLoop(isActive: boolean) {
    if (isActive) {
      this.loopSearch()
    } else {
      this.clearLoop()
    }
  }

  changeType() {
    this.initBackgroun()
    this.hanldeRefresh()
  }

  initBackgroun() {
    this.loopSearch()
    const canWebp = isSupportWebp()
    const hours = new Date().getHours()
    this.isNight = hours > 16 || hours < 6
    let url = ''
    if (!this.isCaihong) {
      if (canWebp) {
        if (this.isNight) {
          url = require('~/assets/images/sentence.webp')
        } else {
          url = require('~/assets/images/sentence-morning.webp')
        }
      } else if (this.isNight) {
        url = require('~/assets/images/sentence.jpeg')
      } else {
        url = require('~/assets/images/sentence-morning.jpeg')
      }
    } else if (canWebp) {
      url = require('~/assets/images/caihong.webp')
    } else {
      url = require('~/assets/images/caihong.jpeg')
    }

    this.style = { 'background-image': `url('${url}')` }
  }

  handleTabBtnClick(type: string) {
    if (!userStore.token) {
      this.$message.warning('请先登录在操作哟~~')
      return
    }
    switch (type) {
      case 'upload':
        this.$router.push('/sentence/add')
        break
      case 'myself':
        this.$notify.info({
          title: '提示',
          message: '正在开发中~~~',
        })
        break
      case 'check':
        this.$notify.info({
          title: '提示',
          message: '正在开发中~~~',
        })
        break
    }
  }

  mounted() {
    this.initBackgroun()
  }
  // and more functionality to discover
}
</script>

<style lang="less" scoped>
.sentence {
  height: 100%;
  height: calc(100vh - 60px);
  background-size: 100% 100%;
  position: relative;
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
  text-shadow: rgba(28, 216, 210, 0.38) 0.1em 0.1em 0.2em;
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
.sentence-text.caihong-sentence {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  text-shadow: rgba(255, 117, 140, 0.38) 0.1em 0.1em 0.2em;
}
.sentence-night .sentence-text:not(.caihong-sentence) {
  background: none;
  background-image: none;
  -webkit-text-fill-color: #fff;
}
.sentence-author {
  text-align: center;
  font-size: 24px;
  color: #999;
}
.sentence-night .sentence-author {
  color: #fff;
}

.top-btns {
  position: absolute;
  padding: 20px;
  top: 0;
  right: 0;
}
</style>
