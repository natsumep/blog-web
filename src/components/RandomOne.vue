<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>one</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        <i class="el-icon-refresh" style="font-size: 20px" @click="loadData">
        </i>
      </el-button>
    </div>
    <div class="flex flex-item-center">
      <div class="w-max">
        <p>{{ word }}</p>
        <p style="text-align: right">----{{ formName }}</p>
      </div>
      <like-icon
        v-if="wordInfo.id"
        style="padding-left: 10px"
        :is-load="likeLoading"
        :is-active="isLiked"
        @change="likeChange"
      ></like-icon>
    </div>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  likeLoading = false
  isLiked = false
  wordInfo: any = {
    content: '一日不见兮，思之如狂。',
    contentForm: '凤求凰 / 琴歌',
    contentFormWho: '司马相如',
  }

  get word() {
    return this.wordInfo.content
  }

  get formName() {
    const author = this.wordInfo.author
    return `「${author ? author + ' ' : ''}${this.wordInfo.from}」`
  }

  mounted() {
    this.loadData()
  }

  async loadData() {
    this.wordInfo = await (this as any).$api['word/index']()
    this.isLiked = false
  }

  async likeChange() {
    this.likeLoading = true
    const url = this.isLiked ? 'word/unlike' : 'word/like'
    await (this as any).$api[url]({ id: this.wordInfo.id })
    this.isLiked = !this.isLiked
    this.likeLoading = false
    // isLike
  }
}
</script>
