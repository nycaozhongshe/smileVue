<template>
  <div class="job-list">
    <div class="search-container" @click="$router.push('/jobSearch')">
      <img src="../../../static/img/search.png" alt="">
    </div>
    <div class="search-filter-container">
      <position-filter @filterChange="filterChanged"></position-filter>
    </div>
    <position-card-list @loadMorePosition="loadMorePosition" :position-list="positionList" ref="LIST"></position-card-list>
  </div>
</template>

<script>
  import positionFilter from './common/position-filter';
  import positionCardList from './common/position-card-list';
  import { isEqual } from '../../util/util'

  export default {
    components: {
      positionFilter,
      positionCardList,
    },
    data() {
      return {
        positionList: [],
        pageConfig: {
          first_page: 0,
          page_size: 5,
        },
      };
    },
    methods: {
      loadMorePosition() {
        this.pageConfig.page_size += 5;
        this.getPositionList();
      },
      getPositionList() {
        let obj = Object.assign({}, this.$store.state.POSITION.positionFilter, this.pageConfig);
        this.$store.dispatch('selectPosition', obj).then(res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            if (isEqual(data.rpDTO, this.positionList)) {
              this.$refs.LIST.openScroll('没有更多职位');
              return
            } else {
              this.positionList = data.rpDTO;
              this.$refs.LIST.openScroll();
            }
          }
        })
      },
      getCurrentType() {
        let obj = {}
        if (this.$route.params.type === '实习岗位') {
          obj = {position_type: 1}
        } else if (this.$route.params.type === '校招岗位') {
          obj = {position_type: 2}
        } else if (this.$route.params.type === '社招岗位') {
          obj = {position_type: 3}
        }
        this.$store.commit('setPositionFilter', {key: 'position_type', value: obj.position_type})
      },
      filterChanged() {
        this.getPositionList();
      },
    },
    created() {
      this.getCurrentType();
      this.getPositionList();
    },
  }
</script>

<style lang="scss" scoped>
  .job-list {
    padding: 0 30px;
    .search-container {
      width: 687px;
      height: 78px;
      margin: 0 auto 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
