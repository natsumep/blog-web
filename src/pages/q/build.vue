<template>
  <div
    class="widget-vertical-three ask-wrapper"
    style="
      min-height: calc(100vh - 66px);
      width: 80%;
      max-width: 1400px;
      margin: 20px auto 0 auto;
    "
  >
    <div class="widget-vertical-three-header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/q' }">问答</el-breadcrumb-item>
        <el-breadcrumb-item>提问</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input
        v-model="title"
        style="margin: 24px 0 10px"
        placeholder="请输入提问的标题"
      >
      </el-input>
      <qa-tag :type="type" @typeChange="typeChange" />
    </div>
    <div
      class="widget-vertical-three-main"
      style="background: #eee; margin-top: 10px"
    >
      <div class="flex">
        <el-button type="primary" @click="submit">发表</el-button>
      </div>
      <client-only placeholder="markdown编辑器loading...">
        <markdown-editor
          v-if="isClient"
          ref="viweMain"
          :min-height="350"
          height="calc(100vh - 300px)"
          :value="editorText"
        ></markdown-editor>
      </client-only>
    </div>
  </div>
</template>

<script>
function getHTMLLength(html) {
  let div = document.createElement('div')
  div.innerHTML = html
  const length = div.textContent.trim().length
  div = null
  return length
}
export default {
  components: {
    markdownEditor: () => import('~/components/MarkdownEditor.client'),
  },
  beforeRouteEnter(_to, _from, next) {
    next((vm) => {
      if (vm.$route.params.id) {
        vm.loadData()
      } else {
        vm.setVal({})
      }
    })
  },
  beforeRouteLeave(_to, _from, next) {
    if (this.hadEdit) {
      this.centerDialogVisible = true
      this.nextFn = next
    } else {
      next()
    }
  },
  data() {
    return {
      isClient: process.client,
      anonymous: false,
      hadEdit: false,
      type: '', // 标签
      title: '',
      editorText: '',
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    typeChange(val) {
      this.type = val
    },
    setVal(data) {
      const { title = '', val = '', type = '' } = data
      this.title = title
      this.editorText = val
      this.type = type
    },
    loadData() {
      this.$api['qa/detail']({
        id: this.$route.params.id,
        isEdit: true,
      }).then(
        (data) => {
          this.setVal(data)
        },
        (e) => {
          if (e.status === 600) {
            // this.$message.error(e.msg);
          }
        }
      )
    },
    submit() {
      const { title = '', type = '' } = this
      const val = this.$refs.viweMain.getMarkdown()
      const length = getHTMLLength(this.$refs.viweMain.getHtml())
      const obj = {
        anonymous: this.anonymous,
        length,
      }

      obj.title = title
      obj.type = type
      obj.val = val

      if (this.checkData(obj)) {
        const api = 'qa/create'
        const msg = '添加'

        this.$api[api](obj).then(
          () => {
            this.$message.success(msg + '成功')
            this.hadEdit = false

            this.$router.replace('/q')
          },
          () => {
            this.$message.error(msg + '失败，请重试')
          }
        )
      }
    },
    checkData(data) {
      const { title, val } = data
      if (!title.length || !val.length) {
        this.$message.error('标题、内容存在空值，请输入完再提交')
        return false
      }
      return true
    },
  },
}
</script>

<style lang="less" scoped>
.ask-wrapper {
  max-width: 1500px;
  width: 75%;
  margin: 24px auto 0;
}

.flex {
  background-color: #fff;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 8px 24px;
}
</style>
