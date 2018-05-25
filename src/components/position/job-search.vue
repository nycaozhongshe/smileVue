<template>
  <div class="job-search">
    <div class="search-box">
      <input type="text" v-model="keyword" ref="input" autofocus>
      <button @click="searchByKeyword"><span class="iconfont icon-fangdajing"></span></button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
      }
    },
    methods: {
      initPositionFilter() {
        let initFilter = {
          position_type: 0,
          position_industry: 0,
          position_address: '全部',
          position_function: 0,
        };
        this.$store.commit('setState',{key: 'positionFilter', value: initFilter});
      },
      searchByKeyword() {
        if (this.keyword) {
          this.keyword = this.keyword.slice(0, 9);
          this.$store.commit('setState', {key: 'keyword', value: this.keyword});
          let id = localStorage.getItem('id') || '';
          this.initPositionFilter();
          this.$store.dispatch('selectePositionByKeyword', {
            keyword: this.keyword,
            user_id: id
          }).then(res => {
            if (res.data.code === '0') {
              let data = res.data.data;
              if (data.operation === 0) {
                this.$router.push(`/jobInfo/${data.rpDTO[0].id}`)
              }
              else if (data.operation === 1) {
                let obj = {
                  key: 'searchResultList',
                  value: data.rpDTO,
                }
                this.$store.commit('setState', obj);
                this.$router.push('/jobSearchResult');
              }
            } else if (res.data.code === '1001') {
              this.$toast('没有搜索到相应的职位')
            }
          })
        }
      },
      inputFocus() {
        this.$refs.input.focus();
      },
    },
  }
</script>

<style lang="scss" scoped>
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
</style>
