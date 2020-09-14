<template>
  <div class="drinks-container">
    <div v-for="drink in drinks" :key="drink.id">
      <Drink :data="drink" />
    </div>
  </div>
</template>

<script>
import Drink from "@/components/Drink.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DrinksDisplay",
  components: {
    Drink
  },
  methods: {
    ...mapActions(["fetchDrinks"]),
    handleDrinksFetch() {
      this.fetchDrinks();
    }
  },
  data() {
    return {
      drinks: []
    };
  },
  computed: {
    ...mapGetters(["getDrinks"])
  },
  created() {
    this.handleDrinksFetch();
  },
  watch: {
    getDrinks(value) {
      this.drinks = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.drinks-container {
  margin-top: 50px !important;
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 90px);
}

@media (min-width: 630px) {
  .drinks-container {
    margin-top: 0px !important;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 790px) {
  .drinks-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
