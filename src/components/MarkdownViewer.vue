<template>
  <Viewer
    ref="viweMain"
    height="100%"
    :initial-value="value"
    :options="editorOptions"
    @load="onEditorLoad"
    @change="onEditorLoad"
  />
</template>
<script lang="ts">
import { Viewer } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
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

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import 'tui-color-picker/dist/tui-color-picker.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import uml from '@toast-ui/editor-plugin-uml'
import chart from '@toast-ui/editor-plugin-chart'
// import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell'
// import fontSizePicker from 'tui-font-size-picker';
import { Component, Vue, Model, Emit, Watch } from 'vue-property-decorator'
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
    Viewer,
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
      chart,
      // tableMergedCell,
      // fontSizePicker
    ],
  }

  @Model('change', { type: String, default: '' }) value!: string[]

  @Watch('value')
  changeVal(data: string) {
    this.$refs.viweMain &&
      (this.$refs.viweMain as any).editor &&
      (this.$refs.viweMain as any).invoke('setMarkdown', data)
  }

  @Emit()
  changeEdit() {}

  onEditorLoad() {
    this.changeEdit()
  }

  mounted() {}
}
</script>
