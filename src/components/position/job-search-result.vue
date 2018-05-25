<template>
  <div class="job-search-result">
    <div class="search-box">
      <input type="text" v-model="keyword">
      <button><span class="iconfont icon-fangdajing" @click="getPositionListInSearch"></span></button>
    </div>
    <div class="search-filter-container">
      <position-filter @filterChange="filterChanged"></position-filter>
    </div>
    <position-card-list @loadMorePosition="loadMorePosition"  :position-list="positionList" v-if="positionList.length !== 0" ref="LIST"></position-card-list>
    <div class="no-list-tip" v-else>
      没有符合条件的职位
    </div>
  </div>
</template>

<script>

  import positionCardList from './common/position-card-list'
  import positionFilter from './common/position-filter'
  import { isEqual } from '../../util/util'

  export default {
    components: {
      positionCardList,
      positionFilter,
    },
    data() {
      return {
        pageConfig: {
          first_page: 0,
          page_size: 5,
        },
      }
    },
    methods: {
      loadMorePosition() {
        this.pageConfig.page_size += 5;
        this.getPositionListInSearch();
      },
      getPositionListInSearch() {
        let f = Object.assign({}, this.$store.state.POSITION.positionFilter, this.pageConfig);
        f.keyword = this.$store.state.POSITION.keyword;
        this.$store.dispatch('selectePositionByKeyword', f).then(res => {
          if (res.data.code === '0') {
            let data = res.data.data;
            if (isEqual(data.rpDTO, this.$store.state.POSITION.searchResultList)) {
              this.$refs.LIST.openScroll('没有更多职位');
              return
            } else {
              let obj = {
                key: 'searchResultList',
                value: data.rpDTO,
              };
              this.$store.commit('setState', obj);
              this.$refs.LIST.openScroll();
            }
          } else if (res.data.code === '1001') {
            let obj = {
              key: 'searchResultList',
              value: [],
            };
            this.$store.commit('setState', obj)
          }
        })
      },
      filterChanged() {
        this.getPositionListInSearch();
      },
    },
    computed: {
      positionList() {
        return this.$store.state.POSITION.searchResultList;
      },
      keyword: {
        get: function () {
          return this.$store.state.POSITION.keyword;
        },
        set: function (v) {
          let obj = {
            key: 'keyword',
            value: v,
          };
          this.$store.commit('setState', obj);
        }

      },
    },
  }
</script>

<style lang="scss" scoped>
  .job-search-result {
    padding: 0 30px;
    .search-box {
      width: 687px;
      height: 78px;
      background-color: #ffffff;
      border-radius: 38px 38px 39px 38px;
      border: solid 1px #c20c0c;
      margin: 0 auto;
      padding: 0 65px 0 39px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      input {
        display: inline-block;
        width: 100%;
        height: 98%;
        border: none;
      }
      button {
        width: 44px;
        height: 43px;
        position: absolute;
        right: 21px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        background-color: #fff;
        color: #c20c0c;
        border: none;
        span {
          font-size: 40px;
        }
      }
    }
  }
</style>
