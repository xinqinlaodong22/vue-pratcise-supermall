<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.link" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        <h5>{{ item.title }}</h5>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0;
  /* box-shadow: 5px 0 1px rgba(0, 0, 0, 0.5); */
  border-bottom: 10px solid #eee;
}

.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>