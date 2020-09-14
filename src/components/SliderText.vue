<template>
  <div class="home-page-wrapper">
    <div class="home-box px-3">
      <p class="logo-text">SUNDOWN BOULEVARD</p>
      <h1 class="mt-1">Our passion is making food with fresh and local ingredients</h1>
      <p class="mt-1">
        Welcome to an innovative dining experience. Here you get to choose a
        random dish from our massive menu, and we will make sure it will be
        unforgettable.
      </p>
      <Button @click="handleNewBooking" secondary big>BOOK</Button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "SliderText",
  components: {
    Button
  },
  methods: {
    ...mapActions(["changeType", "changeStep", "clearDrinks"]),
    handleNewBooking() {
      this.changeType("newBooking");
      this.changeStep(2);
      this.clearDrinks();
      this.$router.push("/order");
    }
  }
};
</script>

<style lang="scss" scoped>
.home-box {
  position: absolute;
  pointer-events: none;
  top: 15vh;
  width: 100%;
  text-align: center;

  h1 {
    font-weight: 800;
    font-size: 19px;
  }

  p {
    font-size: 16px !important;
  }

  button {
    pointer-events: all;
    cursor: pointer;
  }
}

.primary-cat {
  padding: 7px 24px !important;
  font-size: 20px !important;
}

@media (min-width: 630px) {
  .home-box {
    top: 25vh;
    text-align: left;
    max-width: calc(1220px / 2);

    h1 {
      font-size: 25px;
    }

    p {
      font-size: 14px;
    }
  }
}

@media (min-width: 1220px) {
  .home-box {
    h1 {
      font-size: 35px;
    }
  }
}
</style>
