<template>
  <div>
    <cart-list-item
      v-for="(item, index) in cartList"
      :product="item"
      :key="index"
      >{{ item }}</cart-list-item
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    CartListItem,
  },
};
</script>

<style scoped>
</style>