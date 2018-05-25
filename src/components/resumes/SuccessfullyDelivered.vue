<!--  -->
<template>
  <div class="successfully-delivered__wrapper">
    <section class="success-section">
      <p>
        <!-- <img src="../../../static/img/sprite.png" alt=""> -->
        <a class="bg-img"></a>
      </p>
      <p>投递成功</p>
      <p @click="goToIndex">确定</p>
    </section>
    <section class="similar-position-section">
      <div class="title">
        <span class="line"></span>
        <span class="text">相似职位</span>
        <span class="line"></span>
      </div>
      <div class="content">
        <position-card-list :positionList="data"></position-card-list>
      </div>
    </section>
  </div>
</template>

<script>
  import positionCardList from "@/components/position/common/position-card-list";
  export default {
    data() {
      return {
        data: []
      };
    },
    components: {
      positionCardList
    },
    methods: {
      goToIndex(){
        this.$router.push('/')
      },
      parameterHandling() {
        return {
          id: this.$route.query.id
        };
      },
      selectSimilarityPosition() {
        this.$store.commit('openLoading');
        this.$store
          .dispatch("selectSimilarityPosition", this.parameterHandling())
          .then(res => {
            this.$store.commit('closeLoading')
            if (res.data.code == 0) {
              this.data= res.data.data.dto;
            }
          });
      }
    },
    watch: {
      "$route.query.id": {
        handler: function() {
          this.selectSimilarityPosition()
        },
        immediate: true
      }
    }
  };
</script>

<style lang='scss'>
  .successfully-delivered__wrapper {
    .success-section {
      text-align: center;
      font-size: 30px;
      p:nth-child(1) {
        margin-top: 60px;
        margin-bottom: 40px;
        .bg-img {
          background-image: url("../../../static/img/sprite.png");
          background-repeat: "no-repeat";
          background-size: "25px auto";
          height: 160px;
          width: 160px;
          background-size: 713px 298px;
          display: inline-block;
          background-position: 0 0;
        }
      }
      p:nth-child(2) {}
      p:nth-child(3) {
        margin-top: 84px;
        margin-bottom: 250px;
        color: #c20c0c;
      }
    }
    .similar-position-section {
      .title {
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 54px;
        .line {
          height: 1px;
          background-color: #666666;
          flex: 1;
        }
        .text {
          width: 200px;
          font-size: 24px;
        }
      }
    }
  }
</style>
