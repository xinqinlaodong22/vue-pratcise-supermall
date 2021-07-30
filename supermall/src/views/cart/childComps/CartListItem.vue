<template>
  <div class="cart-item">
    <div class="checkbutton">
      <check-bottom
        class="check-bottom"
        @click.native="translate"
        :isactive="product.checked"
      ></check-bottom>
    </div>
    <div class="image">
      <img :src="product.image" alt="" />
    </div>
    <div class="txt">
      <div class="title">{{ product.title }}</div>
      <div class="desc">{{ product.desc }}</div>
      <div class="number">
        <span class="price">￥{{ product.price }}</span>
        <span class="count">X{{ product.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBottom from "@/components/content/checkbottom/CheckBottom.vue";
export default {
  name: "CartListItem",
  components: {
    CheckBottom,
  },

  methods: {
    translate() {
      this.product.checked = !this.product.checked;
    },
  },
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  width: 100%;
  height: 180px;
  padding: 8px 3px;
  border-bottom: 1px solid #aaa;
}
.checkbutton {
  flex: 2;

  margin-right: 3px;
}
.check-bottom {
  height: 20px;
  width: 100%;
  margin-top: 70px;
}
.image img {
  flex: 4;
  width: 125px;
  height: 140px;
  vertical-align: middle;
}
.txt {
  flex: 10;
}
.txt .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
}
.txt .desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 50px;
}

.txt .number .price {
  color: #f77f5a;
}
.txt .number .count {
  margin-left: 80px;
}
</style>