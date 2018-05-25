<template>
  <div class="job-index">
    <div class="search-container" @click="$router.push('/jobSearch')">
      <img src="../../../static/img/search.png" alt="">
    </div>
    <div class="position-container">
      <div class="position-internship-container position-box">
        <h3 class="position-box-title">
          实习岗位
        </h3>
        <position-card-list :positionList="internshipPositions"></position-card-list>
        <div class="position-more" @click="$router.push('/jobList/实习岗位')">更多职位 ></div>
      </div>
      <div class="position-school-container position-box">
        <h3 class="position-box-title">
          校招岗位
        </h3>
        <position-card-list :positionList="schoolPositions"></position-card-list>
        <div class="position-more" @click="$router.push('/jobList/校招岗位')">更多职位 ></div>
      </div>
      <div class="position-social-container position-box">
        <h3 class="position-box-title">
          社招岗位
        </h3>
        <position-card-list :positionList="socialPositions"></position-card-list>
        <div class="position-more" @click="$router.push('/jobList/社招岗位')">更多职位 ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import positionCardList from './common/position-card-list'

  export default {
    components: {
      positionCardList,
    },
    data() {
      return {
        internshipPositions: [],
        schoolPositions: [],
        socialPositions: [],
        pageConfig: {
          first_page: 0,
          page_size: 5,
        },
        loading1: true,
        loading2: true,
        loading3: true,
      }
    },
    methods: {
      getPositionList(type) {
        let obj = {position_type: type};
        obj = Object.assign(obj, this.pageConfig);
        this.$store.dispatch('selectPosition', obj).then( res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            if (type === 1) {
              this.internshipPositions = data.rpDTO;
              this.loading1 = false;
            } else if (type === 2) {
              this.schoolPositions = data.rpDTO;
              this.loading2 = false;
            } else if (type === 3) {
              this.socialPositions = data.rpDTO;
              this.loading3 = false;
            }
            if (this.loading1 || this.loading2 || this.loading3) {
              return
            } else {
              this.$store.commit('closeLoading')
            }
          }
        })
      },
    },
    created() {
      this.$store.commit('openLoading');
      //实习
      this.getPositionList(1);
      //校招
      this.getPositionList(2);
      //社招
      this.getPositionList(3);
    },
  }
</script>

<style lang="scss" scoped>
  .job-index {
    width: 690px;
    margin: 0 auto;
    .search-container {
      width: 687px;
      height: 78px;
      margin: 0 auto 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .position-container {
      .position-box {
        margin-bottom: 40px;
        .position-box-title {
          padding: 0 15px;
          height: 60px;
          background-color: #c20c0c;
          font-size: 30px;
          color: #ffffff;
          line-height: 60px;
        }
        .position-more {
          font-size: 26px;
          color: #c20c0c;
          text-align: center;
        }
      }
    }
  }
</style>
