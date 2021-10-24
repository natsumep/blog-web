<template>
  <div class="fmenu">
    <div style="margin-top: 10px">
      <el-autocomplete
        v-model="searchText"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable=""
        placeholder="请输入搜索内容"
        class="searchfood"
        prefix-icon="el-icon-search"
      >
        <el-button
          slot="append"
          type="primary"
          class="findfood"
          @click="keysearch"
          >搜索</el-button
        >
      </el-autocomplete>
    </div>
    <div class="dinner">
      <div v-for="(item, index) in datas.list" :key="index" class="foods">
        <nuxt-link :to="`/recipe/${item.id}`">
          <img :src="item.recipePic" alt="大撒比，没有网" />
          <div class="nameslink">
            {{ item.title }}
          </div>
          <div class="autorlink">
            {{ item.userNickname }}
            &nbsp;&nbsp;&nbsp; {{ item.views }}&nbsp;做过
          </div>
        </nuxt-link>
      </div>
      <div class="foot">
        <el-button type="text" @click="decpages">上一页</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;第{{ page }}页/共{{ totalpage }}页&nbsp;&nbsp;
        <el-button type="text" @click="addpages">下一页</el-button>
      </div>
    </div>

    <el-button
      type="primary"
      style="margin-top: 40px; margin-left: 600px"
      @click="todofood"
      >点击上传菜谱</el-button
    >
  </div>
</template>
<script>
export default {
  name: 'Fmenu',
  data() {
    return {
      restaurants: [],
      datas: [],
      page: 1,
      searchText: '',
      rows: 12,
    }
  },
  computed: {
    totalpage() {
      return Math.ceil(this.datas.total / this.rows)
    },
  },
  mounted() {
    this.restaurants = this.loadAll()
    this.refreshData()
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return []
    },
    handleSelect() {},
    todofood() {
      this.$router.push({ path: '/recipe/adds' })
    },
    addpages() {
      if (this.page < this.totalpage) {
        this.page++
        this.refreshData()
      } else {
        alert('没有更多了')
      }
    },
    decpages() {
      if (this.page > 1) {
        this.page--
        this.refreshData()
      } else {
        alert('已经到第一页了')
      }
    },
    keysearch() {
      this.refreshData()
    },
    async refreshData() {
      const params = {
        page: this.page,
        rows: this.rows,
        searchText: this.searchText,
      }
      this.datas = await this.$api['recipe/loadlist'](params)
    },
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: rgb(31, 21, 175);
}
.searchfood {
  width: 300px;
  height: 40px;
  margin-left: 500px;
}
.findfood {
  width: 65px;
  height: 40px;
}
.dinner {
  display: flex;
  width: 700px;

  /* background-color: pink; */
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: 10px auto;
}
.foods {
  width: 200px;
  height: 300px;
  margin: 10px;
  background-color: pink;
}
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.nameslink {
  width: 200px;
  height: 20px;
  margin-top: 15px;
  text-align: center;
  overflow: hidden;
  font-size: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.autorlink {
  width: 200px;
  height: 16px;
  margin-top: 15px;
  text-align: center;
  font-size: 14px !important;
}
.foot {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
  height: 25px;
  line-height: 40px;
}
.foot .el-button:hover {
  color: rgb(12, 6, 97);
}
</style>
