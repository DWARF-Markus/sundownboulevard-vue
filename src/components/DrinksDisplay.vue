<template>
  <div class="drinks-container">
    <div v-for="drink in drinks" :key="drink.id">
      <div v-if="selectedDrinks.includes(parseInt(drink.id))">
        <Drink :selected="true" :amount="formattedSelectedDrinks[drink.id]" :data="drink" />
      </div>
      <div v-else>
        <Drink :data="drink" />
      </div>
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
      drinks: [],
      selectedDrinks: [],
      formattedSelectedDrinks: []
    };
  },
  computed: {
    ...mapGetters(["getDrinks", "getSelectedDrinks"])
  },
  created() {
    this.handleDrinksFetch();
  },
  watch: {
    getDrinks(value) {
      this.drinks = value;
      this.selectedDrinks = this.getSelectedDrinks;

      const obj = {};

      for (let i = 0; i < this.selectedDrinks.length; ++i) {
        if (!obj[this.selectedDrinks[i]]) {
          obj[this.selectedDrinks[i]] = 0;
          ++obj[this.selectedDrinks[i]];
        } else {
          ++obj[this.selectedDrinks[i]];
        }
      }

      this.formattedSelectedDrinks = obj;
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
