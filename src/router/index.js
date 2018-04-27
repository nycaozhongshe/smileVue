import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "ShoppingMall",
      component: resolve => require(['@/views/ShoppingMall.vue'], resolve),
      meta: {
          
      }
    }
  ]
})
