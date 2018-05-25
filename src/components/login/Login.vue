<!--  -->
<template>
  <div class="login__wrapper border-box login--scoped">
    <div class="login__content">
      <div class="login__content__header">
        <img src="../../../static/img/loginLogo.png" alt="logo">
      </div>
      <main class="content">
        <mt-field label="" placeholder="请填写手机号码" v-model="logForm.phone" disableClear
                  class="mt-field--custom mt-field--mobile">
        </mt-field>
        <mt-field label="" placeholder="请填写密码" type="password" v-model="logForm.password" disableClear
                  class="mt-field--custom mt-field--password">
        </mt-field>
        <mt-button type="danger" class="login__btn" @click="submitForm" :disabled="btnDisabled">登 陆</mt-button>
        <div class="footer">
          <!-- <span @click="goTopage('register')" v-if="registerBtnShow">立即注册</span> -->
          <!-- <span @click="goTopage('login')">忘记密码</span> -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import md5 from "js-md5";

  export default {
    data() {
      return {
        logForm: {
          phone: "",
          password: "",
        },
        btnDisabled: false
      };
    },

    computed: {
      registerBtnShow() {
        return JSON.parse(localStorage.getItem("uaMicromessenger")) || false;
      }
    },

    mounted() {
    },

    methods: {
      goTopage(path) {
        this.$router.push(path);
      },
      /** 验证 */
      validate() {
        if (this.logForm.phone && this.logForm.password) {
          return true;
        } else if (!this.logForm.phone) {
          this.$toast("手机号不能为空");
          return false;
        } else if (!this.logForm.password) {
          this.$toast("密码不能为空");
          return false;
        } else {
          this.$toast("手机号和密码不能为空");
          return false;
        }
      },
      /** 参数处理 */
      parameterHandling() {
        let md5Password = md5(this.logForm.password);
        let form = Object.assign({}, this.logForm);
        form.password = md5Password;
        return form;
      },
      /** 登陆 */
      submitForm() {
        if (!this.validate()) return;
        this.btnDisabled = true;
        //
        this.$store
          .dispatch("loginByPassword", this.parameterHandling())
          .then(res => {
            this.btnDisabled = false;
            if (+res.data.code === 0) {
              let data = res.data.data;
              let userInfo = data.wbUserDTO;
              let loginInfo = data.userLoginDTO;
              let wxInfo = data.userLoginWechatDTO;
              if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', loginInfo.id);
                localStorage.setItem('id', userInfo.id);
                localStorage.setItem('mobile', userInfo.mobile);
                localStorage.setItem('w', JSON.stringify(wxInfo));
                localStorage.setItem('uid', wxInfo.unionId);
                this.$router.push("/");
              }
            } else {
              localStorage.clear();
              switch (res.data.code) {
                case "1003":
                  this.$toast("无效的手机号");
                  break;
                case "1006":
                  this.$toast("手机号或密码不匹配");
              }
            }
          })
          .catch(err => {
            this.btnDisabled = false;
            console.log(err);
          });
        setTimeout(() => {
          this.logForm.password = "";
        }, 1000);
      }
    }
  };
</script>

<style lang='scss'>
  .login--scoped {
    .login__content__header {
      background-color: #c20c0c;
    }
  }
</style>
