<!--  -->
<template>
  <div class="mailDelivery__wrapper border-box ">

    <div class="cmailDelivery__content">
      <section class="step__wrapper">
        <div class="title">
          <span>step1</span>
          <span>选择简历附件</span>
        </div>
        <div class="content">
          <div class="item">
            <mt-radio v-model="attaModel" :options="['上传简历附件 选择']" class="radio-box">
            </mt-radio>
            <div class="cheack-box">
              <div @click="chooseResume('atta')">
                <span>{{attaInfo.vitaeName || '请选择'}}</span>
                <span class="icon-xiala iconfont"></span>
              </div>
            </div>
          </div>
          <div class="item">
            <mt-radio v-model="attaModel" :options="['在线填写简历 选择']" class="radio-box">
            </mt-radio>
            <div class="cheack-box">
              <div @click="chooseResume('online')">
                <span>{{ onlineInfo.vitaeName ||'请选择'}}</span>
                <span class="icon-xiala iconfont"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="step__wrapper">
        <div class="title">
          <span>step2</span>
          <span>填写邮件标题</span>
        </div>
        <div class="content">
          <div class="item item--form">
            <mt-radio v-model="titleModel" :options="['Template']" class="radio-box">
            </mt-radio>
            <span class="label">【小金窝】</span>
            <div class="cheack-box form">
              <p>
                <input type="text" placeholder="姓名" v-model="emailTitleTemplate.name"> |
                <input type="text" placeholder="学校" v-model="emailTitleTemplate.school">|
                <input type="text" placeholder="学历" v-model="emailTitleTemplate.education">
              </p>
              <p>
                每周工作<input type="tel" maxlength="1" v-model="emailTitleTemplate.day">天 |
                <input type="text" placeholder="投递职位" v-model="emailTitleTemplate.position"></p>
            </div>
          </div>
          <div class="item">
            <mt-radio v-model="titleModel" :options="['input']" class="radio-box">
            </mt-radio>
            <span class="label">【小金窝】</span>
            <div class="cheack-box">
              <div>
                <input type="text" v-model="theme">
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="step__wrapper">
        <div class="title">
          <span>step3</span>
          <span>填写邮件正文</span>
        </div>
        <div class="tabs">
          <div class="tab" @click="selectMailTemplate(index)" :class="{'active': index ===tabNum}" v-for="(item,index) in tabList" :key="index">{{item}}</div>
        </div>
        <div class="content">
          <div ref="vueditor" class="vueditor">

          </div>
        </div>
      </section>
      <mt-button type="danger" class="post__btn" @click="deliverVitae">投 递</mt-button>
    </div>
    <poppup :slots="slots" @change-value="onValuesChange" :value-key="'vitaeName'" :visible="popupVisible" v-show="popupVisible" @popup-visible="popupClose"></poppup>
  </div>
</template>

<script>
  import wangeditor from 'wangeditor'
  import poppup from "./popup.vue";
  export default {
    data() {
      return {
        value: "",
        theme: "",
        /** 填写文件标题 手动填写 */
        tabNum: 0,
        username: "",
        popupVisible: false,
        resumeOnlineList: [],
        resumeAttachmentsList: [],
        attaType: null,
        onlineInfo: {
          vitaeName: ""
        },
        attaInfo: {
          vitaeName: ""
        },
        attaModel: "上传简历附件 选择",
        titleModel: "Template",
        emailTitleTemplate: {
          name: "",
          school: "",
          education: "",
          day: "",
          position: ""
        },
        emailTitleInput: "",
        slots: [{
          flex: 1,
          values: [],
          className: "picker-slot",
          textAlign: "center"
        }],
        tabList: ["模板一", "模板二", "模板三"],
        wangeditor: null,
      };
    },
    computed: {
      userId() {
        return localStorage.getItem("id");
      },
      emailContentTemplateList() {
        let fontSize = this.fontSize;
        let emailContentTemplate1 = `<p>尊敬的HR，您好：</p><p><br></p><p>    我是【真实姓名】，通过小金窝看到贵公司正在招聘。</p><p>    我是【学校及专业】的【学历】学生，【毕业时间】年毕业，我经过【公司及部门】实习，有了【业务】的经验。</p><p>    非常认可贵公司，希望获得本次招聘岗位的面试机会。</p><p><br></p><p style="text-align: right">【真实姓名】</p><p style="text-align: right">【电话】</p><p style="text-align: right">【邮箱】</p>`;
        let emailContentTemplate2 = `<p>尊敬的领导：</p><p><br></p><p>您好!</p><p>    我是【毕业时间】年毕业的【真实姓名】,在小金窝网上看到贵公司正招聘【部门】， 并一直期望有机会加盟贵公司。</p><p>    学生期间，我就读于【学校及专业】，并取得了优异的成绩，获得了【奖项】等奖项。</p><p>    我性格开朗，具备金融人士所必需的适应高强度的工作压力的能力。现将我的简历一并附上，希望你能考虑我的应聘要求。 最后，不管您是否选择我都请您接受我最诚挚的谢意!</p><p>    谨祝:&nbsp;</p><p>    贵公司扬独家之优势，汇天下之精华!</p><p style="text-align: right">【真实姓名】</p><p style="text-align: right">【手机号码】</p><p style="text-align: right">【邮箱】</p>`;
        let emailContentTemplate3 = `<p>尊敬的HR（女士/先生），</p><p><br></p><p>您好！</p><p>    从小金窝网站获得此招聘信息，我的求职简历见附件，请查收！希望能得到您的垂青！</p><p>    祝 工作愉快！</p><p style="text-align: right">【真实姓名】</p><p style="text-align: right">【手机号码】</p><p style="text-align: right">【邮箱】 </p>`;
        return [
          emailContentTemplate1,
          emailContentTemplate2,
          emailContentTemplate3
        ];
      },
      /** 填写文件标题 模板 */
      fillInTheHeadlines() {
        return `【小金窝】${this.emailTitleTemplate.name || ""} - ${this
                    .emailTitleTemplate.school || ""} - ${this.emailTitleTemplate
                    .education || ""} - 每周工作 ${this.emailTitleTemplate.day ||
                    ""}天 - ${this.emailTitleTemplate.position || ""}`;
      }
    },
    components: {
      poppup
    },
    mounted() {
      this.initVueditor()
    },
    beforeDestroy() {
      this.setContent("");
    },
    created() {
      this.selectMyVitae();
    },
    methods: {
      initVueditor() {
        this.wangeditor = new wangeditor(this.$refs.vueditor)
        this.wangeditor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        this.wangeditor.create()
        this.$nextTick(() => {
          let template = this.getLocalStorageContent()
          if (template) {
            this.setContent(template);
            this.tabNum = 3
          } else {
            let code = this.emailContentTemplateList[0];
            this.setContent(code);
          }

        });
      },
      popupClose() {
        this.popupVisible = false;
      },
      /** 选择简历 */
      chooseResume(type) {
        this.attaType = type;
        if (type === "online") {
          this.pickerValues("resumeOnlineList");
        } else {
          this.pickerValues("resumeAttachmentsList");
        }
      },
      /** 选择简历内容模板*/
      selectMailTemplate(index) {
        this.tabNum = index;
        let code = this.emailContentTemplateList[index];
        this.setContent(code);
      },
      /** 选择简历 弹出层处理*/
      pickerValues(params) {
        if (this[params].length) {
          this.popupVisible = true;
          this.slots[0].values = this[params];
        } else {
          this.$toast("暂无简历");
        }
      },
      /** 选择简历id*/
      onValuesChange(values) {
        if (this.attaType === "online") {
          this.onlineInfo = values;
        } else {
          this.attaInfo = values;
        }
      },
      /** 设置模板内容*/
      setLocalStorageContent(code) {
        localStorage.setItem("vueditorContent", JSON.stringify(code));
      },
      /** 获取模板内容*/
      getLocalStorageContent() {
        let content =localStorage.getItem("vueditorContent")
        return content? JSON.parse(content):false;
      },
      /** 设置内容*/
      setContent(code) {
        this.wangeditor.txt.clear()
        this.wangeditor.txt.append(code);
      },
      /** 获取内容*/
      getContent() {
        return this.wangeditor.txt.html();
      },
      /** 投递简历 参数处理*/
      deliverparameterHandling() {
        return {
          context: this.getContent(),
          //TODO
          //职位  暂时写死
          position_id: this.$route.query.id,
          //简历
          vitae_id: this.attaModel === "上传简历附件 选择" ?
            this.attaInfo ? this.attaInfo.vitae_id : "" : this.onlineInfo ? this.onlineInfo.vitae_id : "",
          // 用户id
          id: this.userId,
          //输入内容
          theme: this.titleModel === "Template" ? this.fillInTheHeadlines : this.theme
        };
      },
      /** 验证 */
      validate() {
        let form = this.deliverparameterHandling();
        if (!form.vitae_id) {
          this.$toast("请选择简历附件");
          window.scroll(0, 0);
          return false;
        }
        if (this.titleModel === "Template") {
          if (!(
              this.emailTitleTemplate.name &&
              this.emailTitleTemplate.school &&
              this.emailTitleTemplate.education &&
              this.emailTitleTemplate.day &&
              this.emailTitleTemplate.position
            )) {
            this.$toast("邮件标题不能为空");
            return false;
          }
        } else {
          if (!this.theme) {
            this.$toast("邮件标题不能为空");
            return false;
          }
        }
        if (!form.context) {
          this.$toast("邮件内容不能为空");
          return false;
        }
        return true;
      },
      /** 投递简历 */
      deliverVitae() {
        if (!this.validate()) return;
        this.$store
          .dispatch("deliverVitae", this.deliverparameterHandling())
          .then(res => {
            if (res.data.code == 0) {
              //模板存起来
              this.setLocalStorageContent(this.getContent());
              //路由跳转
              this.$router.push({
                name: "successfullyDelivered",
                query: {
                  id: this.$route.query.id
                }
              });
            } else {
              this.$toast("投递失败");
            }
          });
      },
      parameterHandling() {
        return {
          id: this.userId
        };
      },
      /** 获取简历 */
      selectMyVitae() {
        this.$store
          .dispatch("selectMyVitae", this.parameterHandling())
          .then(res => {
            if (res.data.code == 0) {
              res.data.data.ruv.forEach(item => {
                if (item.vitaeType === 1) {
                  this.resumeAttachmentsList.push(item);
                } else {
                  this.resumeOnlineList.push(item);
                }
              });
            }
          });
      }
    }
  };
</script>

<style lang='scss'>
  $border: solid 1px #e6e6e6;
  .mailDelivery__wrapper {
    color: #333333;
    .popup__wrapper {
      width: 100%;
      text-align: center;
      .title {
        font-size: 28px;
        line-height: 1.8;
      }
      .picker-item,
      .picker-item.picker-selected,
      .picker-center-highlight {
        height: 72px !important;
        line-height: 72px !important;
        font-size: 30px;
      }
    }
    .cmailDelivery__content {
      font-weight: normal;
      font-stretch: normal;
      margin-left: 30px;
      margin-right: 30px;
      height: 300px;
      .step__wrapper {
        border: $border;
        margin-bottom: 20px;
        .title {
          color: #c20c0c;
          font-size: 30px;
          height: 78px;
          line-height: 78px;
          border-bottom: $border;
          span:nth-child(1) {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
        .tabs {
          display: flex;
          padding-left: 50px;
          padding-top: 20px;
          padding-bottom: 20px;
          .tab {
            padding: 4px 26px;
            border: solid 1px #666666;
            border-radius: 50px;
            margin-right: 40px;
            color: #666666;
            font-size: 28px;
          }
          .active {
            color: #c20c0c;
          }
        }
        .content {
          padding: 30px;
          .vueditor {
            width: 100%;
            text-align: left;
            border: none;
            height: 100%;
            border-top: 1px solid #ddd;
            // padding-top: 20px;
            .w-e-toolbar {
              display: none;
            }
            .w-e-text-container,
            .w-e-text {
              height: 100% !important;
              border: none;
              font-size: 26px;
              z-index:  auto !important;
            }
          }
          .item {
            display: flex;
            align-items: center;
            /*垂直居中*/
            .cheack-box,
            .radio-box {
              width: 49%;
              background-color: #f6f8f9;
              vertical-align: bottom;
              * {
                background-image: none;
              }
              .mint-cell {
                background-image: none;
              }
              .mint-cell-wrapper {
                background-color: #f6f8f9;
              }
              .mint-radiolist-label {
                padding: 0;
              }
              .mint-radio-label {
                font-size: 26px;
              }
              .mint-radio-core {
                border-color: #c20c0c;
                // height: 20px;
                // width: 20px;
              }
              .mint-radio-core:after {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(1);
                border-radius: 50%;
                content: "";
              }
              .mint-radio-input:checked+.mint-radio-core {
                background-color: #c20c0c;
                border-color: #c20c0c;
              }
            }
            .cheack-box {
              margin-top: 10px;
              padding-left: 20px;
              padding-right: 20px;
              border: $border;
              height: 40px;
              // line-height: 1.8;
              line-height: 40px;
              input {
                background-color: #f6f8f9;
              }
              div {
                width: 100%;
                display: flex;
                font-size: 28px;
                justify-content: space-between;
              }
            }
          }
        }
      }
      .step__wrapper:nth-child(1) {
        .content {
          .item {
            .cheack-box {
              span {
                font-size: 24px;
              }
              span:nth-child(1) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .step__wrapper:nth-child(2) {
        .content {
          padding-right: 10px;
          .item {
            .radio-box {
              width: auto;
              .mint-radio-label {
                display: none;
                // margin-left: 0;
              }
              .mint-radiolist-label {
                padding-right: 0;
              }
              .mint-cell-wrapper {
                padding-right: 0;
              }
            }
            .label {
              vertical-align: middle;
              font-size: 26px;
              margin-top: 12px;
            }
            .cheack-box {
              flex: 1;
              border: none;
              padding: 0;
              input {
                display: inline;
                width: 100%;
                border: none;
                border-bottom: 1px solid #000;
                font-size: 28px;
              }
            }
          }
          .item--form {
            align-items: flex-start;
            .form {
              height: 120px;
              font-size: 24px;
              p:nth-child(2) {
                margin-top: 30px;
              }
              input {
                display: inline;
                border: none;
                width: 100px;
                border-bottom: 1px solid #000;
                font-size: 24px;
                text-align: center;
              }
              input:nth-child(1) {
                width: 110px;
              }
              input:nth-child(2) {
                width: 180px;
                margin-right: 10px;
                margin-left: 10px;
              }
              input:nth-child(3) {
                margin-left: 10px;
                width: 108px;
              }
              p:nth-child(2) input:nth-child(1) {
                width: 30px;
              }
              p:nth-child(2) input:nth-child(2) {
                width: 150px;
              }
            }
          }
        }
      }
      .step__wrapper:nth-child(3) {
        .content {
          height: 400px;
          padding: 0;
          .ve-design iframe {
            font-size: 12px;
          }
          .ve-design #iframe {
            font-size: 12px;
          }
        }
      }
      .post__btn {
        width: 100%;
        height: 96px;
        background-color: #c20c0c;
        border-radius: 48px;
        margin-bottom: 54px;
        font-size: 28px;
        .mint-button-text {
          font-size: 28px;
        }
      }
    }
  }
</style>
