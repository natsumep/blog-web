<template>
  <div class="ask-tag">
    <el-tag
      v-for="(tag, index) in dynamicTags"
      :key="index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else size="small" class="button-new-tag" @click="showInput"
      >+ 标签</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  watch: {
    type(val) {
      this.type && (this.dynamicTags = val.split('/'))
    },
  },
  mounted() {
    this.type && (this.dynamicTags = this.type.split('/'))
  },
  destroyed() {},
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$emit('typeChange', this.dynamicTags.join('/'))
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        this.$emit('typeChange', this.dynamicTags.join('/'))
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style>
.ask-tag .el-tag + .el-tag {
  margin-left: 10px;
}
.ask-tag .button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.ask-tag .input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
