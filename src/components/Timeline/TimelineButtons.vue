<template>
  <div class="btn-container px-1">
    <div class="text-left">
      <Button
        backBtn
        icon="fa-arrow-left"
        leftIcon
        @click="handlePrevClick"
      >{{ data[getStep - 2].timelineTitle }}</Button>
    </div>
    <div>
      <p
        v-if="getStep === 3"
        class="logo-text text-center blue-text"
      >{{ getSelectedDrinks.length }} chosen</p>
    </div>
    <div v-if="getStep !== 4" class="text-right">
      <Button
        v-if="getStep === 3 && getSelectedDrinks.length === 0"
        disabled
        backBtn
        @click="handleNextClick"
      >MIN 1 DRINK</Button>
      <Button
        v-else
        icon="fa-arrow-right"
        rightIcon
        @click="handleNextClick"
      >{{ data[getStep].timelineTitle }}</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import data from "./timeline-data.json";
import Button from "@/components/Button.vue";

export default {
  name: "TimelineButtons",
  components: {
    Button
  },
  data() {
    return {
      data: data
    };
  },
  methods: {
    ...mapActions(["changeStep", "getSelectedDrinks"]),
    handlePrevClick() {
      if (this.getStep === 2) {
        this.$router.push("/");
      } else {
        this.changeStep(this.getStep - 1);
      }
    },
    handleNextClick() {
      this.changeStep(this.getStep + 1);
    }
  },
  computed: {
    ...mapGetters(["getStep", "getSelectedDrinks"])
  }
};
</script>

<style lang="scss" scoped>
@keyframes topUpAnimation {
  0% {
    transform: translateY(100px);
  }

  100% {
    transform: translateY(0px);
  }
}

.btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 80px;
  background-color: white;
  transform: translateY(0px);
  animation-name: topUpAnimaiton;
  animation-duration: 2s;
}

@media (min-width: 630px) {
  .btn-container {
    position: relative !important;
    animation-name: none;
    background-color: transparent;
  }
}
</style>