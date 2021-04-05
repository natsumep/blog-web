<template>
  <div style="height: 100%; padding-top: 20px; min-height: calc(100vh - 66px)">
    <article-detail
      v-if="id && isClient"
      :id="id"
      :data="data"
      can-delete
    ></article-detail>
    <to-top></to-top>
  </div>
</template>

<script>
// import { easeout } from '~/utils/animation'
export default {
  async asyncData({ error, $api, params, app }) {
    try {
      const data = await $api['article/detail']({ id: params.id })
      app.head.title = data.title
      app.head.meta = [
        {
          hid: 'description',
          name: 'description',
          content: data.abstract || data.val.slice(0, 100),
        },
        {
          name: 'keywords',
          content: data.type.split('/').join(','),
        },
      ]
      return {
        data,
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  data() {
    return {
      id: '',
      isClient: process.client,
      data: {
        val: '',
      },
    }
  },
  head() {
    return {
      title: this.data.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.data.abstract || this.data.val.slice(0, 100),
        },
        {
          name: 'keywords',
          content: this.data.type.split('/').join(','),
        },
      ],
    }
  },

  mounted() {
    if (!this.$route.params.id) {
      this.$router.replace('/')
    }
    this.id = this.$route.params.id
  },

  destroyed() {},
  created() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.top-system {
  span {
    margin-right: 20px;
  }
}
</style>
