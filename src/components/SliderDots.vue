<template>
  <div class="dots-container">
    <div v-for="dot in length" :key="dot">
      <div
        class="dot"
        @click="updateIndex(dot - 1)"
        v-bind:class="{ active: indexChild + 1 === dot }"
      >&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderDots",
  props: {
    indexChild: Number,
    length: Number
  },
  methods: {
    updateIndex(index) {
      console.log(index);
      this.$emit("update-index", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.dots-container {
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  background: white;
  padding: 5px;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 100%;
  opacity: 0.7;
}

.active {
  background: #ba2329;
}
</style>
