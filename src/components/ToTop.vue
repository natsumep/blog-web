<template>
  <div v-if="showTop" class="to-top">
    <i
      style="
        font-size: 28px;
        margin-left: 2px;
        font-weight: 700;
        cursor: pointer;
        color: #999;
      "
      class="el-icon-arrow-up"
      @click="toTop"
    ></i>
  </div>
</template>
<script>
import { easeout } from '~/utils/animation'
export default {
  data() {
    return {
      showTop: false,
    }
  },

  mounted() {
    window.addEventListener(
      'scroll',
      (this._scrollEvt = () => {
        this.showTop = document.documentElement.scrollTop > 100
      })
    )
  },

  destroyed() {
    window.removeEventListener('scroll', this._scrollEvt)
  },
  created() {},
  methods: {
    toTop() {
      const doc = document.body.scrollTop
        ? document.body
        : document.documentElement
      easeout(doc.scrollTop, 0, 4, function (value) {
        doc.scrollTop = value
      })
    },
  },
}
</script>
<style lang="less" scoped>
.to-top {
  width: 35px;
  height: 35px;
  position: fixed;
  bottom: 120px;
  right: 120px;
  border: 2px solid #999;
  border-radius: 50%;
}
.top-system {
  span {
    margin-right: 20px;
  }
}
</style>
