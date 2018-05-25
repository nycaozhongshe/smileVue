import request from '../util/request'
import api from '../util/api'

/* eslint-disable */
const LOGIN = {
  state: {},
  mutations: {},
  actions: {
    loginByPassword({}, n) {
      return request.post(api.loginByPassword, n);
    },
    weChatLogin({}, n) {
      return request.post(api.weChatLogin, n);
    },
    getWXJsConfig({}, n) {
      return request.post(api.getWXJsConfig, n);
    },
    //验证手机号是否存在
    mobilePhoneNumberVerification({}, n) {
      return request.post(api.mobilePhoneNumberVerification, n);
    },
    //手机号+微信绑定
    mobileBindingToWechat({}, n) {
      return request.post(api.mobileBindingToWechat, n);
    },
    //获取手机验证码
    phoneVerificationCode({}, n) {
      return request.post(api.phoneVerificationCode, n);
    },
    //注册
    userRegister({}, n) {
      return request.post(api.userRegister, n);
    },
  },
  getters: {},
}

export default LOGIN;
