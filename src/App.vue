<template>
  <div id="app">
    <header>
      <div class="index-title" v-if="$route.meta.pageTitle === '首页'">
        <h1 class="logo">
          <a href="/">万邦教育</a>
        </h1>
        <div class="user-container" @click="goUser">
          <span class="iconfont icon-user"></span>
        </div>
      </div>
      <div class="page-title-container" v-else>
        <div class="go-back" @click="$router.go(-1)">
          <span class="icon-fanhui iconfont">  </span>
        </div>
        <div class="page-title">
          {{$route.meta.pageTitle}}
        </div>
      </div>
    </header>
    <div class="router-container">
      <keep-alive>     <!--使用keep-alive会将页面缓存-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- <router-view/> -->
    </div>
  </div>
</template>

<script>

  import WeChat from './components/WeChat'

  export default {
    'name': 'App',
    mixins: [WeChat],
    methods: {
      goUser() {
        if (JSON.parse(localStorage.getItem('uaMicromessenger'))) {
          if (!JSON.parse(localStorage.getItem('w'))) {
            this.$router.push('/register');
          } else {
            this.$toast('您已登陆');
          }
        } else {
          if (!JSON.parse(localStorage.getItem('w'))) {
            this.$router.push('/login');
          } else {
            this.$toast('您已登陆');
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  #app {
    background-color: #f6f8f9;
    header {
      height: 98px;
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 1px 2px 0 #cccccc;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      .index-title {
        position: relative;
        height: 100%;
        .logo {
          a {
            display: block;
            overflow: hidden;
            text-indent: -9999em;
          }
          position: absolute;
          top: 29px;
          left: 43px;
          width: 177px;
          height: 50px;
          -webkit-background-size: 100% 100%;
          background-size: 100% 100%;
          background-image: url('../static/img/logo-red.png');
        }
        .user-container {
          position: absolute;
          top: 37px;
          right: 42px;
          span {
            font-size: 40px;
            color: #c20c0c;
          }
        }
      }
      .page-title-container {
        position: relative;
        line-height: 98px;
        text-align: center;
        .go-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 98px;
        }
        .page-title {
          font-size: 30px;
          color: #333333;
        }
      }
    }
    .router-container {
      margin-top: 130px;
    }
  }
</style>
