import Vue from 'vue'
import Vuex from 'vuex'

import POSITION from './POSITION'
import LOGIN from './LOGIN'
import RESUMES from './RESUMES'



Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    openLoading(state) {
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    },
  },
  modules: {
    POSITION,
    LOGIN,
    RESUMES
  },
});

export default store;
