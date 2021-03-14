<template>
  <div class="wrapper">
    <div class="article-tag">
      <!-- <div style="margin-bottom: 15px">
        <random-one></random-one>
      </div> -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章标签</span>
        </div>
        <el-tag
          v-for="item in typeList"
          :key="item.type"
          class="tag-item"
          :type="item.type"
          effect="dark"
          @click="searchTag(item.type)"
        >
          {{ item.type }}({{ item.length }})
        </el-tag>
      </el-card>
    </div>
    <div class="filter-wrapper">
      <p>
        {{ getSearchTitle.first }}
        <span style="color: #409eff">{{ getSearchTitle.tag }}</span>
        {{ getSearchTitle.last }}<span class="total"> {{ total }}</span> 篇
      </p>
      <div>
        <el-input
          v-model="searchTextVal"
          placeholder="请输入搜索内容"
          class="input-with-select"
          @keyup.native.enter="handleSearchText"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearchText"
          ></el-button>
        </el-input>
      </div>
    </div>
    <div v-for="item in list" :key="item.id" class="item">
      <ArticleListItem :item="item"></ArticleListItem>
    </div>
    <div v-if="!list.length" class="text-centen" style="margin-top: 150px">
      空空如也，快去写一篇吧
      <nuxt-link to="/article/edit" style="color: #409eff">
        前往写文章</nuxt-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { userStore } from '~/utils/store-accessor'
import { dateFormat } from '~/utils/time'

const bgc = [
  {
    value: 'pink',
    min: 1000,
    max: 9999999999,
  },
  {
    value: 'orange',
    max: 999,
    min: 800,
  },
  {
    value: 'green',
    max: 799,
    min: 500,
  },
  {
    value: 'purple',
    max: 499,
    min: 200,
  },
]
function getBgc(val: any) {
  let rgb = 'blue'
  bgc.forEach((item) => {
    val < item.max && val >= item.min && (rgb = item.value)
  })
  return rgb
}
async function getArticleList(param: any, $api: any) {
  const res: any = await $api['article/list'](param)
  const data = res
  const { page, rows } = param
  const { list = [], total = 0 } = data
  const arr: any = []
  list.forEach((item: any, i: number) => {
    const obj = {
      index: i + 1 + (page - 1) * rows,
      ...item,
      time: dateFormat('YYYY-mm-dd HH:MM:SS', item.createTime),
      cardPic: item.cardPic.replace('.jpg', '_thumb.jpg'),
      type: item.type.split('/'),
      bgc: getBgc(item.views),
    }
    const lenght = obj.type.length
    if (lenght > 4) {
      obj.type = obj.type.splice(0, 4)
      obj.type.push('...(' + (lenght - 4) + ')')
    }
    arr.push(obj)
  })
  return {
    list: arr,
    total,
  }
}
@Component({
  async asyncData({ $api, route }) {
    const { t, q } = route.query
    const data = await Promise.all([
      getArticleList(
        {
          page: 1,
          rows: 20,
          home: route.params.id || '',
          searchText: route.query.q || '',
          type: route.query.t,
        },
        $api
      ),
      $api['article/type'](),
    ])
    return {
      ...data[0],
      typeList: data[1],
      type: t,
      searchText: q,
      searchTextVal: q,
    }
    // await this.getArticleList()
  },
})
export default class Home extends Vue {
  userDefault = require('~/assets/images/user-default.png')
  searchText = ''
  searchTextVal = ''
  page = 1
  rows = 10
  serverData: any = {}
  list: any = []
  total = 0
  typeList = []
  type = ''
  chartdata: any = {
    labels: [],
    datasets: [
      {
        barPercentage: 0.2,
        label: '文章分类汇总',
        backgroundColor: '#ffd04b',
        data: [],
      },
    ],
  }

  get isLogined() {
    return userStore.token
  }

  get queryQ() {
    return this.$route.query || {}
  }

  // @Watch('searchText')
  // changeSearchText() {
  //   this.resetList()
  // }

  @Watch('isLogined')
  changeLogined(val: any) {
    val && this.resetList()
  }

  @Watch('queryQ')
  changeSearch(data: any) {
    const { t, q } = data
    this.searchText = this.searchTextVal = q
    this.type = t
    this.resetList()
  }

  get getSearchTitle() {
    if (this.searchText) {
      return {
        first: `查询到内容包含 `,
        tag: this.searchText,
        last: `的文章共`,
      }
    } else if (this.type) {
      return { first: `查询到标签为 `, tag: this.type, last: `的文章共` }
    } else {
      return { last: `共有文章` }
    }
  }

  created() {
    // this.a = 3
  }

  mounted() {
    document.addEventListener('scroll', this.handleScroll, true)
  }

  destroyed() {
    document.removeEventListener('scroll', this.handleScroll, true)
  }

  handleScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop
    const totalH =
      document.documentElement.scrollHeight || document.body.scrollHeight
    const clientH =
      document.documentElement.clientHeight || document.body.clientHeight
    if (
      totalH - (scrollTop + clientH) < 200 &&
      Math.ceil(this.total / 10) - this.page > 0
    ) {
      this.page++
      this.getArticleList()
    }
  }

  resetList() {
    this.list = []
    this.page = 1
    this.getArticleList()
  }

  searchTag(tag: string) {
    // this.type = tag
    // this.searchText = ''
    // this.resetList()
    this.changeRouteQuery({
      t: tag,
    })
  }

  handleSearchText() {
    // this.searchText = this.searchTextVal
    // this.type = ''
    // this.resetList()
    this.changeRouteQuery({
      q: this.searchTextVal,
    })
  }

  changeRouteQuery(option: any) {
    const path = this.$route.path
    const query = option
    this.$router.push({ path, query })
  }

  getType() {
    this.$axios.get('articleType').then((data: any) => {
      this.typeList = data
    })
  }

  async getArticleList() {
    const params: any = {
      page: this.page,
      rows: this.rows,
      home: this.$route.params.id || '',
    }
    this.searchText && (params.searchText = this.searchText)
    this.type && (params.type = this.type)
    const data = await getArticleList(params, (this as any).$api)
    const { list = [], total = 0 } = data
    this.list = [...list, ...this.list]
    this.total = total
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 850px;
  min-height: calc(100vh - 66px);
  margin: 0 auto;
  padding: 20px;
}
.article-tag {
  position: fixed;
  top: 130px;
  left: calc(100vw / 2 + 425px);
  max-width: 300px;
  bottom: 0;
  overflow: auto;
}
.item {
  min-height: 90px;
  overflow: hidden;
  margin: 12px 0 20px;
  font-size: 18px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  padding: 14px 20px;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
.tag-item {
  border: 0;
  margin: 0 20px 10px 0;
  cursor: pointer;
  animation: 0.4s;
}
.tag-item:hover,
.tag-item.active {
  transform: scale(1.08);
  background-image: linear-gradient(135deg, #ffe985 10%, #fa742b 100%);
}
.margin {
  margin-right: 30px;
  display: flex;
  align-items: center;
}

.filter-wrapper {
  display: flex;
  justify-content: space-between;

  .total {
    font-weight: 700;
    color: rgb(247, 61, 73);
  }
}
</style>
