<template>
  <div class="position-card-list"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loadingMore"
       infinite-scroll-distance="0"
       infinite-scroll-immediate-check="false">
    <position-card v-for="(item, index) in positionList" :key="index" :position-info="item"></position-card>
    <div class="loading-more" v-show="loadingMore && $route.name !== 'jobIndex' && $route.name !== 'jobInfo' && $route.name !== 'successfullyDelivered'">
     {{loadingMoreTips}}
    </div>
  </div>
</template>

<script>
  import positionCard from './position-card'

  export default {
    data() {
      return {
        loadingMore: false,
        loadingMoreTips: '正在加载 . . . . . .'
      }
    },
    props: {
      positionList: {
        type: Array,
        default: () => {
          return [];
        },
      }
    },
    methods: {
      loadMore() {
        this.loadingMore = true;
        this.$emit('loadMorePosition');
      },
      openScroll(tip) {
        if (tip) {
          this.loadingMoreTips = tip
        } else {
          this.loadingMore = false;
        }
      },
      initScroll() {
        this.loadingMore = false;
      },
    },
    created() {
      this.initScroll();
    },
    components: {
      positionCard,
    },
  }
</script>

<style lang="scss" scoped>
  .loading-more {
    height: 40px;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    padding: 30px;
    line-height: 40px;
    text-align: center;
    color: #c20c0c;
  }
</style>
