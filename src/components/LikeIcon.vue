<template>
  <div
    v-loading="isLoad"
    class="like-button"
    element-loading-spinner="el-icon-loading"
    :class="{ liked: isActive }"
    @click="changeLike"
  >
    <span class="like-icon">
      <div class="heart-animation-1"></div>
      <div class="heart-animation-2"></div>
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
@Component
export default class Index extends Vue {
  @Prop({ default: false }) private isActive!: boolean
  @Prop({ default: false }) private isLoad!: boolean
  @Emit()
  change() {}

  changeLike() {
    if (this.isLoad) return
    this.change()
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-loading-spinner {
  margin-top: -13px;
  width: 100%;
  margin-left: 2px;
  text-align: center;
  position: absolute;
}
.like-wrapper {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  width: 50%;
}
.like-icon {
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: grayscale(100%);
  width: 18px;
  height: 16px;
  display: inline-block;
  position: relative;
  margin-right: 0.25em;
  font-size: 1.5rem;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMSAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAuMTAxIDQuNDE3UzguODk1LjIwNyA1LjExMS4yMDdjLTQuNDY1IDAtMTAuOTY3IDYuODQ2IDUuMDgyIDE3LjU5MkMyNS4yMzcgNy4wMyAxOS42NjUuMjAyIDE1LjUwMS4yMDJjLTQuMTYyIDAtNS40IDQuMjE1LTUuNCA0LjIxNXoiIGZpbGw9IiNGRjZFNkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
    no-repeat center;
  background-size: 100%;
  animation: heartUnlike 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.like-button:hover {
  border-color: currentColor;
}
.liked .like-icon {
  animation: heartPulse 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.like-button.liked .like-icon {
  color: #ff6e6f;
  border-color: currentColor;
  filter: grayscale(0);
}

.liked .like-icon [class^='heart-animation-'] {
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyMSAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAuMTAxIDQuNDE3UzguODk1LjIwNyA1LjExMS4yMDdjLTQuNDY1IDAtMTAuOTY3IDYuODQ2IDUuMDgyIDE3LjU5MkMyNS4yMzcgNy4wMyAxOS42NjUuMjAyIDE1LjUwMS4yMDJjLTQuMTYyIDAtNS40IDQuMjE1LTUuNCA0LjIxNXoiIGZpbGw9IiNGRjZFNkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')
    no-repeat center;
  background-size: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 14px;
  opacity: 0;
}
.liked .like-icon [class^='heart-animation-']::before,
.liked .like-icon [class^='heart-animation-']::after {
  content: '';
  background: inherit;
  background-size: 100%;
  width: inherit;
  height: inherit;
  display: inherit;
  position: relative;
  top: inherit;
  left: inherit;
  opacity: 0;
}
.liked .like-icon .heart-animation-1 {
  animation: heartFloatMain-1 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
.liked .like-icon .heart-animation-1::before,
.liked .like-icon .heart-animation-1::after {
  width: 12px;
  height: 10px;
  visibility: hidden;
}
.liked .like-icon .heart-animation-1::before {
  opacity: 0.6;
  animation: heartFloatSub-1 1s 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
}
.liked .like-icon .heart-animation-1::after {
  animation: heartFloatSub-2 1s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
  opacity: 0.75;
}
.liked .like-icon .heart-animation-2 {
  animation: heartFloatMain-2 1s 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
}
.liked .like-icon .heart-animation-2::before,
.liked .like-icon .heart-animation-2::after {
  width: 10px;
  height: 8px;
  visibility: hidden;
}
.liked .like-icon .heart-animation-2::before {
  animation: heartFloatSub-3 1s 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
  opacity: 0.25;
}
.liked .like-icon .heart-animation-2::after {
  animation: heartFloatSub-4 1s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    both;
  opacity: 0.4;
}

@-webkit-keyframes heartPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

@keyframes heartPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}

@keyframes heartUnlike {
  50% {
    transform: scale(0.75);
  }
}
@keyframes heartFloatMain-1 {
  0% {
    opacity: 0;
    transform: translate(0) rotate(0);
  }
  50% {
    opacity: 1;
    transform: translate(0, -25px) rotate(-20deg);
  }
}
@keyframes heartFloatMain-2 {
  0% {
    opacity: 0;
    transform: translate(0) rotate(0) scale(0);
  }
  50% {
    opacity: 0.9;
    transform: translate(-10px, -38px) rotate(25deg) scale(1);
  }
}

@keyframes heartFloatSub-1 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(13px, -13px) rotate(30deg);
  }
}

@keyframes heartFloatSub-2 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(18px, -10px) rotate(55deg);
  }
}

@keyframes heartFloatSub-3 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(-10px, -10px) rotate(-40deg);
  }
  100% {
    transform: translate(-50px, 0);
  }
}

@keyframes heartFloatSub-4 {
  0% {
    visibility: hidden;
    transform: translate(0) rotate(0);
  }
  50% {
    visibility: visible;
    transform: translate(2px, -18px) rotate(-25deg);
  }
}
</style>
