<template>
  <div class="wrapper">
    <div class="article-tag">
      <div style="margin-bottom: 15px">
        <random-one></random-one>
      </div>
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
    <template v-if="list.length">
      <div v-for="item in list" :key="item.id" class="item">
        <router-link :to="`/article/${item.id}`">
          <div class="flex-just-beew" style="position: relative">
            <svg
              v-if="item.isPrivate"
              t="1611736894190"
              class="icon is-private"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3054"
              width="200"
              height="200"
            >
              <path
                d="M309.293987 341.707181 487.673476 341.707181l-34.748374 30.115871c13.897508 12.390179 35.521993 33.236952 64.865268 62.548506l44.014402-37.065137c-7.753583-9.265005-21.651091-21.620392-41.697639-37.065137-9.265005-7.722884-16.218364-13.897508-20.850866-18.534103l215.445648 0 0 57.916003 60.231743 0L774.933658 288.427774 554.855507 288.427774c-7.753583-27.800132-13.897508-46.334235-18.534103-55.59924l-69.497771 6.949265c1.512445 3.120057 3.089358 7.753583 4.632503 13.901601 4.636596 15.440652 8.46478 27.026513 11.585861 34.748374L249.065315 288.427774l0 111.19541 60.228673 0L309.293987 341.707181z"
                p-id="3055"
              ></path>
              <path
                d="M670.68649 452.905661c30.885397 40.185194 54.791852 73.356655 71.813511 99.613642l50.962644-32.432634c-18.531033-24.679051-43.240784-57.111685-74.130274-97.296879L670.68649 452.905661z"
                p-id="3056"
              ></path>
              <path
                d="M675.318992 716.998214 543.273739 716.998214 543.273739 608.118544l44.014402 0c43.210084 1.543144 70.270366-13.097283 81.082609-44.017472 1.512445-6.144948 4.632503-17.726716 9.265005-34.748374 1.512445-10.77745 3.089358-18.531033 4.632503-23.163536-6.17974-3.089358-15.444745-6.952335-27.800132-11.585861-13.897508-6.144948-23.970924-10.038624-30.115871-11.581768l-6.949265 44.014402c-3.120057 21.655184-17.761508 31.663109-44.014402 30.115871l-88.031874 0c-15.444745 0-27.026513-3.089358-34.748374-9.265005 83.395279-38.577582 162.162148-84.911817 236.292421-138.998612l-39.380876-39.3819c-66.407389 49.454293-135.166334 90.348637-206.17655 122.780248l0-99.613642-57.916003 0 0 125.097011c-47.877379 17.018588-98.844117 32.432634-152.897143 46.330142 7.721861 17.022682 15.409953 34.748374 23.166606 53.283501 47.842587-13.897508 93.433902-29.311553 136.678779-46.330142 12.355387 24.70975 35.521993 37.065137 69.497771 37.065137l20.850866 0 0 108.878647L348.678957 716.997191l0-83.395279-60.231743 0 0 132.046277 386.872801 0 0 25.479276 62.548506 0L737.868521 628.96634l-62.548506 0L675.320016 716.998214z"
                p-id="3057"
              ></path>
              <path
                d="M258.33032 499.235803c16.987889 12.390179 28.569657 21.655184 34.748374 27.800132 10.77745-13.897508 26.995814-34.748374 48.646905-62.548506 10.781543-15.409953 19.307722-26.995814 25.483369-34.748374l-46.330142-32.432634c-12.389156 17.022682-35.552692 48.650998-69.497771 94.98114C252.893499 493.830705 255.210262 496.150538 258.33032 499.235803z"
                p-id="3058"
              ></path>
              <path
                d="M983.725776 312.682153c-25.788314-60.970569-62.697908-115.719442-109.705478-162.727012S772.263855 66.036953 711.293286 40.248639C648.151263 13.542421 581.097145 0 511.99744 0c-69.100729 0-136.153824 13.541397-199.295846 40.248639-60.970569 25.788314-115.719442 62.698931-162.727012 109.706501S66.05537 251.711584 40.26808 312.682153c-26.707242 63.142023-40.248639 130.195118-40.248639 199.295846 0 69.099705 13.541397 136.153824 40.248639 199.295846 25.788314 60.970569 62.698931 115.719442 109.706501 162.727012s101.756443 83.918188 162.727012 109.705478c63.143046 26.707242 130.196141 40.248639 199.295846 40.248639 69.099705 0 136.153824-13.541397 199.295846-40.248639 60.970569-25.788314 115.719442-62.697908 162.727012-109.705478s83.918188-101.757467 109.705478-162.727012c26.707242-63.142023 40.248639-130.196141 40.248639-199.295846C1023.975439 442.87727 1010.434041 375.824175 983.725776 312.682153zM917.013442 683.056205c-22.137161 52.33592-53.834039 99.34656-94.212638 139.725159s-87.389239 72.075477-139.725159 94.212638c-54.16559 22.909756-111.724459 34.526317-171.078206 34.526317-59.353747 0-116.912616-11.61656-171.078206-34.526317-52.33592-22.137161-99.34656-53.834039-139.725159-94.212638s-72.0765-87.389239-94.212638-139.725159c-22.909756-54.16559-34.526317-111.724459-34.526317-171.078206 0-59.353747 11.61656-116.912616 34.526317-171.078206 22.136138-52.33592 53.834039-99.345536 94.212638-139.724135 40.378599-40.378599 87.388215-72.0765 139.725159-94.212638 54.16559-22.909756 111.724459-34.526317 171.078206-34.526317 59.353747 0 116.912616 11.61656 171.078206 34.526317 52.33592 22.136138 99.34656 53.834039 139.725159 94.212638 40.378599 40.378599 72.075477 87.388215 94.212638 139.724135 22.909756 54.16559 34.526317 111.725482 34.526317 171.078206C951.539759 571.330722 939.923198 628.890615 917.013442 683.056205z"
                p-id="3059"
              ></path>
            </svg>
            <div class="flex-auto title-wrapper">
              <div>
                <div class="title">
                  {{ item.title }}
                  <span
                    v-for="(option, index) in item.type"
                    :key="index"
                    class="classification"
                    :class="item.bgc"
                    >{{ option }}</span
                  >
                </div>
                <p class="abstr">{{ item.abstract }}</p>
              </div>
              <div class="txt">
                <nuxt-link
                  class="flex margin user-item"
                  :to="'/' + item.userHome"
                >
                  <img
                    class="user-avatar"
                    :src="item.userAvatar || userDefault"
                    alt="头像"
                  />
                  <p class="">{{ item.userNickname }}</p>
                </nuxt-link>
                <p class="margin">{{ item.time }}</p>
                <div class="margin">
                  <i
                    style="font-size: 16px; margin-right: 8px"
                    class="el-icon-view"
                  ></i
                  >{{ item.views || 0 }}
                </div>
                <div>
                  <i
                    style="font-size: 16px; margin-right: 4px"
                    class="el-icon-chat-line-round"
                  ></i
                  >{{ item.commentLength || 0 }}
                </div>
              </div>
            </div>
            <img
              v-if="item.cardPic"
              class="poster"
              :src="item.cardPic"
              alt=""
            />
          </div>
        </router-link>
      </div>
    </template>
    <div v-else class="text-centen" style="margin-top: 150px">
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
  async asyncData({ $api }) {
    const data = await Promise.all([
      getArticleList(
        {
          page: 1,
          rows: 20,
        },
        $api
      ),
      $api['article/type'](),
    ])
    return {
      ...data[0],
      typeList: data[1],
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

  // @Watch('searchText')
  // changeSearchText() {
  //   this.resetList()
  // }

  @Watch('isLogined')
  changeLogined(val: any) {
    val && this.resetList()
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
    this.type = tag
    this.searchText = ''
    this.resetList()
  }

  handleSearchText() {
    this.searchText = this.searchTextVal
    this.type = ''
    this.resetList()
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
.tag-item {
  margin: 0 20px 10px 0;
  cursor: pointer;
  animation: 0.4s;
}
.tag-item:hover {
  transform: scale(1.08);
}
a {
  color: #333;
}
.abstr {
  color: #909399;
  font-size: 14px;
  display: flex;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
.user-item {
  // border: 1px solid transparent;
  border-radius: 30px;
  padding: 2px 5px;
}
.user-item:hover {
  // border: 1px solid red;
  background-image: linear-gradient(135deg, #fec163 10%, #de4313 100%);
  color: #fff;
}
.txt {
  display: flex;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  color: #909399;
  margin-top: 8px;
}
.user-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 6px;
}
.title-wrapper {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}

.title {
  margin-bottom: 4px;
  color: #ffd04b;
  display: flex;
  align-items: center;
}

.margin {
  margin-right: 30px;
  display: flex;
  align-items: center;
}

.poster {
  display: block;
  width: 150px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  object-fit: cover;
}

.is-private {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  fill: #eee;
  transform: rotate(30deg);
  z-index: 0;
}

.classification {
  padding: 0 8px;
  line-height: 16px;
  font-size: 8px;
  color: #fff;
  background-color: rgb(174, 136, 192);
  border-radius: 4px;
  margin-left: 8px;
  &.blue {
    background-color: rgb(119, 186, 205);
  }
  &.pink {
    background-color: rgb(250, 119, 127);
  }
  &.orange {
    background-color: rgb(238, 139, 94);
  }
  &.green {
    background-color: rgb(86, 159, 113);
  }
  &.purple {
    background-color: rgb(174, 136, 192);
  }
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
