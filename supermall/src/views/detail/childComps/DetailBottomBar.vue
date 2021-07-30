<template>
  <div class="bottom-bar">
    <div class="icon-text">
      <div class="icon-text-item">
        <div class="icon"></div>
        <div class="text">客服</div>
      </div>
      <div class="icon-text-item">
        <div class="icon"></div>
        <div class="text">店铺</div>
      </div>
      <div class="icon-text-item">
        <div class="icon"></div>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="cart-buy">
      <div class="cart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}
.icon-text {
  flex: 1;
  display: flex;
}
.icon-text-item {
  flex: 1;
  background-color: #fff;
  line-height: 49px;
}
.icon {
  background: url("../../../assets/img/detail/detail_bottom.png") no-repeat
    fixed 0 0;
}

.cart-buy {
  display: flex;
  flex: 1;
}
.cart {
  flex: 1;
  line-height: 49px;
  color: #111;
  background-color: #ffdf11;
}
.buy {
  flex: 1;
  line-height: 49px;
  color: #fff;
  background-color: #ff779b;
}
</style>