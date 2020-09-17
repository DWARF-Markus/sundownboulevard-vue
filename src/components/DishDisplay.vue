<template>
  <div>
    <p class="loader-text" :class="{ 'loader-text--loading': getDishLoading }">
      <i class="fa fa-spinner blue-text"></i>
      <br />
      <span>Loading new dish</span>
    </p>
    <div
      class="dish-display-container mt-1"
      :class="{ 'dish-display-container--loading': getDishLoading }"
    >
      <div class="dish-display-desc p-1" :class="{ 'dish-display-desc--loading': getDishLoading }">
        <h3 class="logo-text blue-text">{{ getDish.strCategory }}</h3>
        <h1 class="mt-1">{{ getDish.strMeal }}</h1>
        <p class="mt-1">{{ getDish.strInstructions }}</p>
        <Button
          :class="{ hidden: getDishLoading }"
          @click="handleNewDish"
          icon="fa-carrot"
          rightIcon
        >NEW DISH</Button>
      </div>
      <div class="dish-display-img p-1">
        <i v-if="!onLine" class="fa fa-carrot blue-text"></i>
        <img
          v-else
          :class="{ display: isDishImageLoaded }"
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
      onLine: navigator.onLine,
      networkOff: false
    };
  },
  computed: {
    ...mapGetters(["getBookingType", "getDish", "getDishLoading"])
  },
  methods: {
    ...mapActions(["fetchDish", "changeStep", "fetchLocalStorageDish"]),
    handleNewDish() {
      if (this.onLine) {
        this.fetchDish();
        this.isDishImageLoaded = false;
      } else {
        this.fetchLocalStorageDish();
      }
    },
    dishImgLoaded() {
      this.isDishImageLoaded = true;
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    }
  },
  created() {
    this.changeStep(2);

    if (this.onLine) {
      if (
        this.getBookingType === "newBooking" &&
        this.getDish.name !== undefined
      ) {
        console.log("get new dish");
        this.fetchDish();
      }
    } else {
      console.log("get local dish");
      this.fetchLocalStorageDish();
    }
  },
  watch: {
    onLine(v) {
      if (v) {
        this.networkOff = true;
      }
    }
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeUnmount() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
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
  transition: 0.15s ease-in-out;
  opacity: 1;

  &--loading {
    opacity: 0;

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
  color: #007ddb;
  transition: 0.15s ease-in-out;

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
