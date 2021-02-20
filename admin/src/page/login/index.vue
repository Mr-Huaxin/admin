<template>
  <div class="login-container">
    <form class="login-page">
      <h3>
        用户登录
        <span @click="handleSubmit" class="isActive-icon" ></span>
      </h3>
      <h4>
        <span>User Login</span>
      </h4>
      <div class="user" :class="{userwarn: isUserWarn}">
        <svg class="icon user-icon" aria-hidden="true">
          <use xlink:href="#icon-yonghuming"></use>
        </svg>
        <input v-model="LoginForm.username" @blur="userBlur" type="text" placeholder="User Name">
        <transition name="fade">
          <p class="user-warn-text" v-show="isUserWarn">用户名不能为空</p>
        </transition>
      </div>
      <div class="password" :class="{pawwarn: isPawWarn}">
        <svg class="icon password-icon" aria-hidden="true">
          <use xlink:href="#icon-mima"></use>
        </svg>
        <input v-model="LoginForm.password" @blur="passwordBlur" type="password" placeholder="PassWord">
        <transition name="fade">
          <p class="paw-warn-text" v-show="isPawWarn">密码不能为空</p>
        </transition>
      </div>
    </form>
  </div>
</template>
<script>
  import { loginIn } from '@/api/login';
  import {Message} from "element-ui";
  export default {
    name: "Login",
    data() {
      return {
        logining: false,
        isUserWarn: false,
        isPawWarn: false,
        LoginForm: {
          username: 'admin',
          password: 'admin123',
        },
        checked: false
      }
    },
    mounted () {
      this.keyupSubmit();
    },
    methods: {
      handleSubmit() {
        if(this.LoginForm.username !== '' && this.LoginForm.password !== '') {
          loginIn(this.LoginForm).then( res => {
            if(res.code === 0) {
              this.$router.push({path: '/'});
            }else {
              if(res.msg) {
                Message({message: res.msg,type: "error"});
              }
            }
          });
        }


      },
      // 用户名校验
      userBlur() {
        if(this.LoginForm.username === "") {
          this.isUserWarn = true;
        }else {
          this.isUserWarn = false;
        }

      },
      // 密码校验
      passwordBlur () {
        if(this.LoginForm.password === "") {
          this.isPawWarn = true;
        }else {
          this.isPawWarn = false;
        }
      },
      // enter键登录
      keyupSubmit() {
        let that = this;
        document.onkeydown = function (e) {
          if (e.keyCode == "13") {
            that.handleSubmit();
          }
        };
      }
    }
  }
</script>
<style scoped>
  .login-container {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../assets/img/login/backImg.png");
    background-position: center 0;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover; /* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover; /* 兼容Opera */
    zoom: 1;

  }

  .login-page {
    width: 316px;
    height: 255px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -127px;
    margin-top: -158px;
    background: rgba(15, 16, 16, 0.6);
    border-radius: 6px;
  }

  h3 {
    width: 260px;
    height: 23px;
    color: #fff;
    font-size: 18px;
    font-family: HYYakuHei-FEW, HYYakuHei;
    font-weight: normal;
    line-height: 23px;
    margin: 20px auto 12px;
  }

  .isActive-icon {
    width: 40px;
    height: 23px;
    line-height: 23px;
    display: block;
    float: right;
    cursor: pointer;
    background: url("../../assets/img/login/ShapeCopy.svg") right center no-repeat;
  }

  .isActive-icon:hover {
    background: url("../../assets/img/login/ShapeHover.svg") right center no-repeat;
  }

  h4 {
    width: 260px;
    font-family: HYYakuHei-FEW, HYYakuHei;
    font-weight: normal;
    margin: 0 auto 0;
  }

  h4 > span {
    display: block;
    width: 83px;
    color: #fff;
    font-size: 16px;
    border-top: 1px solid #979797;
    padding-top: 12px;
    /*background: url("../../assets/img/login/PensacolaBeach.svg") right top no-repeat;*/
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .user, .password {
    width: 260px;
    height: 38px;
    border: 1px solid #979797;
    margin: 0 auto;
    position: relative;
    border-radius: 3px;
  }

  .user {
    margin-top: 24px;
  }

  .password {
    margin-top: 28px;
  }

  .user-icon, .password-icon {
    color: #4AF6CD;
    font-size: 20px;
    margin: 8px;
  }

  .user > input, .password > input {
    width: 200px;
    height: 40px;
    color: #fff;
    font-size: 16px;
    margin-top: -20px;
  }

  .user-warn-text, .paw-warn-text {
    width: 260px;
    height: 20px;
    line-height: 20px;
    color: red;
    font-size: 12px;
    position: absolute;
    top: 40px;
    left: 0;
  }

  .userwarn,.pawwarn {
    border: 1px solid red;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
