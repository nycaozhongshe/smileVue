<template>
  <div class="job-info">
    <div class="job-info-title-card">
      <div class="line-1 clearfix">
        <span>[{{positionInfo.position_address}}] {{positionInfo.position_depart}}</span>
        <span>{{positionInfo.create_time | positionFilter('create_time')}} 发布</span>
      </div>
      <div class="line-2 clearfix">
        <span>职位编号: {{positionInfo.position_index}}</span>
      </div>
      <div class="line-3 clearfix">
        <span>{{positionInfo.position_type | positionFilter('position_type')}}</span>
        <span> | {{positionInfo.position_graduation_year | positionFilter('position_graduation_year')}}</span>
        <span>留用机会: {{positionInfo.position_regular | positionFilter('position_regular')}}</span>
      </div>
      <div class="line-4 clearfix">
        <span>{{positionInfo.position_company}}</span>
        <span class="fr">
          <button @click="goDeliver">马上投递</button>
        </span>
      </div>
    </div>
    <position-info-card position-info-title="工作内容" :positionInfoContent="positionInfo.position_work_context"></position-info-card>
    <position-info-card position-info-title="任职要求" :positionInfoContent="positionInfo.position_work_requir"></position-info-card>
    <position-info-card position-info-title="其他内容" :positionInfoContent="positionInfo.position_work_other"></position-info-card>
    <position-info-card position-info-title="公司简介" :positionInfoContent="positionInfo.company_introduction"></position-info-card>
    <div class="position-info-line">
      <span>相似职位</span>
    </div>
    <div class="position-similar-list">
      <position-card-list :position-list="similarList"></position-card-list>
    </div>
    <div class="position-deliver-btn" @click="goDeliver">
      马上投递
    </div>
  </div>
</template>

<script>

  import positionInfoCard from './common/position-info-card'
  import positionCardList from './common/position-card-list'

  export default {
    data() {
      return {
        positionInfo: {
          "id": "565dcc5c924446958b5ffc1593399c3d",
          "position_company": "某券商研究所",
          "position_depart": "商贸零售行业",
          "position_direction": null,
          "position_industry": 4,
          "position_function": 2,
          "position_work_context": "<p>1、辅助搜寻&amp;分析行业数据；</p><p>2、辅助撰写行业及公司相关报告；</p><p>3、日报、周报等其他行业研究相关工作以及其他日常性事物；</p><p>4、可有外出调研及首席分析师培训机会；&nbsp;</p>",
          "position_work_requir": "<p>1、2018/2019/2020年毕业硕士研究生，本/硕为“理工、金融、经济”等相关学科，复合学科优先；</p><p>2、专业基础扎实，工作认真负责；</p><p>3、有一定研究能力，有相关实习经验优先； </p><p>4、熟练运用 WIND、Excel 等软件，有 CFA/CPA 证书优先；</p><p>5、每周至少 3 天，6个月。</p>",
          "position_email": "wuxn1010@163.com",
          "position_address": "上海",
          "position_persion_num": null,
          "position_validity": 1530374400000,
          "deleted": null,
          "create_time": 1526543855000,
          "update_time": null,
          "remark": "",
          "position_graduation_year": 0,
          "position_type": 1,
          "position_experience_begin": null,
          "position_experience_end": null,
          "position_regular": 1,
          "position_experience": null,
          "company_introduction": "<p> 略</p>",
          "user_id": "f33685f8a10b4d089dccac1f76e422b6",
          "username": null,
          "collert_num": 0,
          "position_index": 1974,
          "position_work_other": "<p> 略</p>",
          "isdeliver": null,
          "delivertime": null,
          "people_num": 0
        },
        similarList: [],
      }
    },
    components: {
      positionInfoCard,
      positionCardList,
    },
    methods: {
      getPositionInfo() {
        this.$store.dispatch('selectPosition', {id: this.id, user_id: null}).then(res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            this.positionInfo = data.rpDTO[0];
          }
        })
      },
      getSimilarPosition() {
        this.$store.dispatch('selectSimilarityPosition', {id: this.id}).then(res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            this.similarList = data.dto;
          }
        })
      },
      goDeliver() {
        this.$router.push({name: 'mailDelivery', query: {id: this.positionInfo.id}})
      },
    },
    computed: {
      id() {
        return this.$route.params.id;
      },
    },
    watch: {
      id() {
        this.getPositionInfo();
      },
    },
    created() {
      this.getPositionInfo();
      this.getSimilarPosition();
    },
  }
</script>

<style lang="scss" scoped>
  .job-info {
    padding: 0 30px 80px;
    .job-info-title-card {
      width: 690px;
      height: 265px;
      background-color: #ffffff;
      border-radius: 5px;
      border: solid 1px #e6e6e6;
      margin: 0 auto;
      padding: 32px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      color: #333333;
      .line-1 {
        height: 45px;
        line-height: 45px;
        span {
          vertical-align: bottom;
          &:nth-of-type(1) {
            font-size: 32px;
            float: left;
          }
          &:nth-of-type(2) {
            font-size: 22px;
            float: right;
          }
        }
      }
      .line-2 {
        height: 45px;
        line-height: 45px;
        font-size: 22px;
      }
      .line-3 {
        height: 65px;
        line-height: 65px;
        font-size: 22px;
        border-bottom: 1px solid #e6e6e6;
      }
      .line-4 {
        height: 67px;
        line-height: 67px;
        font-size: 26px;
        color: #666666;
        button {
          width: 171px;
          height: 50px;
          background-color: #c20c0c;
          border-radius: 25px;
          border: none;
          color: #ffffff;
          font-size: 24px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
    .position-info-line {
      width: 100%;
      height: 50px;
      position: relative;
      &::before {
        content: '';
        background-color: #666666;
        height: 2px;
        width: 100%;
        left: 0;
        top: 50%;
        position: absolute;
        z-index: 0;
      }
      span {
        font-size: 24px;
        color: #4d4d4d;
        position: absolute;
        display: inline-block;
        background-color: #f6f8f9;
        width: 140px;
        top: 50%;
        left: 50%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }
    .position-deliver-btn {
      background-color: #c20c0c;
      height: 77px;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #ffffff;
      font-size: 30px;
      text-align: center;
      line-height: 77px;
    }
  }

</style>
