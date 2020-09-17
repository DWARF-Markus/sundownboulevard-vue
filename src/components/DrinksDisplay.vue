<template>
  <div v-if="getDrinksLoaded" class="drinks-container">
    <div v-for="drink in drinks" :key="drink.id">
      <div v-if="selectedDrinks.includes(parseInt(drink.id))">
        <Drink :selected="true" :amount="formattedSelectedDrinks[drink.id]" :data="drink" />
      </div>
      <div v-else>
        <Drink :data="drink" />
      </div>
    </div>
  </div>
  <div class="drinks-container" v-else>
    <div class="drink-entry--placeholder" v-for="drink in 25" :key="drink">
      <i class="fa fa-spinner blue-text"></i>
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
    ...mapActions(["fetchDrinks", "changeStep", "changeDrinks"]),
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
    ...mapGetters(["getDrinks", "getSelectedDrinks", "getDrinksLoaded"])
  },
  created() {
    this.changeStep(3);
    if (localStorage.drinks) {
      this.drinks = JSON.parse(localStorage.getItem("drinks"));
      this.changeDrinks(JSON.parse(localStorage.getItem("drinks")));
      this.getDrinksLoaded = true;

      console.log("local storage drinks");
    } else {
      this.handleDrinksFetch();
      console.log("new fetch");
    }
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

.drink-placeholder {
  border: 1px solid lightgray;
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
