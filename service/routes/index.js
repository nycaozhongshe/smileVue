/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')
router.get('/login', controllers.login.post)

module.exports = router
