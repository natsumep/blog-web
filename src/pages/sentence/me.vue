<template>
  <div class="my-sentence">
    <div class="flex flex-center my-sentence-title">
      <el-radio-group v-model="type" @change="loadData">
        <el-radio label="sentence">句子</el-radio>
        <el-radio label="caihong">彩虹屁🌈</el-radio>
      </el-radio-group>
    </div>
    <div class="my-sentence-body">
      <el-tabs v-model="searchType" @tab-click="handleClick">
        <el-tab-pane label="我喜欢的" name="like"> </el-tab-pane>
        <!-- <el-tab-pane label="我收藏的" name="collect"> </el-tab-pane>
        <el-tab-pane label="我上传的" name="upload"> </el-tab-pane>
        <el-tab-pane label="我举报的" name="report"> </el-tab-pane>
        <el-tab-pane label="我审核的" name="verify"> </el-tab-pane> -->
      </el-tabs>

      <el-table
        border
        :data="tableData"
        style="width: 100%; margin: 10px 0"
        :row-class-name="tableRowClassName"
      >
        <template v-for="item in tableList">
          <el-table-column
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :resizable="true"
            :show-overflow-tooltip="true"
            :align="item.align || 'left'"
          >
          </el-table-column>
        </template>
      </el-table>
      <div class="block">
        <el-pagination
          :current-page.sync="page"
          background
          :page-sizes="[10, 15, 20, 50]"
          :page-size.sync="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="true"
          :prev-click="loadData"
          :next-click="loadData"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  likeList = [
    {
      prop: 'index',
      label: '排序',
      width: '5',
      align: 'center',
    },
    {
      prop: 'content',
      label: '内容',
      width: '40',
    },
    {
      prop: 'source',
      label: '来源',
      width: '10',
      notype: 'caihong',
    },
    {
      prop: 'author',
      label: '作者',
      width: '10',
      notype: 'caihong',
    },
    {
      prop: 'length',
      label: '我喜欢次数',
      width: '10',
    },
    {
      prop: 'likes',
      label: '喜欢(总计)',
      width: '10',
    },
  ]

  type = 'sentence'
  searchType = 'like'
  tableData = []
  page = 1
  rows = 15
  total = 0
  mounted() {
    this.loadData()
  }

  get tableList() {
    const data = (this as any)[this.searchType + 'List']
    return data.filter((item: any) => !item.notype || item.notype !== this.type)
  }

  handleClick() {
    this.refreshData()
  }

  handleSizeChange(v: number) {
    this.rows = v
    this.loadData()
  }

  handleCurrentChange(v: number) {
    this.page = v
    this.loadData()
  }

  getSearchOption() {
    const { page, rows } = this
    return {
      page,
      rows,
    }
  }

  async loadData() {
    const url = this.$api['sentenceMe/' + this.type + this.searchType]
    const data = await url(this.getSearchOption())
    this.tableData = data.list.map((item: any, i: number) => {
      const index = (this.page - 1) * this.rows + i + 1
      return {
        index,
        ...item,
      }
    })
    this.total = data.total
  }

  refreshData() {
    this.page = 1
    this.loadData()
  }

  tableRowClassName() {
    // if (rowIndex === 1) {
    //   return 'warning-row'
    // } else if (rowIndex === 3) {
    //   return 'success-row'
    // }
    return ''
  }
}
</script>
<style lang="less" scoped>
.my-sentence {
  max-width: 1200px;
  width: 60%;
  padding: 20px;
  margin: 20px auto;
  background: #fff;
  border-radius: 8px;
  //   .my-sentence-title {
  //     // border-bottom: 1px solid #ddd;
  //     padding-bottom: 20px;
  //   }
  .my-sentence-body {
    padding: 20px;
  }
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
