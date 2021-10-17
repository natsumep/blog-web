p.p:
<template>
  <div class="avatar-uploader-wrapper">
    <label class="avatar-uploader flex-center" @click="labelClick">
      <template v-if="current">
        <img class="avatar" :src="current" alt="" />
        <div class="box-wrapper flex-center">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </template>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </label>
    <input
      ref="uploadFile"
      class="upload-file"
      type="file"
      @change="avatarUpload($event)"
    />
  </div>
</template>

<script>
import { updateFile } from '~/utils/uploadFile'
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
    labelClick() {
      this.$refs.uploadFile.click()
    },
    async avatarUpload(e) {
      const file = e.target.files[0]
      if (file) {
        if (!file.type.includes('image')) return
        this.current = await updateFile(file)
        console.log(this.current)
        this.current && this.$emit('avatarChange', this.current)
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
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  width: 164px;
  height: 164px;
  border: 1px dashed #8c939d;
  position: relative;
  overflow: hidden;
  display: flex;
}
.avatar-uploader:hover {
  border-color: #ffd04b;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
  object-fit: cover;
  width: 100%;
}
@media screen and (max-width: 400px) {
  .avatar-uploader {
    width: 80px;
    height: 80px;
  }
}
</style>
