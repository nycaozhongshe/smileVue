import request from '../util/request'
import api from '../util/api'

/* eslint-disable */
const module = {
  state: {},
  mutations: {},
  actions: {
    selectMyVitae({}, n) {
      return request.post(api.selectMyVitae, n);
    },
    deliverVitae({}, n){
      return request.post(api.deliverVitae, n);
    }
  },
  getters: {},
}

export default module;
