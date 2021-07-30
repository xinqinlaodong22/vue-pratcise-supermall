<template>
  <div id="tarbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
#tarbar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #f6f6f6;
  box-shadow: 0 -3px 1px rgba(0, 0, 0, 0.1);
}
</style>