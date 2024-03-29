<template>
  <div class="detail-wrapper">
    <div v-if="data.val" class="detail">
      <div class="flex-just-beew top-info">
        <div>
          <p class="top-system">
            <span>分类：{{ data.type || '未分类' }} </span>
            <span>作者：{{ data.author }}</span>
            <span>字数:{{ data.length }}</span>
            <span>浏览量:{{ data.views }}</span>
          </p>
          <p class="top-system">
            <span>预计预览时间: {{ readTime }}</span>
          </p>
          <p class="top-system">
            <span>首次发布时间: {{ formatData(data.createTime) }}</span>
            <span>修改时间: {{ formatData(data.updateTime) }}</span>
          </p>
        </div>

        <div class="top-btn">
          <router-link v-if="data.canDelete" :to="`/article/edit/${data.id}`"
            ><el-button type="primary" icon="el-icon-edit" circle></el-button
          ></router-link>
          <el-popconfirm
            v-if="data.canDelete"
            title="确认删除当前文章？"
            @confirm="deleteItem"
          >
            <el-button
              slot="reference"
              style="margin-left: 10px"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-popconfirm>
        </div>
      </div>
      <div ref="airicleContent" style="padding: 20px">
        <article>
          <div class="flex flex-center">
            <h1 class="flex-auto no-directory">
              {{ data.title }}
            </h1>
            <div class="flex-fixed download-btn">
              <el-tooltip
                effect="dark"
                content="下载的pdf是一整张图片"
                placement="top"
              >
                <el-button
                  style="margin-left: 10px"
                  type="primary"
                  @click="downloadFile"
                >
                  整图下载</el-button
                >
              </el-tooltip>
              <el-tooltip
                content="下载的pdf按A4纸大小裁剪成多页，可能会将字切断"
                placement="top"
              >
                <el-button
                  style="margin-left: 10px"
                  type="primary"
                  @click="downloadFilebyPage"
                >
                  分页下载</el-button
                >
              </el-tooltip>
            </div>
          </div>
          <h3 class="no-directory abstract" style="padding: 20px 0">
            {{ data.abstract }}
          </h3>
          <!-- <nuxt-content :document="data.val" height="100%" /> -->
          <markdown-viewer
            v-if="data.val"
            ref="detail"
            :value="data.val"
            @change-edit="getDom"
          ></markdown-viewer>
          <!-- <viewer v-if="data.val" :initial-value="data.val"  /> -->
        </article>
      </div>
    </div>

    <!-- 目录 -->
    <ul class="directory-wrapper">
      <h2>目录</h2>
      <div ref="directoryUl">
        <li
          v-for="(item, index) in directoryList"
          :key="item.href"
          @click="lightHigh($event, index)"
        >
          <a
            class="li lighthigh-follow-li"
            :class="item.value"
            :data-id="item.href"
            >{{ item.label }}</a
          >
        </li>
      </div>
    </ul>

    <!-- 评论区 -->
    <div class="comments">
      <comments
        :comments="comments"
        @addItem="addItem"
        @deleteItem="deleteCommit"
      />
    </div>
  </div>
</template>
<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { dateDiff } from '~/utils/time'
export default {
  components: {
    markdownViewer: () => import('../MarkdownViewer.client'),
  },
  props: {
    canDelete: Boolean,
    id: { type: String, default: '' },
    data: {
      type: Object,
      default: () => ({
        val: '',
      }),
    },
  },
  data() {
    return {
      comments: [],
      directoryList: [],
    }
  },
  computed: {
    readTime() {
      const length = this.data.length
      const readLength = 300
      const times = (length / readLength) * 60
      if (times < 60) {
        return `不到一分钟`
      } else {
        return '约' + Math.ceil(times / 60) + 'min'
      }
    },
    formatData() {
      return (val) => {
        return dateDiff(val)
      }
    },
  },
  watch: {},
  created() {},
  updated() {},
  _handleScroll: null,
  mounted() {
    // this.loadData()
    this.loadComments()
    window.addEventListener(
      'scroll',
      (this._handleScroll = this.handleScroll.bind(this)),
      true
    )
  },

  destroyed() {
    window.removeEventListener('scroll', this._handleScroll, true)
  },
  methods: {
    loadComments() {
      this.$api['comments/list']({ articleId: this.id })
        .then((data) => {
          this.comments = data.map((item) => {
            item.showCommentBox = false
            item.showMoreNum = 2
            return item
          })
        })
        .catch()
    },
    deleteCommit(id) {
      this.$api['comments/delete']({ id })
        .then(() => {
          this.$message.success('删除成功')
          this.loadComments()
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    addItem(dataInfo) {
      const { content, item } = dataInfo
      const option = { ...content, articleId: this.id }
      if (item.id) {
        option.pid = item.id
      }
      this.$api['comments/create'](option)
        .then(() => {
          this.loadComments()
          this.$message.success('新增成功')
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    // h标签的用法
    // 一、<h1>用来修饰网页的主标题，一般是网页的标题，文章标题，<h1>中部署主关键词。<h1>尽量靠近在html 中的<body>标签，
    //    越近越好，以便让搜索引擎最快的领略主题。
    // 二、<h2>表示一个段落的标题，或者说副标题，部署长尾关键词。
    // 三、<h3>表示段落的小节标题，<h3>效果跟Strong差不多，一般是用在段落小节。
    // 四、<h4>-<h6>基本很少用到，是告诉搜索引擎这些不是很重要的内容，当一篇文章内容较多的时候，可以用来说明一些内容是不很重要的。
    getDom() {
      const hArr = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
      const target = []
      const dom =
        this?.$refs?.detail?.$el?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
      dom.forEach((item, index) => {
        if (hArr.includes(item.nodeName)) {
          item.id = `${item.nodeName}_${index}`
          item.classList.add('lighthigh-follow')
          target.push({
            value: { [item.nodeName]: true, active: false },
            label: item.textContent,
            href: `#${item.id}`,
          })
        }
      })
      this.directoryList = target
      this.$nextTick(() => {
        this.handleScroll()
      })
    },
    lightHigh(_e, index) {
      this.directoryList.forEach((li, i) => {
        if (i !== index) {
          li.value.active = false
        } else {
          li.value.active = true
        }
      })
      // 锚点定位
      const offsetTop = document.querySelector(
        this.directoryList[index].href
      ).offsetTop
      document.documentElement.scrollTop = offsetTop - 30
    },
    handleScroll() {
      const dom = document.querySelectorAll('.lighthigh-follow')
      const clientH =
        document.documentElement.clientHeight || document.body.clientHeight
      dom.forEach((item, index) => {
        const clientRectTop = item.getBoundingClientRect().top // 内容区的top 距离窗口的高度;
        if (clientRectTop <= clientH * 0.4) {
          this.directoryList[index].value.active = true
          this.directoryList.forEach((_item, idx) => {
            if (idx !== index) {
              this.directoryList[idx].value.active = false
            }
          })
        }
      })
    },

    loadData() {
      // this.$api['article/detail']({ id: this.id }).then(
      //   (data) => {
      //     this.data = data
      //   },
      //   () => {
      //     this.$router.replace('/')
      //   }
      // )
    },
    deleteItem() {
      this.$api['article/delete']({ id: this.id }).then(
        () => {
          this.$message.success('删除成功')
          this.$router.replace('/')
        },
        () => {
          this.$message.error('删除失败')
        }
      )
    },
    // 不分页
    downloadFile() {
      html2canvas(this.$refs.airicleContent, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#fff',
        removeContainer: true,
        // foreignObjectRendering: true,
        onclone(ele) {
          ele.querySelector('.download-btn').style.display = 'none'
        },
      }).then((canvas) => {
        // const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // 方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          unit: 'px',
          format: [canvas.width, canvas.height],
        })
        // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
        pdf.addImage(canvas, 'JPEG', 0, 0, canvas.width, canvas.height)
        pdf.save(this.data.title + 'a4.nopage.pdf')
      })
    },
    downloadFilebyPage() {
      html2canvas(this.$refs.airicleContent, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#fff',
        removeContainer: true,
        onclone(ele) {
          ele.querySelector('.download-btn').style.display = 'none'
        },
      }).then((canvas) => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 592.28) * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          unit: 'px',
          format: 'a4',
        })
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(this.data.title + 'a4.page.pdf')
      })
    },
  },
}
</script>

<style scoped>
/* 目录css */
.li {
  display: block;
  color: #313131;
  line-height: 42px;
  cursor: pointer;
  padding: 0 24px;
}
.active {
  color: rgba(255, 208, 75, 1) !important;
}
.active::before {
  background-color: rgba(255, 208, 75, 1) !important;
}

.li:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.H1 {
  font-size: 18px;
  font-weight: 700;
}
.H1::before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 8px;
  background-color: #999;
  border-radius: 50%;
  position: relative;
  top: -2px;
}
.H2 {
  font-size: 16px;
  padding-left: 10px;
}
.H2::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  background-color: #999;
  border-radius: 50%;
  position: relative;
  top: -2px;
}
.H3 {
  padding-left: 20px;
}
.H4,
.H5,
.H6 {
  font-size: 12px;
  padding-left: 30px;
}
.H3::before,
.H4::before,
.H5::before,
.H6::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  background-color: #999;
  border-radius: 50%;
  position: relative;
  top: -2.5px;
}
</style>
<style lang="less" scoped>
.detail-wrapper {
  width: 800px;
  margin: 0 auto;
  position: relative;
  background: #fff;
  border-radius: 10px;
}
.detail {
  padding: 0 50px 50px 50px;
  width: 100%;
}
.top-info {
  padding: 10px 0;
  font-size: 14px;
}
.top-system {
  span {
    margin-right: 20px;
  }
}

.comments {
  padding: 15px 32px;
  min-height: 200px;
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 24px;
}
.abstract {
  font-size: 16px;
  color: #666;
}
.directory-wrapper {
  max-width: 300px;
  position: fixed;
  left: calc(50% + 400px);
  top: 200px;
  font-size: 14px;
  list-style-type: none;
}
@media screen and (max-width: 1600px) {
  .directory-wrapper {
    display: none;
  }
}
@media screen and (max-width: 400px) {
  .detail-wrapper {
    width: 100%;
  }
  .download-btn,
  .top-btn {
    display: none;
  }
  .top-system span {
    display: inline-block;
  }
  .top-info {
    padding: 10px;
  }
  .detail {
    padding: 0;
  }
}
</style>
<style>
body .tui-editor-contents *:not(table) {
  line-height: 1.6;
}
body .tui-editor-contents h3,
body .tui-editor-contents h4 {
  line-height: 2.5;
}
</style>
