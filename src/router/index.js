import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "index",
      component: resolve => require(['@/views/ShoppingMall.vue'], resolve),
      meta: {

      }
    },
    {
      path: '/extends',
      name: "Extends",
      component: resolve => require(['@/views/Extends.vue'], resolve),
      meta: {

      }
    }
  ]
})
