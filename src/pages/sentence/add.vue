<template>
  <div class="sentence-add">
    <el-alert
      v-if="!token"
      style="margin-bottom: 20px"
      title="需登录才可以上传哟~"
      type="warning"
    >
    </el-alert>
    <div style="margin-bottom: 20px; display: flex">
      <span class="add-type">上传类型</span>
      <el-radio-group v-model="radio">
        <el-radio label="sentence">句子杂货铺</el-radio>
        <el-radio label="caihong">彩虹屁🌈</el-radio>
      </el-radio-group>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item
        v-if="radio === 'sentence'"
        :rules="[
          {
            required: true,
            message: '请选择句子类型',
            trigger: ['blur', 'change'],
          },
        ]"
        label="句子类型"
        prop="typeId"
      >
        <el-select v-model="form.typeId" placeholder="请选择句子类型">
          <el-option
            v-for="item in type"
            :key="item.id"
            :label="`${item.name}（类型id: ${item.id}）`"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="radio === 'sentence'" label="句子作者" prop="author">
        <el-input
          v-model="form.author"
          placeholder="请输入句子作者,据不完全统计，存在句子作者更有利于通过审核"
          show-word-limit
          maxlength="50"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="radio === 'sentence'" prop="source" label="句子出处">
        <el-input
          v-model="form.source"
          placeholder="请输入句子出处,据不完全统计，存在句子出处更有利于通过审核"
          show-word-limit
          maxlength="50"
          prop="source"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="content"
        label="句子内容"
        :rules="[
          {
            required: true,
            message: '请输入句子内容',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input
          v-model="form.content"
          type="textarea"
          show-word-limit
          placeholder="请输入句子内容"
          :autosize="{ minRows: 3, maxRows: 8 }"
          maxlength="150"
          prop="content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userStore } from '~/utils/store-accessor'
@Component
export default class Index extends Vue {
  form = {
    content: '',
    author: '',
    source: '',
    typeId: '',
  }

  radio = 'sentence'
  type = [
    { id: 1, name: '原创' },
    { id: 2, name: '诗词' },
    { id: 3, name: '影视' },
    { id: 4, name: '动画' },
    { id: 5, name: '漫画' },
    { id: 6, name: '游戏' },
    { id: 7, name: '文学' },
    { id: 8, name: '网络' },
    { id: 9, name: '网易云' },
    { id: 10, name: '哲学' },
    { id: 11, name: '歌词' },
    { id: 100, name: '其他' },
  ]

  get token() {
    return userStore.token
  }

  async loadType() {
    try {
      const res = await (this as any).$api['sentence/type']()
      this.type = res
    } catch (e) {}
  }

  mounted() {
    this.loadType()
  }

  onSubmit() {
    ;(this as any).$refs.form.validate(async (valid: boolean) => {
      if (valid) {
        const url =
          this.radio === 'sentence' ? `sentence/add` : `sentence/caihongadd`
        const data = this.form
        await this.$api[url](data)
        ;(this as any).$refs.form.resetFields()
        this.$message.success('上传成功,正在加速审核中...,后续可以在我的查到')
      }
    })
  }
}
</script>
<style lang="less" scoped>
.sentence-add {
  width: 600px;
  padding: 20px 40px;
  background: #fff;
  margin: 0 auto;
  margin-top: 20px;
}
.add-type {
  width: 100px;
  text-align: right;
  padding-right: 12px;
  display: inline-block;
  box-sizing: border-box;
}
</style>
