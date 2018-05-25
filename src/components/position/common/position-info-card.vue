<template>
  <div class="position-info-card">
    <div class="position-info-card-title">{{positionInfoTitle}}</div>
    <div class="position-info-card-content" v-html="positionInfoContent || '暂无'"></div>
  </div>
</template>

<script>
  export default {
    props: {
      positionInfoTitle: {
        type: String,
        default: 'Title',
      },
      positionInfoContent: {
        type: String,
        default: '<h2>Content</h2>',
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-info-card {
    margin: 19px auto;
    padding: 20px 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 690px;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #e6e6e6;
    .position-info-card-title {
      border-bottom: 1px solid #e6e6e6;
      height: 60px;
      font-size: 24px;
      color: #c20c0c;
      line-height: 60px;
      padding: 0 14px;
    }
    .position-info-card-content {
      padding: 14px;
      font-size: 22px;
      color: #4d4d4d;
      line-height: 1.8;
    }
  }
</style>
