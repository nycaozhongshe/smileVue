<template>
  <div class="position-card" @click="cardClick">
    <div class="position-card-container">
      <div class="card-title clearfix">
        <span class="card-title-left fl">[{{positionInfo.position_address}}]{{positionInfo.position_company}}</span>
        <span class="card-title-right fr">{{positionInfo.position_depart}}</span>
      </div>
      <div class="card-foot">
        <p><span>{{positionInfo.position_graduation_year | positionFilter('position_graduation_year')}} </span> <span v-if="positionInfo.position_type === 1"> | 留用机会: {{positionInfo.position_regular | positionFilter('position_regular')}}</span>
        </p>
        <p><span>职位编号: {{positionInfo.position_index}}</span> <span class="fr">{{positionInfo.create_time | positionFilter('create_time')}} 发布</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    props: {
      positionInfo: {
        type: Object,
        default: () => {
          return {
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
          }
        },
      },
      positionType: {
        type: Number,
        default: 1
      },
    },
    methods: {
      cardClick() {
        this.$router.push(`/jobInfo/${this.positionInfo.id}`);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-card {
    margin: 0 auto 20px;
    width: 690px;
    height: 225px;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #e6e6e6;
    padding: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .position-card-container {
      .card-title {
        padding-bottom: 30px;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
        font-size: 30px;
        color: #333333;
        .card-title-left {
          width: 326px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .card-title-right {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .card-foot {
        font-size: 24px;
        color: #666666;
        p {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
