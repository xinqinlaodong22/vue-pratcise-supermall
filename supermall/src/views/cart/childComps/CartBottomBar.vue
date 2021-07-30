<template>
  <div class="cartbottombar">
    <div class="check-text">
      <div class="check">
        <check-bottom
          class="checkbottom"
          :isactive="isselectall"
          @click.native="totalcheck"
        ></check-bottom>
        <div class="all-check">全选</div>
      </div>
    </div>
    <div class="all">合计:￥{{ totalPrice }}</div>
    <div class="computed">去计算({{ totalcount }})</div>
  </div>
</template>

<script>
import CheckBottom from "@/components/content/checkbottom/CheckBottom";
export default {
  name: "CartBottomBar",
  components: {
    CheckBottom,
  },
  methods: {
    totalcheck() {
      // if (this.isselectall) {
      //   this.$store.state.cartList.forEach((item) => (item.checked = false));
      // } else {
      //   this.$store.state.cartList.forEach((item) => (item.checked = true));
      // }
      if (this.isselectall) {
        this.$store.state.cartList.map((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.map((item) => (item.checked = true));
      }
    },
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0);

      //   let countitem = this.$store.state.cartList.filter((item) => {
      //     return item.checked;
      //   });
      //   let totalnumber = 0;
      //   for (let i = 0; i < countitem.length; i++) {
      //     totalnumber += countitem[i].price * countitem[i].count;
      //   }
      //   return totalnumber;
    },
    totalcount() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((prevalue, item) => {
          return prevalue + item.count;
        }, 0);
    },
    isselectall() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      }
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
};
</script>

<style scoped>
.cartbottombar {
  display: flex;
  height: 50px;
  position: relative;
  background-color: pink;
  line-height: 50px;
}
.check-text {
  flex: 1;
}
.check {
  display: flex;
  width: 70px;
}
.checkbottom {
  flex: 1;
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
}
.all-check {
  flex: 1;
}
.all {
  flex: 1;
}
.computed {
  flex: 1;
  background-color: #ff5100;
  color: #fff;
  text-align: center;
}
</style>