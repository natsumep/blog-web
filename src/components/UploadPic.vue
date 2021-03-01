<template>
  <div class="avatar-uploader-wrapper">
    <label class="avatar-uploader" for="avatar-input">
      <template v-if="current">
        <img class="avatar" :src="current" alt="" />
        <div class="box-wrapper">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </template>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </label>
    <input
      id="avatar-input"
      class="upload-file"
      type="file"
      @change="avatarUpload($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      default: '',
    },
    checkSize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      current: '',
    }
  },
  watch: {
    avatar(val) {
      this.current = val || ''
    },
  },
  mounted() {
    this.current = this.avatar
  },
  destroyed() {},
  created() {},
  methods: {
    avatarUpload(e) {
      const file = e.target.files[0]
      if (file) {
        if (!file.type.includes('image')) return
        if (this.checkSize && file.size > 1024 * 1024 * 2) {
          this.$message.error('文件大小不能超过2M!')
        } else {
          const formDate = new FormData()
          formDate.append('file', file)
          formDate.append('time', +new Date())
          this.$axios
            .post('http://222.222.222.125:8081/upload', formDate)
            .then((url) => {
              const name = url.data.url[0]
              this.current = 'http://222.222.222.125:8081/' + name
              this.$emit('avatarChange', this.current)
            })
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
.avatar-uploader-wrapper {
  position: relative;

  .upload-file {
    position: absolute;
    left: -999999px;
  }
  .box-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    visibility: hidden;
  }
  &:hover .box-wrapper {
    visibility: visible;
  }
}
.avatar-uploader {
  width: 164px;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: block;
}
.avatar-uploader:hover {
  border-color: #ffd04b;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 164px;
  height: 164px;
  line-height: 164px;
  text-align: center;
}
.avatar {
  width: 164px;
  height: 164px;
  display: block;
  object-fit: contain;
}
</style>
