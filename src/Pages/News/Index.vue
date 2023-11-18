<template>
  <div id="app">
    <div class="root">
      <!-- 顶部导航栏 -->
      <van-nav-bar
        title="新闻列表"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>

      <!-- 新闻列表 -->
      <a v-for="(item, index) in newsList" :key="index" :href="item.link_url">
        <van-card
          :price="item.add_time | dateFormat"
          currency=""
          :desc="item.zhaiyao"
          :title="item.title"
          :thumb="item.img_url"
          :tag="item.click >= 10 ? '热门' : ''"
        >
          <!-- 覆盖num标签 -->
          <div slot="num">
            <span>点击:{{ item.click }}</span>
          </div>
        </van-card>
      </a>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "app",
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    getnewsList() {
      this.$axios.get("/api/getnewslist").then((res) => {
        this.newsList = res.data.message;
      });
    },
  },
  mounted() {
    this.getnewsList();
  },
};
</script>
    
    <style>
</style>