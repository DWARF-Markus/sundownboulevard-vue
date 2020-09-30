<template>
  <div
    @click="handleLightSwitch"
    :class="[ getDarkMode ? 'light-toggle-container--dark' : 'light-toggle-container--light' ]"
    class="light-toggle-container"
  >
    <i v-if="getDarkMode" class="fa fa-moon" />
    <i v-else class="fa fa-sun blue-text" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LightToggle",
  methods: {
    ...mapActions(["changeDarkMode"]),
    handleLightSwitch() {
      this.changeDarkMode(!this.getDarkMode);
    }
  },
  computed: {
    ...mapGetters(["getDarkMode"])
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideInLeft {
  0% {
    transform: translate(-5rem, 0) rotateZ(-50deg);
  }

  30% {
    transform: translate(-5rem, 0) rotateZ(-50deg);
  }

  100% {
    transform: translate(0, 0) rotateZ(0deg);
  }
}

.light-toggle-container {
  position: fixed;
  bottom: 85px;
  left: 5px;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.7rem 0.8rem;
  align-items: center;
  box-shadow: 3px 4px 4px rgba(22, 22, 22, 0.11);
  z-index: 200;
  cursor: pointer;
  border-radius: 5px;
  animation: slideInLeft 2.2s forwards;
  transition: 0.2s ease;

  &--light {
    background: white;

    i {
      color: #007ddb !important;
    }

    // &:hover {
    //   background: black;
    //   i {
    //     color: white !important;
    //   }
    // }
  }

  &--dark {
    background: black;

    i {
      color: white !important;
    }

    // &:hover {
    //   background: white;
    //   i {
    //     color: #007ddb !important;
    //   }
    // }
  }
}
</style>