import { mapGetters } from 'vuex';
<template>
  <div>
    <div class="dish-display-container mt-1">
      <div class="dish-display-desc p-1">
        <h3 class="logo-text blue-text">{{ getDish.strCategory }}</h3>
        <h1 class="mt-1">{{ getDish.strMeal }}</h1>
        <p class="mt-1">{{ getDish.strInstructions }}</p>
        <Button @click="handleNewDish" icon="fa-carrot" rightIcon>NEW DISH</Button>
      </div>
      <div class="dish-display-img p-1">
        <img :src="getDish.strMealThumb" alt="image of meal" />
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
  computed: {
    ...mapGetters(["getBookingType", "getDish"])
  },
  methods: {
    ...mapActions(["fetchDish"]),
    handleNewDish() {
      this.fetchDish();
    }
  },
  created() {
    if (this.getBookingType === "newBooking") {
      this.fetchDish();
    } else {
      console.log("no new dish please");
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

.dish-display-container {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 50px !important;
  animation-name: quickFadeIn;
  animation-duration: 1.3s;
  min-height: calc(100vh - 90px);

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
  }
}

.dish-display-img img {
  max-height: 330px;
  object-fit: cover;
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
