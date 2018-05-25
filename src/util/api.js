// let url = 'http://192.168.1.28:8080/';
let url = 'http://192.168.1.15:8080/';
// let url = 'http://192.168.1.27:8080/';
// let url = 'http://39.104.51.142:8088/';


let api = {

  url: '',
  // url: 'http://192.168.1.15:8080/wbedu_api',

  //密码登陆接口
  loginByPassword: 'wbedu_api/wbedu/weiXinLogin/loginByPassword',

  //验证码登陆接口
  fastLogin: 'wbedu_api/wbedu/user/fastLogin',

  //用户注册接口
  userRegister: 'wbedu_api/wbedu/weiXinLogin/userRegister',

  //修改密码接口
  changeThePassword: 'wbedu_api/wbedu/user/changeThePassword',

  //提交手机验证码接口
  changeThePhoneNumberByMobile: 'wbedu_api/wbedu/user/changeThePhoneNumberByMobile',

  //验证手机号是否存在接口
  mobilePhoneNumberVerification: 'wbedu_api/wbedu/weiXinLogin/cellPhoneNumberCheck',

  //无微信号有手机号-绑定
  mobileBindingToWechat: 'wbedu_api/wbedu/weiXinLogin/mobileBindingToWechat',

  //微信登陆
  weChatLogin: 'wbedu_api/wbedu/weiXinLogin/weixinLogin',

  //微信js-config
  getWXJsConfig: 'wbedu_api/wbedu/payFunction/accessPermissionsByWX',

  //发送手机验证码接口
  phoneVerificationCode: 'wbedu_api/wbedu/user/phoneVerificationCode',

  //用户认证接口(上传证明文件)
  uploadingProofFile: 'wbedu_api/wbedu/wbUserFileController/uploadingProofFile',

  //用户认证接口
  userBeReadyAuthentication: 'wbedu_api/wbedu/wbUser/immediateAuthentication',

  //查询用户基本信息接口
  selectAuthenticationById: 'wbedu_api/wbedu/wbUser/selectAuthenticationById',

  //查询用户认证状态接口
  isAuthentication: 'wbedu_api/wbedu/wbUser/isAuthentication',

  //新增简历
  addVitae: 'wbedu_api/wbedu/recruit/addVitae',

  //展示招聘信息
  selectPosition: 'wbedu_api/wbedu/recruit/selectPosition',

  //条件查询
  selectByCondition: 'wbedu_api/wbedu/user/selectByCondition',

  //投递记录
  selectDeliveryRecord: 'wbedu_api/wbedu/recruit/selectDeliveryRecord',

  //预览简历
  previewMyVitae: 'wbedu_api/wbedu/recruit/previewMyVitae',

  //我的简历列表
  selectMyVitae: 'wbedu_api/wbedu/recruit/selectMyVitae',

  //发布招聘信息
  addPosition: 'wbedu_api/wbedu/recruit/addPosition',

  //加载城市列表
  selectByPid: 'wbedu_api/wbedu/city/selectByPid',

  //同类职位推荐
  selectSimilarityPosition: 'wbedu_api/wbedu/recruit/selectSimilarityPosition',

  //投递简历
  deliverVitae: 'wbedu_api/wbedu/recruit/deliverVitae',

  //删除简历
  updateVitaeDeleted: 'wbedu_api/wbedu/recruit/updateVitaeDeleted',

  //上传简历
  uploadVitaeAddress: 'wbedu_api/wbedu/recruit/uploadVitaeAddress',

  //查看简历详情
  selectVitae: 'wbedu_api/wbedu/recruit/selectVitae',

  //上传头像
  uploadAHeadImage: 'wbedu_api/wbedu/wbUserFileController/uploadAHeadImage',

  //上传简历照片
  uploadVitaePhoto: 'wbedu_api/wbedu/recruit/uploadVitaePhoto',

  //我发布的职位
  selectMyPosition: 'wbedu_api/wbedu/recruit/selectMyPosition',

  //修改简历
  updateVitae: 'wbedu_api/wbedu/recruit/updateVitae',

  //投递记录
  selectRecord: 'wbedu_api/wbedu/recruit/selectRecord',

  //删除职位
  updatePositionDeleted: 'wbedu_api/wbedu/recruit/updatePositionDeleted',

  //修改职位
  updatePosition: 'wbedu_api/wbedu/recruit/updatePosition',

  //获取首页轮播图
  getCarouselFigure: 'wbedu_api/wbedu/carouselFigure/getCarouselFigure',

  //获取首页banner
  getBanner: 'wbedu_api/wbedu/carouselFigure/getBanner',

  //职位id搜索
  selectePositionByIndex: 'wbedu_api/wbedu/recruit/selectePositionByIndex',

  //职位关键字搜索
  selectePositionByKeyword: 'wbedu_api/wbedu/recruit/selectePositionByImport',

  //发送邮箱地址
  pushUserEmail: 'wbedu_api/wbedu/active/pushUserEmail',

  //微信code
  wechatCode: 'wbedu_api/wbedu/weiXinLogin/wechatRegisterScanCode',

  //生成pdf
  generatePdf: 'wbedu_api/wbedu/resume/generatePdf',

  //下载pdf
  downloadResume: 'wbedu_api/wbedu/resume/downloadResume',

  //获取职位被投递列表
  selectEmail: 'wbedu_api/wbedu/recruit/selectEmail',

  //获取职位被投递详情
  selectEmailById: 'wbedu_api/wbedu/recruit/selectEmailById',

  //获取个人隐私信息
  getUserPrivacyByUser: 'wbedu_api/wbedu/userDetail/getUserPrivacyByUser',

  //修改个人心思信息
  updateUserPrivacyByHeader: 'wbedu_api/wbedu/userDetail/updateUserPrivacyByHeader',

  //反馈入口
  buildFeedback: 'wbedu_api/wbedu/feedback/buildFeedback',
}

for (let key in api) {
  api[key] = url + api[key];
}


export default api
