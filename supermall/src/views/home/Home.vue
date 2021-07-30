<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tabControlUp"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollposition="scrollposition"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banner="banner"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showgoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isbacktop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabcontrol/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "./childcompos/HomeSwiper.vue";
import RecommendView from "./childcompos/RecommendView.vue";
import FeatureView from "./childcompos/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

import { itemListenerMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    },
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isbacktop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin],
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // destroyed() {
  //   console.log("homedestroy");
  // },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    //取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  methods: {
    //获取tabcontrol与顶部的距离
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //事件监听相关的
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      //要滑动后才有返回顶部的效果，用鼠标是无效的
      this.$refs.scroll.scrollTo(0, 0);
      // console.log(this.$refs.scroll.scroll.scrollTo(0, 0));
    },

    scrollposition(position) {
      //1 判断BackTop是否显示
      position.y < -1000 ? (this.isbacktop = true) : (this.isbacktop = false);

      // 2 决定tabcontrol是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    //以下函数网络请求相关的
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      const list = this.goods[type].list;
      getHomeGoods(type, page, list).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabControlUp {
  position: relative;
  z-index: 99;
}
</style>