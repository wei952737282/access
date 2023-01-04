<template>
  <div class="login-container">
    <div class="login-box">
        <img class="login-img" src="../../assets/images/login-img.png" alt="">
        <el-form v-if="isLogin" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">门禁管理后台</h3>
          </div>
          <el-form-item prop="username" >
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入您的账号" name="username" type="text" tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入您的密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span> -->
          </el-form-item>
          <div class="remember">
            <el-checkbox v-model="remember">下次自动登录</el-checkbox>
            <div class="forget" @click="toChangePwd">忘记密码?</div>
          </div>
          <span class="login-btn" @click.prevent="handleLogin">登录</span>

          <!-- <div class="tips">
            <span style="margin-right: 20px">mobile: admin</span>
            <span> password: any</span>
          </div> -->
        </el-form>
        <el-form v-else ref="forgetForm" :model="forgetForm"  class="login-form forget-form"  label-position="left">
          <div class="title-container">
            <h3 class="title">门禁管理后台</h3>
          </div>
          <el-form-item prop="mobile" >
            <span class="forget-icon">手机号码</span>
            <el-input ref="mobile" v-model="forgetForm.mobile" placeholder="请输入手机号码" name="mobile" type="text" tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="yzm">
            <span class="forget-icon">验证码</span>
            <el-input :key="passwordType" ref="yzm" v-model="forgetForm.yzm" :type="passwordType" placeholder="请输入新密码" name="yzm" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
            <span class="code-btn" @click="getCode">{{codeBtnTxt}}</span>
          </el-form-item>
          <el-form-item prop="password">
            <span class="forget-icon">新密码</span>
            <el-input :key="passwordType" ref="password" v-model="forgetForm.password" :type="passwordType" placeholder="请输入新密码" name="password" tabindex="2" auto-complete="on" />
          </el-form-item>
          <el-form-item prop="pwdagain">
            <span class="forget-icon">确认密码</span>
            <el-input :key="passwordType" ref="pwdagain" v-model="forgetForm.pwdagain" :type="passwordType" placeholder="请输入新密码" name="pwdagain" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          </el-form-item>
          <span class="login-btn" @click.prevent="changePwd">确定</span>
        </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { getYzm,resetPwd, getMenu} from '@/api/user';
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "admin123",
      },
      forgetForm: {
        username: "",
        yzm: "",
        password:"",
        pwdagain:""
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      remember: false,
      isLogin: true, // 是否是登录操作，false 代表忘记密码
      codeBtnTxt:'获取验证码',
      isGetting: false, // 是否正在请求验证码
      yzmTimer:null
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      
      this.$router.push({ path: this.redirect || "/" });
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then( data => {
              console.log(data)
              if(data.userId ){
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
                getMenu().then(data =>{
                  console.log(data)
                })
              }else{
                this.$message(data.msg)
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toChangePwd(){
      this.isLogin = false
    },
    getCode(){
      if(this.isGetting){
        return 
      }
      if(this.forgetForm.mobile === ''){
        this.$message('请输入手机号码')
        return 
      }else if(/^1[3-9]\d{8}$/.test(this.forgetForm.mobile)){
        this.$message('手机格式不正确')
        return
      }
      this.isGetting = true;
      getYzm({mobile:this.forgetForm.mobile,"scene": 22}).then( data => {
        console.log(data.data)
        var data = data.data;
        if(data.code == 200){
          var i = 60;
          this.codeBtnTxt = i+'s'
          this.yzmTimer = setInterval(()=>{
            i--
            if(i<0){
              this.codeBtnTxt = '获取验证码';
              clearInterval(this.yzmTimer);
              this.isGetting = false;
            }else{
              this.codeBtnTxt = i+'s'
            }
          },1000)
        }else{
          this.$message(data.msg)
        }
      })
      
    },
    changePwd(){
      if(this.forgetForm.mobile === ''){
        this.$message('请输入手机号码')
        return 
      }else if(/^1[3-9]\d{8}$/.test(this.forgetForm.mobile)){
        this.$message('手机格式不正确')
        return
      }
      resetPwd({
        "code": 1024,
        "mobile": this.forgetForm.mobile,
        "password": this.forgetForm.password
      }).then( data =>{
        console.log(data)
      })
    }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 0.47rem;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0.12rem 0.05em 0.12rem 0;
      color: #999;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .forget-form .el-input{
    width: 65%;
  }
  .forget-icon{
    width: 24%;
    margin-right: 4%;
    line-height: 1;
    display: inline-block;
    border-right: 1px solid #ccc;
  }

  .el-form-item {
    color: #454545;
    border-bottom: 1px solid #ccc;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url(../../assets/images/login-bg.png);
  overflow: hidden;

  .login-box {
    position: fixed;
    width: 14.15rem;
    height: 7.07rem;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: #ffffff;
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    padding: 1rem 1.8rem 0 1.1rem;
    box-sizing: border-box;
  }
  .login-img{
    position: absolute;
    left: 1.1rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5.18rem;
    height: 4.12rem;
  }
  .login-form{
    float: right;
    width: 4.3rem;
  }
  .forget{
    float: right;
    color: #0092ef;
    cursor: pointer;
  }
  .login-btn{
    display: block;
    width: 3rem;
    height: 0.66rem;
    line-height: 0.66rem;
    color: #ffffff;
    font-size: 0.22rem;
    background: linear-gradient(270deg, #6090FA 0%, #8687F8 100%);
    border-radius: 0.33rem 0.33rem 0.33rem 0.33rem;
    text-align: center;
    margin: 0.48rem auto 0;
  }
  .tips {
    font-size: 14px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .code-btn{
    width: 0.98rem;
    height: 0.42rem;
    line-height: 0.42rem;
    background: #6373EE;
    border-radius: 0.2rem;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 0;
    font-size: 12px;
    cursor: pointer;
  }
  .svg-container {
    color: #6373EE;
    vertical-align: middle;
    width: 22px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #333;
      text-align: left;
      font-weight: normal;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
