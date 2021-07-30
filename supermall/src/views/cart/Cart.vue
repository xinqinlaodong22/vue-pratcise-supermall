<template>
  <div id="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    ...mapGetters({
      length: "cartListLength",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.navbar {
  position: relative;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 44px - 52px - 50px);
  overflow: hidden;
}
</style>