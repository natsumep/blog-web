<template>
  <div class="main-page">
    <div class="sentence" :class="{ 'sentence-night': isNight }" :style="style">
      <div class="sentence-body flex-center">
        <div class="top-btns">
          <div style="margin-bottom: 20px" class="flex flex-warp flex-center">
            <div v-if="!isCaihong" class="flex-item-cente">
              分类：
              <el-select
                v-model="sentenceType"
                multiple
                collapse-tags
                style="width: 130px"
                placeholder="请选择"
                size="mini"
                @change="sentenceTypeChange"
              >
                <el-option
                  v-for="item in sentenceTypeItem"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div
              v-if="isWeb"
              style="margin-left: 20px"
              class="flex-item-center"
            >
              轮询：
              <el-switch
                v-model="needLoop"
                active-color="#13ce66"
                active-text="开启"
                inactive-text="关闭"
                @change="changeLoop"
              ></el-switch>
            </div>
            <div v-if="isWeb" style="margin-left: 20px" class="flex-item-cente">
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
            <!-- <div style="margin-left: 20px" class="flex-item-center">
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
          </div> -->
          </div>
          <div class="top-menus flex flex-right">
            <el-button
              v-if="isWeb"
              type="primary"
              @click="handleTabBtnClick('myself')"
              >我的</el-button
            >
            <el-button
              v-if="isWeb"
              type="primary"
              @click="handleTabBtnClick('check')"
              >我要审核</el-button
            >
            <el-button type="primary" @click="handleTabBtnClick('upload')">
              我要上传
              <i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </div>
        </div>
        <div class="sentence-content">
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
                  @click="hanldeRefresh()"
                />
              </div>
            </div>
            <div>
              <div style="margin-left: 60px">
                <img
                  src="~/assets/images/report.svg"
                  style="width: 40px; cursor: pointer"
                  alt="举报"
                  @click="handleTabBtnClick('report')"
                />
              </div>
            </div>
          </div>
          <div
            class="sentence-text"
            :class="{
              'caihong-sentence': isCaihong,
              'is-error': wordInfo.isError,
            }"
          >
            {{ word }}
          </div>
          <div class="sentence-author">
            {{ formName }}
          </div>
        </div>
        <div style="position: absolute; bottom: 15px">
          <a href="https://tinker.run/core" style="color: #2196f3"
            >句子杂货铺💬 ：chrome插件使用说明</a
          >
        </div>
      </div>
    </div>
    <sentence-comment
      v-if="wordInfo.id"
      :id="wordInfo.id"
      style="margin-top: 20px"
      type="sentence"
    ></sentence-comment>
    <sentence-report
      v-model="showReport"
      :sententce="wordInfo.content"
      :sententce-id="wordInfo.id"
      :sententce-type="searchType"
    ></sentence-report>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { isSupportWebp } from '@/utils/browser'
import { userStore, systemStore } from '@/utils/store-accessor'
async function loadData(
  api: any,
  type = 'sentence',
  option: { uuid?: string; t?: string } = {}
) {
  let data
  let url = type === 'sentence' ? 'sentence/index' : 'sentence/caihong'
  if (option.uuid) {
    url += 'id'
  }
  try {
    data = await api[url](option)
    return data
  } catch (e) {
    return { content: e.msg + ' \n 点击刷新按钮查看其它', isError: true }
  }
}

@Component({
  async asyncData({ $api, query, app }) {
    const data: any = await loadData($api, 'sentence', {
      uuid: (query as any).uuid,
    })
    ;(app as any).head.meta = [
      {
        hid: 'description',
        name: 'description',
        content: data.content,
      },
    ]
    return (data && { wordInfo: data }) || {}
  },
  head: {
    title: '句子杂货铺💬 _ 来一条随机的句子吧~',
    meta: [
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: '句子杂货铺 _ 来一条随机的句子吧~',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content:
          '句子杂货铺💬 ：这是一个分类句子合集,你可以查看、收藏、喜欢各种各样的句子，还可以上传自己喜欢的句子，利用chrome插件，可以在chrome浏览器查看句子，上传句子。开放的句子api接口，可以通过接口查询到句子',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          '句子杂货铺：这是一个分类句子合集,你可以查看、收藏、喜欢各种各样的句子，还可以上传自己喜欢的句子，利用chrome插件，可以在chrome浏览器查看句子，上传句子。开放的句子api接口，可以通过接口查询到句子',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '句子 杂货铺 文艺 chrome插件 句子api接口 句子合集',
      },
    ],
  },
})
export default class Home extends Vue {
  style: any = {}
  needLoop = false
  isCaihong = false
  likeLoading = false
  loopTime = 30
  collceLoading = false
  timer: any = null
  showReport = false
  isNight = false
  sentenceType = ['']
  sentenceTypeItem = []
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

  get isWeb() {
    return systemStore.isWeb
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

  sentenceTypeChange(v: []) {
    if (v.length && v[v.length - 1] === '') {
      this.sentenceType = ['']
      return
    }
    const type = this.sentenceType
    if (type.length > 1) {
      this.sentenceType = type.filter((i) => !!i)
    } else if (type.length === 0) {
      this.sentenceType = ['']
    }
    this.refreshData()
  }

  getSentenceType() {
    if (this.sentenceType.some((item) => item === '')) {
      return null
    } else {
      return this.sentenceType.join(',')
    }
  }

  async refreshData(uuid?: any) {
    const option: any = {}
    uuid && (option.uuid = uuid)
    if (!this.isCaihong) {
      const type = this.getSentenceType()
      type && (option.t = type)
    }
    const data = await loadData((this as any).$api, this.searchType, option)
    this.wordInfo = data || {}
    this.$router.push({
      path: this.$route.path,
      query: { uuid: this.wordInfo.uuid },
    })
  }

  hanldeRefresh() {
    this.refreshData()
  }

  loopSearch() {
    this.clearLoop()
    this.timer = setInterval(() => {
      this.refreshData()
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
    this.refreshData()
  }

  async initSentenceType() {
    const list = await this.$api['sentence/type']()
    list.unshift({ name: '全部', id: '' })
    this.sentenceTypeItem = list
  }

  initBackgroun() {
    this.changeLoop(this.needLoop)
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
        this.$router.push('/sentence/me')
        break
      case 'check':
        this.$notify.info({
          title: '提示',
          message: '正在开发中~~~',
        })
        break
      case 'report':
        this.showReport = true
        break
    }
  }

  mounted() {
    this.initSentenceType()
    this.initBackgroun()
    !this.$route.query.uuid &&
      this.$router.replace({
        path: '/sentence',
        query: { uuid: this.wordInfo.uuid },
      })
  }

  @Watch('$route')
  routeChange() {
    const uuid = this.$route.query.uuid
    if (this.$route.query.uuid) {
      if (uuid !== this.wordInfo.uuid) {
        this.refreshData(uuid)
      }
    }
  }

  destroyed() {
    this.clearLoop()
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
.sentence-content {
  margin-bottom: 10vh;
  max-width: 50vw;
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
.sentence-text.is-error {
  background: none !important;
  background-image: none !important;
  -webkit-text-fill-color: red !important;
  text-shadow: none !important;
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

@media screen and (max-width: 400px) {
  .sentence {
    height: 100%;
    height: calc(100vh - 60px);
    background-size: cover;
    position: relative;
    background-position: 28%;
    .sentence-body {
      padding-top: 130px;
    }
  }
  .sentence-content {
    margin-bottom: 10vh;
    max-width: 100vw;
    padding: 20px;
    .sentence-text {
      font-size: 28px;
    }
    .sentence-author {
      font-size: 20px;
    }
  }
}
</style>
