<template>
  <div>
    <div class="panda" :class="pandaClass">
      <div class="ear"></div>
      <div class="face">
        <div class="eye-shade"></div>
        <div class="eye-white">
          <div class="eye-ball" :style="eyeBallCss"></div>
        </div>
        <div class="eye-shade rgt"></div>
        <div class="eye-white rgt">
          <div class="eye-ball" :style="eyeBallCss"></div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
      <div class="body"></div>
      <div class="foot">
        <div class="finger"></div>
      </div>
      <div class="foot rgt">
        <div class="finger"></div>
      </div>
    </div>
    <form :class="formClass" @submit.prevent="handleLogin">
      <div class="hand"></div>
      <div class="hand rgt"></div>
      <h1 style="text-align: center">登 录</h1>
      <div class="form-group">
        <input v-model="username" required="required" class="form-control" />
        <label class="form-label">账号 </label>
      </div>
      <div class="form-group">
        <input
          id="password"
          v-model="password"
          type="password"
          required="required"
          class="form-control"
          @focus="passwordIn"
          @blur="passwordOut"
        />
        <label class="form-label">密码</label>
        <p class="alert">{{ errorinfo }}</p>
        <button class="btn">登录</button>
        <p style="margin-top: 10px">
          没有账号？去<nuxt-link to="/user?edit=true">注册</nuxt-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
/*!
Copyright (c) 2021 by Vineeth.TR (https://codepen.io/vineethtrv/pen/NxqKoY)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { Component, Vue } from 'vue-property-decorator'
import { loginAjax } from '~/utils/loginPreservationUserInfo'
import { setTokenInfo } from '~/utils/passwordManagement'
import { userStore } from '~/store'

@Component
export default class Index extends Vue {
  formClass = {
    up: false,
    'wrong-entry': false,
  }

  pandaClass = {
    up: false,
  }

  documentMouseMove: any = null
  eyeBallCss = {
    width: 0 + 'px',
    height: 0 + 'px',
  }

  username = ''
  password = ''
  errorinfo = '服务器异常'
  onMouserMove(event: any) {
    const dw = document.documentElement.offsetWidth / 15
    const dh = document.documentElement.offsetHeight / 15
    const x = event.pageX / dw
    const y = event.pageY / dh
    this.eyeBallCss = {
      width: x + 'px',
      height: y + 'px',
    }
  }

  passwordIn() {
    this.pandaClass.up = true
  }

  passwordOut() {
    this.pandaClass.up = false
  }

  handleLogin() {
    const { username, password } = this
    loginAjax(
      { username, password },
      (token: any, expiresIn: any) => {
        setTokenInfo(token, expiresIn)
        userStore.set_login_dialog_visible(false)
        this.$router.replace('/')
        // console.log(userStore)
      },
      (e: any) => {
        this.errorinfo = (e && e.msg) || '服务器异常'
        this.formClass['wrong-entry'] = true
        setTimeout(() => {
          this.formClass['wrong-entry'] = false
        }, 3000)
      }
    )
  }

  mounted() {
    document.addEventListener(
      'mousemove',
      (this.documentMouseMove = this.onMouserMove.bind(this))
    )
  }

  destroyed() {
    document.removeEventListener('mousemove', this.documentMouseMove)
  }
}
</script>

<style scoped>
.panda {
  position: relative;
  width: 200px;
  margin: 50px auto;
}

.face {
  width: 200px;
  height: 200px;
  background: #fff;
  border-radius: 100%;
  margin: 50px auto;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  z-index: 50;
  position: relative;
  transition: top 0.5s;
  top: 0;
}
.ear {
  transition: top 0.5s;
  top: 0;
}
.ear,
.ear::after {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #000;
  z-index: 5;
  border: 10px solid #fff;
  left: -15px;
  top: -15px;
  border-radius: 100%;
}
.ear::after {
  content: '';
  left: 125px;
}
.panda.up .face {
  top: 70px;
}
.panda.up .ear {
  top: 70px;
  transition: top 0.5s;
}
.eye-shade {
  background: #000;
  width: 50px;
  height: 80px;
  margin: 10px;
  position: absolute;
  top: 35px;
  left: 25px;
  transform: rotate(220deg);
  border-radius: 25px/20px 30px 35px 40px;
}
.eye-shade.rgt {
  transform: rotate(140deg);
  left: 105px;
}

.eye-white {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: #fff;
  z-index: 500;
  left: 40px;
  top: 80px;
  overflow: hidden;
}
.eye-white.rgt {
  right: 40px;
  left: auto;
}

.eye-ball {
  position: absolute;
  width: 0;
  height: 0;
  left: 20px;
  top: 20px;
  max-width: 10px;
  max-height: 10px;
  transition: 0.1s;
}
.eye-ball::after {
  content: '';
  background: #000;
  position: absolute;
  border-radius: 100%;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
}

.nose {
  position: absolute;
  height: 20px;
  width: 35px;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50px 20px/30px 15px;
  transform: rotate(15deg);
  background: #000;
}

.body {
  background: #fff;
  position: absolute;
  top: 200px;
  left: -20px;
  border-radius: 100px 100px 100px 100px/126px 126px 96px 96px;
  width: 250px;
  height: 282px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.hand,
.hand::after,
.hand::before {
  width: 40px;
  height: 30px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  background: #000;
  margin: 5px;
  position: absolute;
  top: 70px;
  left: -25px;
}
.hand::after,
.hand::before {
  content: '';
  left: -5px;
  top: 11px;
}
.hand::before {
  top: 26px;
}
.hand.rgt,
.rgt.hand::after,
.rgt.hand::before {
  left: auto;
  right: -25px;
}
.hand.rgt::after,
.hand.rgt::before {
  left: auto;
  right: -5px;
}

.foot {
  top: 360px;
  left: -80px;
  position: absolute;
  background: #000;
  z-index: 1400;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 40px 40px 39px 40px/26px 26px 63px 63px;
  width: 82px;
  height: 120px;
}
.foot::after {
  content: '';
  width: 55px;
  height: 65px;
  background: #222;
  border-radius: 100%;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
}
.foot .finger,
.foot .finger::after,
.foot .finger::before {
  position: absolute;
  width: 25px;
  height: 35px;
  background: #222;
  border-radius: 100%;
  top: 10px;
  right: 5px;
}
.foot .finger::after,
.foot .finger::before {
  content: '';
  right: 30px;
  width: 20px;
  top: 0;
}
.foot .finger::before {
  right: 55px;
  top: 5px;
}
.foot.rgt {
  left: auto;
  right: -80px;
}
.foot.rgt .finger,
.foot.rgt .finger::after,
.foot.rgt .finger::before {
  left: 5px;
  right: auto;
}
.foot.rgt .finger::after {
  left: 30px;
  right: auto;
}
.foot.rgt .finger::before {
  left: 55px;
  right: auto;
}

form {
  max-width: 380px;
  padding: 20px 60px;
  background: #fff;
  height: 320px;
  margin: auto;
  display: block;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
  position: relative;
  transform: translateY(-100px);
  z-index: 500;
  border: 1px solid #eee;
}
form.up {
  transform: translateY(-180px);
}

h1 {
  color: #03a9f4;
  margin: 15px 0;
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', Arial;
}

.btn {
  background: #fff;
  padding: 5px;
  width: 150px;
  height: 35px;
  border: 1px solid #03a9f4;
  margin-top: 35px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 50px #03a9f4 inset;
  color: #fff;
}
.btn:hover {
  box-shadow: 0 0 #03a9f4 inset;
  color: #03a9f4;
}
.btn:focus {
  outline: none;
}

.form-group {
  position: relative;
  font-size: 15px;
  color: #666;
  text-align: center;
}
.form-group + .form-group {
  margin-top: 30px;
}
.form-group .form-label {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 5px;
  transition: 0.3s;
}
.form-group .form-control {
  width: 100%;
  position: relative;
  z-index: 3;
  height: 35px;
  background: none;
  border: none;
  padding: 5px 28px;
  transition: 0.3s;
  border-bottom: 1px solid #777;
  color: #555;
}
.form-group .form-control:invalid {
  outline: none;
}
.form-group .form-control:focus,
.form-group .form-control:valid {
  outline: none;
  box-shadow: 0 1px #03a9f4;
  border-color: #03a9f4;
}
.form-group .form-control:focus + .form-label,
.form-group .form-control:valid + .form-label {
  font-size: 12px;
  color: #03a9f4;
  transform: translateY(-15px);
}

.alert {
  position: absolute;
  color: #f00;
  font-size: 16px;
  right: -180px;
  top: -300px;
  z-index: 200;
  padding: 30px 25px;
  background: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0, 0);
  transition: linear 0.4s 0.6s;
}
.alert::after,
.alert::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  background: #fff;
  left: -19px;
  bottom: -8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}
.alert::before {
  width: 15px;
  height: 15px;
  left: -35px;
  bottom: -25px;
}

.wrong-entry {
  animation: wrong-log 0.3s;
}
.wrong-entry .alert {
  opacity: 1;
  transform: scale(1, 1);
}
@-webkit-keyframes eye-blink {
  to {
    height: 30px;
  }
}
@keyframes eye-blink {
  to {
    height: 30px;
  }
}
@-webkit-keyframes wrong-log {
  0%,
  100% {
    left: 0;
  }
  20%,
  60% {
    left: 20px;
  }
  40%,
  80% {
    left: -20px;
  }
}
@keyframes wrong-log {
  0%,
  100% {
    left: 0;
  }
  20%,
  60% {
    left: 20px;
  }
  40%,
  80% {
    left: -20px;
  }
}
</style>
