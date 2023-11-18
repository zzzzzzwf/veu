<template>
  <div id="app">
    <!-- <Home></Home> -->
    <router-view></router-view>
    <div style="height: 12vw"></div>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="coupon">
        <router-link to="/Home">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="eye">
        <router-link to="/News">新闻资讯</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="shopping-cart">
        <router-link to="/ShopCar">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="smile-comment">
        <router-link to="/Image">图片分享</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>
