<template>
  <div class="q-a">
    <div class="qa-wrapper">
      <div style="position: absolute; right: 0; top: 0; z-index: 2">
        <el-button size="mini" type="primary" @click="ask">
          {{ token ? '+ 提问题' : '请先登录' }}</el-button
        >
      </div>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="最新问答" name="new_aq">
          <!-- 最新问答 -->
          <div v-if="qaList.length">
            <div v-for="(item, index) in qaList" :key="index">
              <nuxt-link class="qa-list" :to="`/q/${item.id}`">
                <div class="num-wrapper has-answer">
                  <p class="num">{{ item.answerTotal || 0 }}</p>
                  <p class="txt">回答</p>
                </div>
                <div class="num-wrapper">
                  <p class="num">{{ item.views || 0 }}</p>
                  <p class="txt">浏览</p>
                </div>
                <div>
                  <p class="name">
                    {{
                      !item.anonymous && item.user && item.user.nickName
                        ? item.user.nickName
                        : '匿名'
                    }}
                    ·
                    {{ item.createTime | format }}
                  </p>
                  <p class="title">
                    <span class="title-txt">
                      {{ item.title }}
                    </span>
                    <span
                      v-for="(tag, tagid) in item.type.split('/')"
                      :key="tagid"
                      class="tag-wrapper"
                      >{{ tag }}</span
                    >
                  </p>
                </div>
              </nuxt-link>
            </div>

            <el-pagination
              style="margin-top: 24px; text-align: center"
              background
              layout="prev, pager, next"
              :current-page="page"
              :total="total"
              @current-change="changePage($event)"
            >
            </el-pagination>
          </div>
          <div v-if="!qaList.length" class="no-data">
            <!-- <img src="../../../static/gj_history_blank.png" alt="" /> -->
            <p>
              还没有任何提问哦~ 登录后点击右上方 「 提问题 」即可发布问题哦~！
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userStore } from '~/utils/store-accessor'

import { dateDiff } from '~/utils/time'
@Component({
  async asyncData({ $api }) {
    // await this.getArticleList()
    const params = {
      page: 1,
      rows: 10,
    }
    const data = await $api['qa/list'](params)
    const { list = [], total = 0 } = data
    return {
      qaList: list,
      total,
    }
  },
  filters: {
    format(val: any) {
      const now = new Date().getTime()
      if (now - val <= 2 * 60 * 1000) {
        return '刚刚提问'
      } else if (now - val > 2 * 60 * 1000 && now - val <= 60 * 60 * 1000) {
        const time = (now - val) / 1000 / 60
        return `${Math.ceil(time)}分钟前`
      } else {
        return dateDiff(val)
      }
    },
  },
})
export default class Index extends Vue {
  qaList = []
  activeName = 'new_aq'
  page = 1
  total = 0
  get token() {
    return userStore.token
  }

  mounted() {}

  async initData() {
    const params = {
      page: this.page,
      rows: 10,
    }
    const data = await (this as any).$api['qa/list'](params)
    const { list = [], total = 0 } = data
    return {
      qaList: list,
      total,
    }
  }

  changePage(page: number) {
    this.page = page
  }

  handleClick() {}

  ask() {
    this.token
      ? this.$router.push({ path: '/q/build' })
      : userStore.set_login_dialog_visible(true)
  }
}
</script>

<style lang="less" scoped>
.q-a {
  min-height: calc(100vh - 66px);
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.9);
}

.qa-wrapper {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}

.qa-list {
  display: flex;
  padding: 12px 0;
  min-height: 72px;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;

  .title-txt {
    color: #313131;
  }

  &:hover {
    cursor: pointer;
    .title-txt {
      color: #ffd04b;
      text-decoration: underline;
    }
  }
}

.num-wrapper {
  width: 45px;
  height: 45px;
  margin: 0 10px;
  color: #999;
  text-align: center;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.has-answer {
    color: #ffd04b;
    border: 1px solid rgba(255, 208, 75, 0.4);
    background-color: rgba(255, 208, 75, 0.1);
    border-radius: 2px;
  }

  .num {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .txt {
    font-size: 12px;
  }
}

.name {
  font-size: 14px;
  color: #999;
}

.title {
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.tag-wrapper {
  font-size: 12px;
  font-weight: 400;
  padding: 2px 8px;
  color: #ffd04b;
  background-color: rgba(255, 208, 75, 0.1);
  margin-left: 8px;
  border-radius: 4px;
}

.no-data {
  min-height: 300px;
  text-align: center;
  margin-top: 50px;
  p {
    margin-top: 24px;
    font-size: 14px;
    color: #999;
  }
}
@media screen and (max-width: 400px) {
  .qa-wrapper {
    width: 100%;
  }
}
</style>
