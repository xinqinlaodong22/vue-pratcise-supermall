<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailnavbar"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scrollposition="scrollposition"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <DetailParamInfo :paramInfo="paramInfo" ref="param"></DetailParamInfo>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isbacktop"></back-top>
    <!-- <detail-bottom-bar @addCart="addCart"></detail-bottom-bar> -->
    <detail-bottom-bar @click.native="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

import { itemListenerMixin } from "@/common/mixin.js";
import { backTopMixin } from "@/common/mixin.js";

import { debounce } from "@/common/utils";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themetopY: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    GoodsParam,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },
  methods: {
    ...mapActions({
      add: "addCart",
    }),
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themetopY[index]);
    },

    scrollposition(position) {
      let positionY = -position.y;
      let length = this.themetopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themetopY[i] &&
          positionY < this.themetopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.detailnavbar.currentIndex = this.currentIndex;
        }
      }
      position.y < -1000 ? (this.isbacktop = true) : (this.isbacktop = false);
    },
    addCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      // this.addCart(product).then((res) => {
      //   console.log(res);
      // });
      this.add(product).then((res) => {
        this.$toast.show(res);
        // console.log(this.$toast);
      });
    },
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    //获取推荐信息
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    //保存传入的iid
    this.iid = this.$route.params.iid;

    //根据iid
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //获取详情页的轮播图的信息
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);
      //获取商店信息
      this.shop = new Shop(data.shopInfo);

      //保存商品的详情信息
      this.detailInfo = data.detailInfo;

      //获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //防抖动包裹，获取offsetTop的值并放入themetopy数组中
    this.getThemeTopY = debounce(() => {
      this.themetopY.push(0);
      this.themetopY.push(this.$refs.param.$el.offsetTop);
      this.themetopY.push(this.$refs.comment.$el.offsetTop);
      this.themetopY.push(this.$refs.recommend.$el.offsetTop);
      this.themetopY.push(Number.MAX_VALUE);
      console.log(this.themetopY);
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1000;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
</style>