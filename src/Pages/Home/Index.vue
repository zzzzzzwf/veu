<template>
  <div id="app">
    <div class="root">
      <!-- 1.顶部导航栏 -->
      <van-nav-bar title="首页" left-text="返回" right-text="按钮" left-arrow />

      <!-- 2.轮播图 -->
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in imglist" :key="index">
          <a :href="item.url">
            <img :src="item.img" alt="" />
          </a>
        </van-swipe-item>
      </van-swipe>

      <!-- 新闻资讯广播 -->
      <a v-if="newsList.length > 0" :href="newsList[index].link_url">
        <van-notice-bar :text="newsList[index].title" left-icon="volume-o">
        </van-notice-bar>
      </a>

      <!-- 九宫格导航 -->
      <van-row gutter="20">
        <van-col span="8"
          ><router-link to="/News">
            <img src="../../assets/menu3.png" alt=""
          /></router-link>
        </van-col>
        <van-col span="8"><img src="../../assets/menu4.png" alt="" /></van-col>

        <van-col span="8">
          <router-link to="/Goods">
            <img src="../../assets/menu5.png" alt="" />
          </router-link> 
        </van-col>
      </van-row>
      <van-row gutter="20">
        <van-col span="8"><img src="../../assets/menu6.png" alt="" /></van-col>
        <van-col span="8"><img src="../../assets/menu9.png" alt="" /></van-col>
        <van-col span="8"><img src="../../assets/menu10.png" alt="" /></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      imglist: [],
      newsList: [],
      index: 0,
      interHander: null,
    };
  },
  methods: {
    getlunbo() {
      this.$axios.get("/api/getlunbo").then((res) => {
        this.imglist = res.data.message;
      });
    },
    getNewsList() {
      this.$axios.get("/api/getnewslist").then((res) => {
        this.newsList = res.data.message;

        // 开启定时器
        this.interHander = setInterval(() => {
          this.index++;
          if (this.index >= 13) {
            this.index = 0;
          }
        }, 3000);
      });
    },
  },
  mounted() {
    this.getlunbo();
    this.getNewsList();
  },
  //页面离开前的生命周期方法中进行销毁
  beforeDestroy() {
    clearInterval(this.interHander);
  },
};
</script>

<style>
.van-nav-bar {
  background-color: #0094ff !important;
}
.van-nav-bar__title,
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: white !important;
}
.van-swipe {
  height: 200px;
}
img {
  width: 100%;
  height: 100%;
}
</style>