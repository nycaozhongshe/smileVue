<!--  -->
<template>
  <div class="shoppingMall__wrapper">
    <van-row gutter="5" class="search-bar">
      <van-col span="3">
        <van-icon name="success" />
      </van-col>
      <van-col span="21">
        <van-search
          placeholder="请输入商品名称"
          v-model="value"
          show-action >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-col>


      <!-- <van-col span="8">span: 8</van-col> -->
    </van-row>
    <van-row  class="swiper-area">
      <van-col  span="24">
         <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
            <img v-lazy="image.imageUrl" />
          </van-swipe-item>
        </van-swipe>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // locationIcon:require("../assets/img/logo.png"),
      value: "",
      bannerPicArray: [
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg"
        },
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg"
        },
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg"
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    onSearch() {}
  }
};
</script>
<style lang='scss' scoped>
.swiper-area{
      width:20rem;
      clear:both;
      height: 20rem;
      // overflow: hidden;
  }
</style>
