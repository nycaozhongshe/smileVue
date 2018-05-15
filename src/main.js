import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/js/vantComponents.js'

Vue.config.productionTip = false
// import 'lib-flexible'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
