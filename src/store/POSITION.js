import request from '../util/request'
import api from '../util/api'

function positionPageFilter(n) {
  let m = Object.assign({}, n);
  if (!m.first_page) {
    m.first_page = 0;
  }
  if (!m.page_size) {
    m.page_size = 5;
  }
  return m
}

function positionTypeFilter(n) {
  let m = Object.assign({}, n);
  if ( !m.position_address || m.position_address === '全部') {
    m.position_address = '';
  }
  if (!m.position_industry) {
    m.position_industry = 0;
  }
  if (!m.position_type) {
    m.position_type = 0;
  }
  if (!m.position_function) {
    m.position_function = 0;
  }
  return m
}

/* eslint-disable */
const PositionStore = {
  state: {
    searchResultList: [],
    positionFilter: {
      position_type: 0,
      position_industry: 0,
      position_address: '全部',
      position_function: 0,
    },
    keyword: '',
    loadingMore: false,
  },
  mutations: {
    /**
     * 写入state
     * @param state
     * @param obj
     */
    setState(state, obj) {
      console.log('key === ' + obj.key);
      console.log('value');
      console.log(obj.value);
      let key = obj.key;
      let value = obj.value;
      state[key] = value;
    },

    //设置positionFilter
    setPositionFilter(state, n) {
      state.positionFilter[n.key] = n.value;
    },

  },
  actions: {

    //获取职位列表
    selectPosition({}, n) {
      let obj = positionTypeFilter(positionPageFilter(n))
      return request.post(api.selectPosition, obj);
    },

    //获取相似职位列表
    selectSimilarityPosition({}, n) {
      return request.post(api.selectSimilarityPosition, n);
    },

    //关键词搜索
    selectePositionByKeyword({}, n) {
      let obj = positionTypeFilter(positionPageFilter(n))
      return request.post(api.selectePositionByKeyword, obj);
    },
  },
  getters: {},
}

export default PositionStore;
