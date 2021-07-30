<template>
  <div class="toast" v-show="isshow">{{ message }}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isshow: false,
    };
  },
  methods: {
    show(message = "成功添加一件商品", duration = 2000) {
      this.isshow = true;
      this.message = message;
      setTimeout(() => {
        this.isshow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10000;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 3px 6px;
  line-height: 25px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15%;
}
</style>