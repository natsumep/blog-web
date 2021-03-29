<template>
  <el-dialog
    width="28%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="false"
    :modal-append-to-body="false"
    :fullscreen="false"
    :modal="false"
    :visible.sync="showDialog"
    title="审核当前句子"
    @close="hanldeDialogReportClose"
  >
    <div style="margin-bottom: 15px">
      <span
        style="
          width: 100px;
          text-align: right;
          padding-right: 12px;
          display: inline-block;
          box-sizing: border-box;
        "
        >句子内容</span
      >
      <span style="font-size: 15px; font-weight: 500"> {{ sententce }} </span>
    </div>
    <el-form ref="formReport" :model="formReport" label-width="100px">
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请选择审核类型',
            trigger: ['blur', 'change'],
          },
        ]"
        label="审核类型"
        prop="type"
      >
        <div>
          <el-radio v-model="formReport.type" label="谩骂攻击" border
            >谩骂攻击</el-radio
          >
          <el-radio v-model="formReport.type" label="反动违法" border
            >反动违法</el-radio
          >
          <el-radio v-model="formReport.type" label="色情低俗" border
            >色情低俗</el-radio
          >
          <el-radio v-model="formReport.type" label="营销广告" border
            >营销广告</el-radio
          >
          <el-radio v-model="formReport.type" label="作者不对" border
            >作者不对</el-radio
          >
          <el-radio v-model="formReport.type" label="来源不对" border
            >来源不对</el-radio
          >
          <el-radio v-model="formReport.type" label="类型不对" border
            >类型不对</el-radio
          >
          <el-radio v-model="formReport.type" label="其他" border
            >其他</el-radio
          >
        </div>
      </el-form-item>
      <el-form-item prop="content" label="审核内容">
        <el-input
          v-model="formReport.content"
          type="textarea"
          show-word-limit
          placeholder="请输入审核内容"
          :autosize="{ minRows: 3, maxRows: 8 }"
          maxlength="150"
          prop="content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitReport">提交</el-button>
        <el-button @click="handleHiddenReport">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Model,
  Emit,
  Watch,
} from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  showDialog = false
  @Model('change', { type: Boolean, default: false }) readonly show!: boolean

  @Emit('change')
  change(_val: boolean) {}

  @Prop() sententce!: string
  formReport = {
    type: '',
    content: '',
  }

  @Prop() sententceId!: string
  @Prop() sententceType!: string

  @Watch('show')
  changeShow(val: boolean) {
    if (val) {
      this.showDialog = true
    }
  }

  onSubmitReport() {
    ;(this as any).$refs.formReport.validate(async (valid: any) => {
      if (valid) {
        // const url = `https://www.tinker.run/api/${type}/add`;
        const url =
          this.sententceType === 'sentence'
            ? 'sentence/report'
            : 'sentence/caihongreport'
        const data: any = this.formReport
        data.id = this.sententceId
        await (this as any).$api[url](data)
        this.$message.success(
          '上传审核数据成功~~，如果你也想要参与到审核中来，点击我要审核参与审核吧~'
        )
        this.change(false)
        this.showDialog = false
      }
    })
  }

  handleHiddenReport() {
    this.showDialog = false
    this.change(false)
  }

  hanldeDialogReportClose() {
    this.showDialog = false
    this.change(false)
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-radio.is-bordered {
  margin: 10px;
}
</style>
