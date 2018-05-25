import Vue from 'vue'
import Router from 'vue-router'
/* eslint-disable */
const index = r => require.ensure([], () => r(require('../components/index')), 'index');
const jobIndex = r => require.ensure([], () => r(require('../components/position/job-index')), 'jobIndex');
const jobInfo = r => require.ensure([], () => r(require('../components/position/job-info')), 'jobInfo');
const jobList = r => require.ensure([], () => r(require('../components/position/job-list')), 'jobList');
const jobSearch = r => require.ensure([], () => r(require('../components/position/job-search')), 'jobSearch');
const jobSearchResult = r => require.ensure([], () => r(require('../components/position/job-search-result')), 'jobSearchResult');

const login = r => require.ensure([], () => r(require('../components/login/Login')), 'login');
const register = r => require.ensure([], () => r(require('../components/login/Register')), 'register');
const mailDelivery = r => require.ensure([], () => r(require('../components/resumes/MailDelivery.vue')), 'mailDelivery');

const successfullyDelivered = r => require.ensure([], () => r(require('../components/resumes/SuccessfullyDelivered.vue')), 'successfullyDelivered');


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/jobIndex',
      name: 'jobIndex',
      component: jobIndex,
      meta: {
        // requiresAuth: true,
        pageTitle: '首页',
        keepAlive:true,
      },
    },
    {
      path: '/jobInfo/:id',
      name: 'jobInfo',
      component: jobInfo,
      meta: {
        pageTitle: '职位详情',
      },
    },
    {
      path: '/jobList/:type',
      name: 'jobList',
      component: jobList,
      meta: {
        pageTitle: '职位列表',
      },
    },
    {
      path: '/jobSearch',
      name: 'jobSearch',
      component: jobSearch,
      meta: {
        pageTitle: '搜索',
      },
    },
    {
      path: '/jobSearchResult',
      name: 'jobSearchResult',
      component: jobSearchResult,
      meta: {
        pageTitle: '搜索结果',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        pageTitle: '登陆',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        pageTitle: '注册',
      },
    },
    {
      path: '/mailDelivery',
      name: 'mailDelivery',
      component: mailDelivery,
      meta: {
        pageTitle: '投递邮件简历',
        requiresAuth: true,
      },
    },
    {
      path: '/successfullyDelivered',
      name: 'successfullyDelivered',
      component: successfullyDelivered,
      meta: {
        pageTitle: '投递成功',
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
