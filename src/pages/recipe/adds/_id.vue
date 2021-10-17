<template>
  <div class="detailfoods">
    <el-form
      ref="formFood"
      :model="formFood"
      class="demo-form-food"
      :rules="rules"
    >
      <el-form-item prop="textarea1">
        <el-input
          v-model="formFood.textarea1"
          class="title"
          placeholder="添加菜谱名称"
          maxlength="20"
          show-word-limit
        >
        </el-input
      ></el-form-item>
      <div style="width: 541px; height: 500px; margin-top: 40px">
        <el-form-item
          ><upload-pic
            :avatar="formFood.url1"
            class="cover"
            @avatarChange="avatarChange"
        /></el-form-item>
      </div>
      <el-form-item prop="textarea2">
        <el-input
          v-model="formFood.textarea2"
          class="describe"
          placeholder="点击添加描述(100字以内)"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          maxlength="100"
          clearable
        >
        </el-input
      ></el-form-item>
      <h2>用料</h2>
      <div style="width: 100%; margin-top: 15px">
        <div
          v-for="(item, index) in formFood.arrfoods"
          :key="index"
          class="material"
        >
          <el-form-item
            :prop="'arrfoods.' + index + '.ingredients'"
            :rules="rules.ingredients"
          >
            <el-input
              v-model="item.ingredients"
              class="ingredients"
              placeholder="食材：如鸡蛋"
            >
            </el-input></el-form-item
          ><el-form-item
            :prop="'arrfoods.' + index + '.many'"
            :rules="rules.many"
          >
            <el-input
              v-model="item.many"
              class="ingredients"
              placeholder="用量：如1只"
            >
            </el-input
          ></el-form-item>
          <el-button
            :disabled="formFood.isDisabled"
            type="primary"
            icon="el-icon-delete"
            @click="dele"
          ></el-button>
        </div>
      </div>
      <div class="addfood" @click="add">追加一行用料</div>
      <h2 style="margin-top: 40px">做法</h2>
      <div style="width: 100%; margin-top: 15px">
        <div
          v-for="(step, index) in formFood.arrsteps"
          :key="index"
          class="steps"
        >
          <div class="order">
            <h2>{{ index + 1 }}</h2>
          </div>
          <div style="width: 305px">
            <el-form-item
              :prop="'arrsteps.' + index + '.cookstep'"
              :rules="rules.cookstep"
            >
              <el-input
                v-model="step.cookstep"
                class="foods_step"
                placeholder="点击添加步骤"
                type="textarea"
                style="height: 164px"
              >
              </el-input
            ></el-form-item>
          </div>
          <div style="width: 165px">
            <el-form-item
              :prop="'arrsteps.' + index + '.url'"
              :rules="rules.url"
            >
              <upload-pic
                :avatar="formFood.arrsteps[index].url"
                @avatarChange="avatarChange2($event, index)"
            /></el-form-item>
          </div>
          <div>
            <el-button
              :disabled="formFood.isDisabled2"
              type="primary"
              icon="el-icon-delete"
              @click="dele2"
            ></el-button>
          </div>
        </div>
        <div class="addfood" @click="add2">追加一条步骤</div>
      </div>
      <div style="margin: 40px auto; width: 100%">
        <el-form-item prop="textarea3">
          <el-input
            v-model="formFood.textarea3"
            placeholder="小提示"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10 }"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
      </div>
      <div class="submit">
        <el-form-item>
          <el-button type="primary" @click="submitForm('formFood')"
            >立即创建</el-button
          >
          <el-button type="primary" @click="resetForm('formFood')"
            >重置</el-button
          >
          <el-button type="primary" @click="back">返回首页</el-button>
        </el-form-item>
      </div></el-form
    >
  </div>
</template>
<script>
export default {
  name: 'Detailfood',
  data() {
    return {
      formFood: {
        textarea1: '',
        textarea2: '',
        textarea3: '',
        isDisabled: false,
        isDisabled2: false,
        ingredients: '',
        url1: '',
        arrfoods: [
          { ingredients: '', many: '' },
          { ingredients: '', many: '' },
        ],
        arrsteps: [{ cookstep: '', url: '' }],
      },
      rules: {
        textarea1: [
          { required: true, message: '请输入菜谱名称', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 1 到 15 个字符',
            trigger: 'blur',
          },
        ],
        textarea2: [
          { required: true, message: '请描述', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100个字符',
            trigger: 'blur',
          },
        ],
        textarea3: [
          { required: true, message: '请添加提示', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100个字符',
            trigger: 'blur',
          },
        ],
        ingredients: [
          { required: true, message: '请添加食材', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20个字符',
            trigger: 'blur',
          },
        ],
        many: [
          { required: true, message: '请添加用量', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20个字符',
            trigger: 'blur',
          },
        ],
        cookstep: [
          { required: true, message: '请添加用量', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur',
          },
        ],
        url: [
          { required: true, message: '请添加用量', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    add() {
      this.formFood.isDisabled = false
      this.formFood.arrfoods.push({ ingredients: '', many: '' })
      console.log(this.formFood)
    },
    add2() {
      this.formFood.isDisabled2 = false
      this.formFood.arrsteps.push({ cookstep: '', url: '' })
    },
    dele(index) {
      if (this.formFood.arrfoods.length <= 1) {
        this.formFood.isDisabled = true
      } else {
        this.formFood.arrfoods.splice(index, 1)
      }
    },
    dele2(index) {
      if (this.formFood.arrsteps.length <= 1) {
        this.formFood.isDisabled2 = true
      } else {
        this.formFood.arrsteps.splice(index, 1)
      }
    },
    back() {
      this.$router.push({ path: '/recipe' })
    },
    avatarChange(val) {
      this.formFood.url1 = val
      console.log(val)
    },
    avatarChange2(val, index) {
      this.formFood.arrsteps[index].url = val
      console.log(val)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-undef
          this.save()

          this.$router.replace('/recipe')
          alert('创建成功')
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    save() {
      const _food = this.formFood.arrfoods.map(function (d, array) {
        return { ingredient: d.ingredients, vulue: d.many }
      })
      const _step = this.formFood.arrsteps.map(function (c, array) {
        return { cookstep: c.cookstep, vulue: c.url }
      })
      const obj = {
        title: this.formFood.textarea1,
        abstract: this.formFood.textarea2,
        recipePic: this.formFood.url1,
        ingredients: JSON.stringify(_food),
        tips: '',
        steps: JSON.stringify(_step),
      }
      if (obj) {
        const api = 'recipe/upfood'
        const msg = '添加'

        this.$api[api](obj).then(
          () => {
            this.$message.success(msg + '成功')
          },
          () => {
            this.$message.error(msg + '失败，请重试')
          }
        )
      }
    },
  },
}
</script>
<style scoped>
.detailfoods {
  width: 40%;
  margin: 40px auto;
}
.title /deep/ .el-input__inner {
  font-size: 30px;
  color: grey;
  width: 541px;
  height: 50px;
  border: none;
  background: rgb(221, 221, 224);
}
.describe /deep/.el-textarea__inner {
  width: 541px;
  margin: 20px auto;
  background: rgb(221, 221, 224);
  font-size: 15px;
  color: rgba(7, 2, 17, 0.308);
  overflow: hidden;
  border: none;
}
.describe /deep/.element.style {
  height: 120px;
}
h2 {
  color: rgb(109, 135, 221);

  /* margin-top: 10px; */
}
.material {
  display: flex;
  justify-self: start;
  width: 100%;
  height: 40px;
}
.steps {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgb(183, 177, 238);
  margin-top: 10px;
}
.ingredients {
  float: left;
  width: 235px;
  font-size: 15px;
  background-color: aqua;
}
.addfood {
  width: 100px;
  margin-top: 7px;
  margin-left: 190px;
  font-size: 14px;
  background-color: rgb(143, 140, 140);
  color: rgb(248, 242, 242);
}
.addfood:hover {
  background-color: rgb(77, 78, 78);
  cursor: default;
}
.submit {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.cover /deep/ .avatar-uploader {
  width: 400px;
  height: 400px;
  margin: auto auto;
}
.foods_step /deep/ .el-textarea__inner {
  border: none;
  height: 164px;
}
.foot_step /deep/.element.style {
  height: 164px;
}
</style>
