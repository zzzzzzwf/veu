<template>
  <div id="app">
    <div class="root">
      <!-- 图片详细 {{ $route.params.imgid }} -->
      <!-- 1. 顶部导航栏 -->
      <van-nav-bar
        title="图片详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />

      <!-- 标题区域 -->
      <div class="meta">
        <h1 class="meta-tit">{{ infoData.title }}</h1>
        <p class="meta-info">
          <span class="time">{{ infoData.add_time | dateFormat }}</span>
          <span class="view">{{ infoData.click }} 次浏览</span>
        </p>
      </div>

      <!-- 缩略图部分 -->
      <div class="img">
        <img
          v-for="(item, index) in imgList"
          :key="index"
          :src="item.src"
          class="preview-img"
          height="100"
          @click="$preview.open(index, imgList)"
          alt=""
        />
      </div>

      <!-- 图片详情内容 -->
      <div class="contnet" v-html="infoData.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      imgid: this.$route.params.imgid,
      infoData: {},
      imgList: [],
    };
  },
  methods: {
    getImgInfo() {
      this.$axios.get("/api/getimageInfo/" + this.imgid).then((res) => {
        this.infoData =
          res.data.message &&
          res.data.message.length > 0 &&
          res.data.message[0];
      });
    },
    getImgs() {
      this.$axios.get("/api/getthumimages/" + this.imgid).then((res) => {
        let list = res.data.message;
        list = list.map((item) => {
          return {
            ...item,
            w: 600,
            h: 400,
          };
        });
        this.imgList = list;
      });
    },
  },
  mounted() {
    this.getImgInfo();
    this.getImgs();
  },
};
</script>

<style>
.meta-tit {
  color: #0094ff;
  font-size: 18px;
  padding: 8px;
}
.meta-info {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  padding: 8px;
}

.meta-info .view {
  margin-left: 10px;
}

.img {
  padding: 5px;
}

.img img {
  width: 80px;
  height: 80px;
  margin-left: 10px;
}

.contnet {
  padding: 5px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
