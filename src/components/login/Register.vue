<!--  -->
<template>
  <div class="login__wrapper border-box register--scoped">
    <div class="login__content">
      <div class="login__content__header">
        <img src="../../../static/img/registerLogo.png" alt="logo">
      </div>
      <main class="content">
        <mt-field placeholder="请填写手机号码" v-model="logForm.phone" disableClear
                  class="mt-field--custom mt-field--mobile"></mt-field>
        <mt-field placeholder="请填写验证码" v-model="logForm.message" disableClear
                  class="mt-field--custom mt-field--identifying">
          <mt-button type="default" class="identifying-code" @click='getIdentifyingCode' :disabled="waitBtnDisabled">
            {{identifyingText}}
          </mt-button>
          <!-- <a >获取验证码</a> -->
        </mt-field>
        <mt-field placeholder="请填写密码" type="password" v-model="logForm.password" disableClear
                  class="mt-field--custom mt-field--password"></mt-field>
        <mt-button type="danger" class="login__btn" :disabled="btnDisabled" @click="registerSubmit">注 册</mt-button>
        <div class="footer">
          <span @click="goTopage('login')">立即登陆</span>
          <!-- <span @click="goTopage('login')">忘记密码</span> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>

  import md5 from 'js-md5'

  const phonReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  export default {
    data() {
      return {
        logForm: {
          phone: "",
          password: "",
          message: ""
        },
        btnDisabled: false,
        identifyingText: "获取验证码",
        timer: null,
        waitTime: 60,
        waitBtnDisabled: false
      };
    },

    computed: {},

    mounted() {
    },

    methods: {
      /** 点击获取验证码 */
      getIdentifyingCode() {
        if (phonReg.test(this.logForm.phone)) {
          if (this.waitTime == 0) {
            this.waitBtnDisabled = false;
            this.identifyingText = "获取验证码";
            this.waitTime = 60;
          } else if (this.waitTime === 60) {
            let obj = {phone: this.logForm.phone, identification: 'reg'}
            this.$store.dispatch('phoneVerificationCode', obj).then(res => {
              if (res.data.code === '0') {
                let data = res.data.data;
                console.log(data);
                this.$toast("已发送，注意查收");
              } else {
                this.$toast(res.data.msg);
              }
            })
            this.countDown();
          } else {
            this.countDown();
          }
        } else {
          this.$toast("请输入正确手机号");
        }
      },
      /** 定时器 */
      countDown() {
        this.waitBtnDisabled = true;
        this.identifyingText = "重新发送(" + this.waitTime + ")";
        this.waitTime--;
        setTimeout(() => {
          this.getIdentifyingCode();
        }, 1000);
      },
      goTopage(path) {
        this.$router.push(path);
      },
      validate() {
        if (
          this.logForm.phone &&
          this.logForm.password &&
          this.logForm.message
        ) {
          return true;
        } else {
          this.$toast("手机号/验证吗/密码不能为空");
          return false;
        }
      },
      parameterHandling() {
        let md5Password = md5(this.logForm.password);
        let form = Object.assign({}, this.logForm);
        form.password = md5Password;
        return form;
      },

      writeUserInfo2LocalStorage(data) {
        if (data) {
          let userInfo = data.wbUserDTO;
          console.log('userInfo ===');
          console.log(userInfo);
          let loginInfo = data.userLoginDTO;
          console.log('loginInfo ===');
          console.log(loginInfo);
          let wxInfo = data.userLoginWechatDTO;
          console.log('wxInfo ===');
          console.log(wxInfo);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', loginInfo.id);
          localStorage.setItem('id', userInfo.id);
          localStorage.setItem('mobile', userInfo.mobile);
          localStorage.setItem('w', JSON.stringify(wxInfo));
          this.$router.replace('/');
        }
      },
      /** 注册 */
      registerSubmit() {
        if (!this.validate()) {
          return
        } else {
          let phoneData = {};
          this.$store.dispatch('mobilePhoneNumberVerification', {phone: this.logForm.phone}).then(res => {
            if (res.data.code === '1026') {
              this.$toast('该手机号已经注册');
              return
            } else if (res.data.code === '1025') {
              //可以注册，调用注册
              let obj = this.parameterHandling();
              obj.unionId = localStorage.getItem('uid');
              this.$store.dispatch('userRegister', obj).then(res => {
                if (res.data.code === '0') {

                  let data = res.data.data;
                  this.writeUserInfo2LocalStorage(data);

                } else {
                  this.$toast(res.data.msg);
                }
              })
            } else if (res.data.code === '1027') {
              //有手机号无微信信息，调用绑定
              phoneData = res.data.data;
              let id = phoneData.id;
              let uid = localStorage.getItem('uid');
              this.$store.dispatch('mobileBindingToWechat', {id: id, unionId: uid}).then(res => {
                if (res.data.code === '1028') {
                  let data = res.data.data;
                  this.writeUserInfo2LocalStorage(data);
                }
              })

            } else {
              this.$toast(res.data.msg);
            }
          })
        }
      }
    }
  };
</script>

<style lang='scss'>
  .register--scoped {
    .login__content {
      header {
        background-color: #fff;
        img {
          margin-top: 70px;
        }
      }
      .content {
        padding-top: 0;
      }
    }
  }
</style>
