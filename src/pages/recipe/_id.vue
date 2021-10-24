<template>
  <div class="bodys">
    <div class="head">
      <div style="height: 100%; font-size: 40px; line-height: 60px">
        {{ datas.title }}
      </div>
    </div>
    <div class="title">
      <div style="height: 100%; font-size: 25px; line-height: 40px">
        {{ datas.abstract }}
      </div>
    </div>
    <div style="width: 540px; margin: 50px auto">
      <h2>用料</h2>
      <div v-for="(item, index) in ingredients" :key="index" class="material">
        <div
          style="
            padding-left: 10px;
            width: 270px;
            height: 100%;
            line-height: 51px;
            font-size: 20px;
            background: pink;
          "
        >
          {{ item.ingredient }}
        </div>
        <div
          style="
            width: 260px;
            height: 100%;
            padding-left: 10px;
            line-height: 51px;
            font-size: 20px;
            background: yellow;
          "
        >
          {{ item.vulue }}
        </div>
      </div>
    </div>
    <div style="width: 540px; margin: 50px auto">
      <h2>{{ datas.title }}的做法</h2>
      <div v-for="(item, index) in steps" :key="index" class="steps">
        <div class="order" style="width: 10px">
          <h2>{{ index + 1 }}</h2>
        </div>
        <div style="width: 320px; height: 164px; font-size: 20px">
          {{ item.cookstep }}
        </div>
        <img :src="item.vulue" alt="莫逗吧" />
      </div>
    </div>
    <div class="tips">
      <h4>小提示</h4>
      <div
        style="
          border: 1px dotted;
          width: 100%;
          min-height: 100px;
          margin-top: 10px;
        "
      >
        {{ datas.tips }}
      </div>
    </div>
    <el-button
      type="primary"
      style="margin-top: 40px; margin-left: 600px"
      @click="back"
      >返回首页</el-button
    >
  </div>
</template>
<script>
export default {
  name: 'Truedetail',
  data() {
    return {
      datas: [],
      ingredients: '',
      steps: '',
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    async refreshData() {
      this.datas = await this.$api['recipe/loaddetail']({
        id: this.$route.params.id,
      })
      this.ingredients = JSON.parse(this.datas.ingredients)
      this.steps = JSON.parse(this.datas.steps)
    },
    back() {
      this.$router.push({ path: '/recipe' })
    },
  },
}
</script>
<style scoped>
.head {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
}
.title {
  display: flex;
  margin-top: 40px;
  width: 100%;
  height: 40px;
  justify-content: center;
}
.material {
  display: flex;
  width: 100%;
  height: 51px;
  justify-content: left;
  border-bottom: 0.5px solid;
}
h2 {
  color: rgb(109, 135, 221);
  margin-bottom: 10px;

  /* margin-top: 10px; */
}
.steps {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  border-bottom: 0.5px solid;
}
.steps img {
  width: 165px;
  height: 165px;
  object-fit: cover;
}
.tips {
  width: 40%;

  /* height: 50px; */
  margin: 40px auto;
}
</style>
