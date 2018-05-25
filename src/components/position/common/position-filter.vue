<template>
  <div class="position-filter">
    <ul>
      <li @click="showActionSheet(0)">{{actionSheetList.actions[0][positionFilter.position_type].name}} <span class="iconfont icon-xiala"></span></li>
      <li @click="showActionSheet(1)">{{actionSheetList.actions[1][positionFilter.position_industry].name}} <span class="iconfont icon-xiala"></span></li>
      <li @click="showActionSheet(2)">{{actionSheetList.actions[2][positionFilter.position_function].name}} <span class="iconfont icon-xiala"></span></li>
      <li @click="showActionSheet(3)">{{positionFilter.position_address || '全部'}} <span class="iconfont icon-xiala"></span></li>
    </ul>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentFilterIndex: 0,
        actionSheetList: {
          actions: [
            [
              {
                name: '全部岗位',
                method: this.setFilter('position_type', 0),
              },
              {
                name: '实习岗位',
                method: this.setFilter('position_type', 1),
              },
              {
                name: '校招岗位',
                method: this.setFilter('position_type', 2),
              },
              {
                name: '社招岗位',
                method: this.setFilter('position_type', 3),
              }
            ],
            [
              {
                name: '全部',
                method: this.setFilter('position_industry', 0),
              },
              {
                name: '银行',
                method: this.setFilter('position_industry', 1),
              },
              {
                name: '信托',
                method: this.setFilter('position_industry', 2),
              },
              {
                name: '保险',
                method: this.setFilter('position_industry', 3),
              },
              {
                name: '证券',
                method: this.setFilter('position_industry', 4),
              },
              {
                name: '基金',
                method: this.setFilter('position_industry', 5),
              },
              {
                name: '互金',
                method: this.setFilter('position_industry', 6),
              },
              {
                name: '租赁',
                method: this.setFilter('position_industry', 7),
              },
              {
                name: '私募',
                method: this.setFilter('position_industry', 8),
              },
              {
                name: '其他',
                method: this.setFilter('position_industry', 9),
              },
            ],
            [
              {
                name: '全部',
                method: this.setFilter('position_function', 0),
              },
              {
                name: '投资银行',
                method: this.setFilter('position_function', 1),
              },
              {
                name: '证券研究',
                method: this.setFilter('position_function', 2),
              },
              {
                name: '资产管理',
                method: this.setFilter('position_function', 3),
              },
              {
                name: '固定收益',
                method: this.setFilter('position_function', 4),
              },
              {
                name: '私募股权',
                method: this.setFilter('position_function', 5),
              },
              {
                name: '银行保险',
                method: this.setFilter('position_function', 6),
              },
              {
                name: '其他',
                method: this.setFilter('position_function', 7),
              }
            ],
            [
              {
                name: '全部',
                method: this.setFilter('position_address', '全部'),
              },
              {
                name: '北京',
                method: this.setFilter('position_address', '北京'),
              },
              {
                name: '上海',
                method: this.setFilter('position_address', '上海'),
              },
              {
                name: '广州',
                method: this.setFilter('position_address', '广州'),
              },
              {
                name: '深圳',
                method: this.setFilter('position_address', '深圳'),
              },
              {
                name: '杭州',
                method: this.setFilter('position_address', '杭州'),
              },
              {
                name: '武汉',
                method: this.setFilter('position_address', '武汉'),
              },
              {
                name: '天津',
                method: this.setFilter('position_address', '天津'),
              },
              {
                name: '成都',
                method: this.setFilter('position_address', '成都'),
              },
              {
                name: '重庆',
                method: this.setFilter('position_address', '重庆'),
              },
              {
                name: '南京',
                method: this.setFilter('position_address', '南京'),
              },
              {
                name: '其他',
                method: this.setFilter('position_address', '其他'),
              },
            ],
          ]
        },
        sheetVisible: false,
      }
    },
    methods: {
      setFilter(type, value) {
        return () => {
          this.positionFilter[type] = value;
        }
      },
      showActionSheet(index) {
        this.currentFilterIndex = index;
        this.sheetVisible = true;
      },
    },
    computed: {
      actions() {
        return this.actionSheetList.actions[this.currentFilterIndex]
      },
      positionFilter: {
        get: function() {
          return this.$store.state.POSITION.positionFilter
        },
      },
    },
    watch: {
      positionFilter: {
        handler: function () {
          let obj = {
            key: 'positionFilter',
            value: this.positionFilter
          }
          this.$store.commit('setState', obj);
          this.$emit('filterChange');
        },
        deep: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-filter {
    height: 85px;
    width: 100%;
    line-height: 85px;
    ul {
      li {
        float: left;
        width: 25%;
        text-align: center;
      }
    }
  }
</style>
