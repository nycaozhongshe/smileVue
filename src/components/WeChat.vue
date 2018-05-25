<template>
  <div class="we-chat">

  </div>
</template>

<script>

  import qs from 'qs';
  import {getUrlParams} from '../util/util'

  export default {
    data() {
      return {
        WXconfig: {
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx33867ed3140c3179', // 必填，公众号的唯一标识
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        }
      }
    },
    methods: {
      //获取js-config
      getJsConfig() {
        let url = location.href.split('#')[0];
        // let openId = JSON.parse(localStorage.getItem('w')).openid;
        let data = {url: url};
        this.$store.dispatch('getWXJsConfig', data).then(res => {
          let data = res.data.data;
          this.WXconfig.timestamp = data.timestamp;
          this.WXconfig.nonceStr = data.noncestr;
          this.WXconfig.signature = data.signature.toLowerCase();
          localStorage.setItem('t', this.WXconfig.timestamp);
          localStorage.setItem('n', this.WXconfig.nonceStr);
          wx.config(this.WXconfig)
        })
      },
      wechatLogin() {
        if (!location.search && !sessionStorage.getItem('code')) {
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
          let params = {
            appid: 'wx33867ed3140c3179',
            redirect_uri: 'http://m.xiaojinwo.com/zhaopin/#/',
            response_type: 'code',
            scope: 'snsapi_userinfo',
            state: 'LOGED'
          };
          let t = qs.stringify(params);
          url = url + '?' + t + '#wechat_redirect';
          window.location = url;
        } else if (!!location.search && !sessionStorage.getItem('code')) {
          let code = getUrlParams('code');
          if (code !== null) {
            sessionStorage.setItem('code', code);
            window.location = 'http://m.xiaojinwo.com/zhaopin/#/';
          }
        } else if (!location.search && !!sessionStorage.getItem('code')) {
          let n = {code: sessionStorage.getItem('code')};
          this.$store.dispatch('weChatLogin', n).then(res => {
            if (res.data.code === '1004') {   //成功
              let data = res.data.data;
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
              localStorage.setItem('uid', wxInfo.unionId);
              let w = localStorage.getItem('w');
              console.log('w ===');
              console.log(w);
              w = JSON.parse(w);
              if (!!w && w.unionId) {
                this.getJsConfig();
              } else {
                alert('服务器出错，请联系管理员');
              }
            } else if (res.data.code === '1005') {   //未绑定手机
              console.log(res.data.data.unionId);
              localStorage.setItem('uid', res.data.data.unionId);
              this.$store.commit('setState', {key: 'unionId', value: res.data.data.unionId})
              // this.$router.replace('/register');
            } else if (res.data.code === '1034') {   //code过期
              sessionStorage.removeItem('code');
              this.wechatLogin();
            } else {
              this.$toast(res.data.msg);
            }
          });
        } else {
          window.location = 'http://m.xiaojinwo.com/zhaopin/#/';
        }
      },

      getUA() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          localStorage.setItem("uaMicromessenger", true);
          console.log('true');
        } else {
          localStorage.setItem("uaMicromessenger", false);
          console.log('false');
        }
      },
    },
    created() {

      this.getUA();

      if (JSON.parse(localStorage.getItem('uaMicromessenger'))) {
        let uid = localStorage.getItem('uid') || null;
        if (uid) {
          return
        } else {
          this.wechatLogin();
        }
      } else {
        return
      }
    }
  }
</script>

<style>

</style>
