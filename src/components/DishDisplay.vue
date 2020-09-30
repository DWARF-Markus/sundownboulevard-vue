<template>
  <div>
    <p
      class="loader-text"
      :class="{ 'loader-text--loading': getDishLoading, 'loader-text--dark' : getDarkMode }"
    >
      <i class="fa fa-spinner"></i>
      <br />
      <span>Loading new dish</span>
    </p>
    <div
      class="dish-display-container mt-1"
      :class="{ 'dish-display-container--loading': !isDishImageLoaded }"
    >
      <div
        class="dish-display-desc p-1"
        :class="{ 'dish-display-desc--loading': !isDishImageLoaded }"
      >
        <h3 class="logo-text blue-text">{{ getDish.strCategory }}</h3>
        <h1 class="mt-1">{{ getDish.strMeal }}</h1>
        <p class="mt-1">{{ getDish.strInstructions }}</p>
        <Button
          :darkMode="getDarkMode"
          :class="{ hidden: getDishLoading }"
          @click="handleNewDish"
          icon="fa-carrot"
          rightIcon
        >NEW DISH</Button>
      </div>
      <div class="dish-display-img p-1">
        <img
          v-if="!showCarrot"
          :class="{ display: isDishImageLoaded && !showCarrot }"
          @load="dishImgLoaded"
          :src="getDish.strMealThumb"
          alt="image of meal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "DishDisplay",
  components: {
    Button
  },
  data() {
    return {
      isDishImageLoaded: false,
      showCarrot: false
    };
  },
  computed: {
    ...mapGetters([
      "getBookingType",
      "getDish",
      "getDishLoading",
      "getInternetStatus",
      "getDarkMode"
    ])
  },
  methods: {
    ...mapActions([
      "fetchDish",
      "changeStep",
      "fetchLocalStorageDish",
      "fetchDrinks"
    ]),
    handleNewDish() {
      this.isDishImageLoaded = false;
      if (this.getInternetStatus) {
        this.fetchDish();
      } else {
        this.isDishImageLoaded = true;
        this.fetchLocalStorageDish();
      }
    },
    dishImgLoaded() {
      setTimeout(() => {
        this.isDishImageLoaded = true;
      }, 100);
    }
  },
  created() {
    this.changeStep(2);

    if (this.getInternetStatus) {
      if (this.getBookingType === "newBooking") {
        console.log("get new dish");
        this.fetchDish();
      } else {
        this.fetchDrinks();
      }
    } else {
      console.log("get local dish");
      this.isDishImageLoaded = true;
      this.fetchLocalStorageDish();
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes quickFadeIn {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.hidden {
  opacity: 0;
}

.dish-display-container {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 50px !important;
  animation-name: quickFadeIn;
  animation-duration: 1.3s;
  min-height: calc(100vh - 90px);
  transition: 0.35s ease-in-out;
  opacity: 1;

  &--loading {
    opacity: 0;
    pointer-events: none;

    img {
      opacity: 0;
    }
  }

  h1 {
    font-weight: 600;
    font-size: 23px;
  }

  p {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }

  img {
    width: 100%;
    transition: 1.2s ease-in;
    border-radius: 5px;
  }
}

.loader-text {
  position: absolute;
  font-size: 25px;
  width: 100%;
  text-align: center;
  left: 0;
  opacity: 0;
  top: 50vh;
  // color: #007ddb;
  transition: 0.15s ease-in-out;

  &--dark {
    color: white !important;
  }

  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  i {
    margin-top: 10px;
    transition: 10s;
    animation: spin-animation 0.8s infinite;
    animation-timing-function: linear;
  }

  &--loading {
    opacity: 1;
  }
}

.dish-display-img {
  max-height: 330px;
  object-fit: cover;
  align-items: center;
  justify-content: center;
  display: grid;

  img {
    max-height: 330px;
    object-fit: cover;
  }

  i {
    font-size: 40px;
  }
}

.dish-display-desc {
  transition: 0.3s ease;
  opacity: 1;

  &--loading {
    opacity: 0;
  }
}

@media (min-width: 630px) {
  .dish-display-container {
    grid-template-columns: 1fr 1fr;
    margin-top: 0px !important;
    min-height: 0px;
  }

  p {
    -webkit-line-clamp: 20;
  }
}
</style>
