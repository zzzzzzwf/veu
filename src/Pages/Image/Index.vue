<template>
  <div id="app">
    <div class="root">
      <!-- 顶部导航栏 -->
      <van-nav-bar
        title="图片列表"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      ></van-nav-bar>

      <!-- 图片分类导航 -->
      <van-tabs type="card" @click="tabClick">
        <van-tab
          v-for="item in clist"
          :key="item.id"
          :title="item.title"
        ></van-tab>
      </van-tabs>

      <!-- 图片列表展示 -->
      <div class="nodata" v-show="cimages.length <= 0">
        当前分类下没有图片数据
      </div>
      <router-link
        v-for="item in cimages"
        :key="item.id"
        :to="'/ImageInfo/' + item.id"
      >
        <div class="imglist">
          <img :src="item.img_url" alt="" />
          <div class="info">
            <h2>{{ item.title }}</h2>
            <p>{{ item.zhaiyao }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      clist: [],
      cimages: [],
    };
  },
  methods: {
    tabClick(index) {
      // console.log(index, title);
      let cateid = this.clist[index].id;
      this.getImagelist(cateid);
    },
    getImagelist(cateid) {
      // console.log(cateid);
      this.$axios.get("/api/getimages/" + cateid).then((res) => {
        this.cimages = res.data.message;
      });
    },
    getClist() {
      this.$axios.get("/api/getimgcategory").then((res) => {
        let list = res.data.message;
        list.unshift({
          title: "全部",
          id: 0,
        });
        this.clist = list;
      });
    },
  },
  mounted() {
    this.getClist();
    this.getImagelist(0);
  },
};
</script>

<style>
.van-tabs__nav--card {
  margin: 0 !important;
}
.imglist {
  position: relative;
}
.imglist .info {
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: white;
}
.imglist img {
  height: 300px;
}
.info h2 {
  font-size: 14px;
}

.info p {
  font-size: 12px;
}
.nodata {
  text-align: center;
}
</style>