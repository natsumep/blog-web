<template>
  <div
    style="margin-bottom: 40px; height: calc(100vh - 210px)"
    :style="{ 'min-height': minHeight + 'px', height: height }"
  >
    <editor
      ref="viweMain"
      height="100%"
      :initial-value="value"
      :options="editorOptions"
      initial-edit-type="markdown"
      preview-style="vertical"
      @focus="hadEdit = false"
      @change="hadEdit = true"
    />
    <a href="https://ui.toast.com/tui-editor" target="_blank">模板使用教程</a>
    <span style="font-size: 13px">
      支持直接拖拽文件到编辑框上传 支持复制图片和拖拽图片到编辑框上传</span
    >
    <span style="color: red">
      由于服务端资源有限,上传的图片限制大小为300kb以下。
    </span>
  </div>
</template>
<script lang="ts">
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'highlight.js/styles/github.css'
// import hljs from 'highlight.js'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import typescript from 'highlight.js/lib/languages/typescript'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import c from 'highlight.js/lib/languages/c'
import markdown from 'highlight.js/lib/languages/markdown'
import nginx from 'highlight.js/lib/languages/nginx'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'

import { Editor } from '@toast-ui/vue-editor'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import 'tui-color-picker/dist/tui-color-picker.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor/dist/i18n/zh-cn.js'
import uml from '@toast-ui/editor-plugin-uml'
// import chart from '@toast-ui/editor-plugin-chart'
// import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
// import fontSizePicker from 'tui-font-size-picker';
import {
  Component,
  Vue,
  Emit,
  Model,
  Watch,
  Prop,
} from 'vue-property-decorator'
import { updateFile } from '~/utils/uploadFile'
;(hljs as any).registerLanguage('js', javascript)
;(hljs as any).registerLanguage('java', java)
;(hljs as any).registerLanguage('ts', typescript)
;(hljs as any).registerLanguage('sh', shell)
;(hljs as any).registerLanguage('sql', sql)
;(hljs as any).registerLanguage('c', c)
;(hljs as any).registerLanguage('md', markdown)
;(hljs as any).registerLanguage('nginx', nginx)
;(hljs as any).registerLanguage('xml', xml)
;(hljs as any).registerLanguage('html', xml)
;(hljs as any).registerLanguage('css', css)

@Component({
  components: {
    editor: Editor,
  },
})
export default class Upload extends Vue {
  editorOptions: any = {
    // ...
    usageStatistics: false,
    el: this.$refs.editor,
    language: 'zh-CN',
    height: '100%',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    linkAttribute: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    plugins: [
      [codeSyntaxHighlight, { hljs }],
      colorSyntax,
      uml,
      // chart,
      // tableMergedCell,
      // fontSizePicker
    ],
    addImageBlobHook() {},
  }

  @Model('change', { type: String, default: '' }) value!: string[]
  @Emit()
  change() {}

  @Prop({ default: 500 }) minHeight!: number
  @Prop({ default: 'calc(100vh - 210px)' }) height!: string
  @Watch('value')
  changeVal(data: string) {
    this.$refs.viweMain &&
      (this.$refs.viweMain as any).editor &&
      (this.$refs.viweMain as any).invoke('setMarkdown', data)
  }

  getMarkdown() {
    return (this.$refs.viweMain as any).invoke('getMarkdown')
  }

  getHtml() {
    return (this.$refs.viweMain as any).invoke('getHtml')
  }

  clearValue() {
    ;(this.$refs.viweMain as any).invoke('setMarkdown', '')
  }

  mounted() {
    ;(this.$refs.viweMain as any).editor.eventManager.removeEventHandler(
      'addImageBlobHook'
    )
    ;(this.$refs.viweMain as any).editor.eventManager.listen(
      'addImageBlobHook',
      async (blob: Blob, callback: any) => {
        // 此处填写自己的上传逻辑，url为上传后的图片地址
        const url = await updateFile(blob)
        url && callback(url)
      }
    )
    ;(this.$refs.viweMain as any).editor.eventManager.listen(
      'drop',
      async (data: any) => {
        const file = data.data.dataTransfer.files[0]
        if (file.type.includes('image')) return
        const url = await updateFile(file)
        if (url) {
          ;(this.$refs.viweMain as any).editor.exec('AddLink', {
            linkText: file.name,
            url,
          })
        }
      }
    )
  }
}
</script>
