<template>
  <div class="checkbottom">
    <img
      src="@/assets/img/cart/tick.svg"
      :class="{ active: isactive }"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "CheckBottom",
  props: {
    isactive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.checkbottom {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.active {
  background-color: red;
  border-color: #fff;
}
</style>