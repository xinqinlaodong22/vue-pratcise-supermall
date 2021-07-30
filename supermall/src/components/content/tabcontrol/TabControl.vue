<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "TabControl",
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    title: {
      type: Array,
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: red;
}
.active span {
  border-bottom: 3px solid red;
}
</style>