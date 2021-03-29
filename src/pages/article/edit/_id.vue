<template>
  <div
    class="widget-vertical-three"
    style="
      min-height: calc(100vh - 66px);
      width: 80%;
      max-width: 1400px;
      margin: 0 auto;
    "
  >
    <template v-if="hasLogin">
      <div
        class="widget-vertical-three-header flex-just-beew"
        style="padding: 10px 0"
      >
        <div style="display: flex; width: 94.5%" class="flex-item-center">
          <div class="flex-item-center" style="display: flex; width: 80%">
            <span class="flex-fixed" style="width: 80px; text-align: right"
              >标题：
            </span>
            <el-input
              v-model="title"
              class="flex-auto"
              maxlength="30"
              type="text"
              placeholder="请输入标题"
              :show-word-limit="true"
            ></el-input>
          </div>
          <!-- <div class="flex-item-center" style="display: flex; width: 40%">
          <span class="flex-fixed" style="width: 80px; text-align: right"
            >作者：
          </span>
          <el-input
            v-model="author"
            maxlength="20"
            type="text"
            class="flex-auto"
            placeholder="请输入作者"
            :show-word-limit="true"
          ></el-input>
        </div> -->
          <div class="flex-item-center" style="display: flex; width: 50%">
            <span class="flex-fixed" style="width: 80px; text-align: right"
              >分类：
            </span>
            <el-input
              v-model="type"
              maxlength="50"
              type="text"
              class="flex-auto"
              placeholder="分类用/分开"
              :show-word-limit="true"
            ></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="类型用/分开，例如web/java/测试"
              placement="top"
            >
              <i class="el-icon-info"></i>
            </el-tooltip>
          </div>
          <!-- <div class="flex-item-center" style="display: flex; width: 50%">
          <span class="flex-fixed" style="width: 100px; text-align: right"
            >文章用途：
          </span>
          <el-select v-model="purpose" placeholder="请选择">
            <el-option label="文章列表" value="list"> </el-option>
            <el-option label="非文章列表" value="other"> </el-option>
          </el-select>
          <el-tooltip
            class="item"
            effect="dark"
            content="非文章列表用于其他地方编辑，勿选"
            placement="top"
          >
            <i class="el-icon-info"></i>
          </el-tooltip>
        </div> -->
          <div class="flex-item-center" style="display: flex; width: 35%">
            <span class="flex-fixed" style="width: 120px; text-align: right"
              >仅本人查看：
            </span>
            <el-select v-model="isPrivate" placeholder="请选择">
              <el-option label="是" :value="1"> </el-option>
              <el-option label="否" :value="0"> </el-option>
            </el-select>
          </div>
          <el-button
            style="margin-left: 10px"
            type="primary"
            @click="uploadVisible = true"
          >
            <i style="margin-right: 8px" class="el-icon-upload"></i>封面
          </el-button>
        </div>
        <div>
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </div>
      <div
        class="widget-vertical-three-header flex-item-center"
        style="margin-bottom: 10px"
      >
        <span class="flex-fixed" style="width: 80px; text-align: right">
          摘要：
        </span>
        <el-input
          v-model="abstract"
          type="textarea"
          placeholder="请输入摘要"
          maxlength="100"
          show-word-limit
        ></el-input>
      </div>
      <div
        class="widget-vertical-three-main"
        style="height: 100%; background: #eee"
      >
        <client-only placeholder="markdown编辑器loading...">
          <markdown-editor
            v-if="isClient"
            ref="viweMain"
            :value="editorText"
          ></markdown-editor>
        </client-only>
      </div>
      <div class="widget-vertical-three-footer"></div>
      <el-dialog title="提示" :visible.sync="uploadVisible" width="450px">
        <upload-pic
          style="width: 164px; margin: 0 auto 50px"
          :avatar="cardPic"
          @avatarChange="avatarChange"
        />
      </el-dialog>

      <!-- 编辑器已更改未提交，切换路由提醒 -->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <p style="color: 20px; text-align: center">
          内容已改动，尚未提交，是否确认离开当前页面
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="nextFn()">确 定</el-button>
        </span>
      </el-dialog>
    </template>
    <template v-else>
      <div>
        <div style="margin-top: 50px; line-height: 1.7">
          <h4>
            如需添加文章请先<span
              style="cursor: pointer; color: #03a9f4"
              @click="toLogin"
            >
              登录
            </span>
          </h4>
          <p>如果没有账号，可以先注册一个账号</p>
          <p>支持创作开放文章，同时支持创作私密文章</p>
          <p>在注册账号或者个人详情可以设置 home 字段</p>
          <p>访问 https://www.tinker.run/${home} 可以访问到自己的个人主页哟</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { userStore } from '~/store'
function getHTMLLength(html) {
  let div = document.createElement('div')
  div.innerHTML = html
  const length = div.textContent.length
  div = null
  return length
}
export default {
  components: {
    markdownEditor: () => import('~/components/MarkdownEditor.client'),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$route.params.id) {
        vm.loadData()
      } else {
        vm.setVal({})
      }
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
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
      nextFn: null,
      centerDialogVisible: false,
      hadEdit: false,
      cardPic: '',
      uploadVisible: false,
      title: '',
      editorText: '',
      author: '匿名',
      type: '',
      isPrivate: 0,
      abstract: '',
      purpose: 'list',
    }
  },
  computed: {
    hasLogin() {
      return userStore.token
    },
  },

  created() {},
  methods: {
    toLogin() {
      userStore.set_login_dialog_visible(true)
    },
    avatarChange(val) {
      this.cardPic = val
    },
    setVal(data) {
      const {
        title = '',
        val = '',
        author = '匿名',
        type = '',
        abstract = '',
        isPrivate = 0,
        cardPic = '',
        purpose = 'list',
      } = data
      this.title = title
      this.editorText = val
      this.hadEdit = false
      this.author = author
      this.type = type
      this.isPrivate = isPrivate
      this.cardPic = cardPic
      this.abstract = abstract
      this.purpose = purpose
    },
    loadData() {
      this.$api['article/detail']({
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
    // mdSwitch(){
    //    var mdValue = this.$refs.text.value;
    //     var converter = new showdown.Converter();
    //     var html = converter.makeHtml(mdValue);
    //     this.$refs.textValue.innerHTML = html;
    // }
    submit() {
      const {
        title = '',
        author = '',
        type = '',
        abstract = '',
        purpose = '',
        isPrivate = 0,
        cardPic,
      } = this
      const val = this.$refs.viweMain.getMarkdown()
      const length = getHTMLLength(this.$refs.viweMain.getHtml())
      const obj = {
        title,
        author,
        type,
        isPrivate,
        cardPic,
        val,
        length,
        purpose,
        abstract,
      }
      if (this.checkData(obj)) {
        let api = 'article/create'
        let msg = '添加'
        if (this.$route.params.id) {
          api = 'article/update'
          msg = '修改'
          obj.id = this.$route.params.id
        }
        this.$api[api](obj).then(
          () => {
            this.$message.success(msg + '成功')
            this.hadEdit = false
            this.$router.replace('/')
          },
          () => {
            this.$message.success(msg + '失败，请重试')
          }
        )
      }
    },
    checkData(data) {
      const { title, type, val } = data
      if (!title.length || !type.length || !val.length) {
        this.$message.error('标题、作者、内容存在空值，请输入完再提交')
        return false
      }
      return true
    },
  },
}
</script>
<style lang="less" scoped>
.widget-vertical-three {
  height: 100%;
  min-height: auto;
}
</style>
