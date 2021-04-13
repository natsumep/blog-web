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
        <el-tab-pane label="我收藏的" name="collect"> </el-tab-pane>
        <el-tab-pane label="我喜欢的" name="like"> </el-tab-pane>
        <el-tab-pane label="我上传的" name="upload"> </el-tab-pane>
        <!--<el-tab-pane label="我举报的" name="report"> </el-tab-pane>
        <el-tab-pane label="我审核的" name="verify"> </el-tab-pane> -->
      </el-tabs>
      <div v-if="searchType === 'upload'" class="flex-end flex-item-center">
        分类查询：<el-select
          v-model="stateType"
          placeholder="请选择"
          @change="loadData"
        >
          <el-option label="全部" value=""> </el-option>
          <el-option label="审核中" value="0"> </el-option>
          <el-option label="正常" value="1"> </el-option>
          <el-option label="驳回" value="-1"> </el-option>
        </el-select>
      </div>
      <el-table
        border
        :data="tableData"
        style="width: 100%; margin: 10px 0"
        :row-class-name="tableRowClassName"
      >
        <template v-for="item in tableList">
          <el-table-column
            v-if="item.prop === 'operation'"
            :key="item.prop"
            :label="item.label"
            :min-width="item.width"
            :align="item.align || 'left'"
          >
            <template v-for="btn in item.children">
              <el-button
                :key="btn.type"
                slot-scope="scope"
                size="mini"
                type="text"
                style="padding: 0 10px"
                @click="tableBtnClick(btn.type, scope.row)"
                >{{ btn.name }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="searchType === 'like' && item.prop === 'length'"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :resizable="true"
            :show-overflow-tooltip="true"
            :align="item.align || 'left'"
            ><el-dropdown slot-scope="scope">
              <span class="el-dropdown-link">
                共{{ scope.row.length }}次<i
                  class="el-icon-arrow-down el-icon--right"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(time, i) in scope.row.createTime"
                  :key="i"
                  >{{ time }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-table-column>
          <el-table-column
            v-else
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
import { dateFormat } from '~/utils/time'
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
      prop: 'type',
      label: '分类',
      width: '6',
      notype: 'caihong',
    },
    {
      prop: 'length',
      label: '我喜欢次数',
      align: 'center',
      width: '10',
    },
    {
      prop: 'likes',
      label: '喜欢(总计)',
      width: '10',
    },
    {
      prop: 'operation',
      label: '操作',
      width: 10,
      align: 'center',
      children: [
        {
          name: '详情',
          type: 'detail',
        },
      ],
    },
  ]

  collectList = [
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
      prop: 'type',
      label: '分类',
      width: '6',
      notype: 'caihong',
    },
    {
      prop: 'createTime',
      label: '收藏时间',
      width: '12',
    },
    {
      prop: 'collects',
      label: '总收藏人数',
      width: '9',
    },
    {
      prop: 'operation',
      label: '操作',
      width: 10,
      align: 'center',
      children: [
        {
          name: '详情',
          type: 'detail',
        },
      ],
    },
  ]

  uploadList = [
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
      prop: 'type',
      label: '分类',
      width: '6',
      notype: 'caihong',
    },
    {
      prop: 'stateName',
      label: '状态',
      width: '8',
    },
    {
      prop: 'createTime',
      label: '上传时间',
      width: '12',
    },
    {
      prop: 'operation',
      label: '操作',
      width: 10,
      align: 'center',
      children: [
        {
          name: '详情',
          type: 'detail',
        },
      ],
    },
  ]

  type = 'sentence'
  searchType = 'collect'
  tableData = []
  stateType = ''
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
    this.refreshData()
  }

  handleCurrentChange(v: number) {
    this.page = v
    this.loadData()
  }

  getSearchOption() {
    const { page, rows } = this
    const option: any = {
      page,
      rows,
    }
    if (this.searchType === 'upload') {
      option.state = this.stateType
    }
    return option
  }

  getStateName(type?: number) {
    if (typeof type === 'undefined') return ''
    if (type === 1) {
      return '正常'
    } else if (type === 0) {
      return '审核中'
    } else if (type === -1) {
      return '审核未通过'
    } else {
      return ''
    }
  }

  async loadData() {
    const url = this.$api['sentenceMe/' + this.type + this.searchType]
    const data = await url(this.getSearchOption())
    this.tableData = data.list.map((item: any, i: number) => {
      const index = (this.page - 1) * this.rows + i + 1
      const { createTime, state } = item
      let times
      if (Array.isArray(createTime)) {
        times = createTime.map((time) =>
          dateFormat('YYYY-mm-dd HH:MM:SS', time)
        )
      } else {
        times = dateFormat('YYYY-mm-dd HH:MM:SS', createTime)
      }
      return {
        index,
        ...item,
        createTime: times,
        stateName: this.getStateName(state),
      }
    })
    this.total = data.total
  }

  refreshData() {
    this.page = 1
    this.loadData()
  }

  tableRowClassName({ row }: any) {
    // if (rowIndex === 1) {
    //   return 'warning-row'
    // } else if (rowIndex === 3) {
    //   return 'success-row'
    // }
    if (this.searchType === 'upload') {
      if (row.state === 0) {
        return 'warning-row'
      }
    }
    return ''
  }

  tableBtnClick(type: string, row: any) {
    switch (type) {
      case 'detail':
        // console.log(this.type, this.searchType, type)
        this.$router.push('/' + this.type + '?uuid=' + row.uuid)
        break
      default:
    }
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
/deep/ .el-table .warning-row {
  background: oldlace;
}

/deep/ .el-table .success-row {
  background: #f0f9eb;
}
</style>
