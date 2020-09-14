<template>
  <div class="slider">
    <div class="slider-main">
      <div class="slider-content" :style="{ transform: [translatePixels] }">
        <div v-for="image in images" :key="image">
          <img class="slide-entry" :src="`${image}`" />
        </div>
      </div>
      <SliderDots :index-child="index" :length="images.length" @update-index="updateIndex" />
    </div>
    <div>
      <SliderText />
    </div>
  </div>
</template>

<script>
import SliderDots from "@/components/SliderDots.vue";
import SliderText from "@/components/SliderText.vue";

export default {
  name: "Slider",
  components: {
    SliderDots,
    SliderText
  },
  data() {
    return {
      images: [
        require("../assets/food-image1.jpg"),
        require("../assets/food-image2.jpg"),
        require("../assets/food-image3.jpg")
      ],
      index: 0,
      timer: null,
      screenWidth: null,
      translatePixels: 0
    };
  },
  mounted: function() {
    this.startSlide();
  },
  methods: {
    startSlide() {
      this.timer = setInterval(this.next, 3500);
    },
    next() {
      if (this.index === this.images.length - 1) {
        this.index = 0;
        this.translatePixels = `translateX(0px)`;
      } else {
        this.index += 1;
        this.translatePixels = `translateX(-${this.index *
          this.screenWidth}px)`;
      }
    },
    prev() {
      this.index -= 1;
    },
    getWidth() {
      this.screenWidth = window.innerWidth > 1220 ? 1220 : window.innerWidth;
    },
    updateIndex(e) {
      this.index = e;
      this.translatePixels = `translateX(-${e * this.screenWidth}px)`;
    }
  },
  created() {
    this.getWidth();
  },
  computed: {
    currentImg() {
      return this.currentImage[Math.abs(this.currentIndex)];
    }
  }
};
</script>

<style lang="scss" scoped>
.slider-main {
  max-width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
}

.slider-content {
  position: relative;
  height: 50vh;
  margin: 0 auto;
  min-width: 300%;
  display: flex;
  transition: 0.4s ease-in-out;
}

.slide-entry {
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  object-fit: cover;
  width: 100%;
  background-position: center;
  opacity: 0.3;
}

@media (min-width: 630px) {
  .slider-content {
    height: 65vh;
    max-height: 760px;
  }
}
</style>
