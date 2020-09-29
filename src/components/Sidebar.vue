<template>
  <div @click="toggleSidebar" :class="{ 'order-sidebar--open' : open }" class="order-sidebar">
    <i class="fa" :class="{'fa-shopping-cart blue-text' : !open, 'fa-times white-text' : open}" />
    <h3 class="px-1" :class="{'order-sidebar--no-transition' : !open}">YOUR CART</h3>
    <div
      class="order-sidebar-content"
      :class="{ 'order-sidebar-content--show' : open, 'order-sidebar-content--no-transition' : !open }"
    >
      <div class="order-sidebar-dish">
        <h4>Dish</h4>
        <div class="dish-list">
          <p>
            <span>{{ getPeopleAmount }} x</span>
            {{ getDish.strMeal }}
          </p>
          <p class="price">{{ dishPrice }} kr. / person</p>
        </div>
      </div>
      <div v-if="getSelectedDrinks.length !== 0" class="order-sidebar-drinks">
        <h4>Drinks</h4>
        <div class="drinks-list">
          <div class="drinks-list-entry" v-for="drink in drinksSummary" v-bind:key="drink">
            <p>
              <span>{{ drink.amount }} x</span>
              {{ drink.name }}
            </p>
            <p class="price">{{ drink.amount * drinkPrice }} kr.</p>
          </div>
        </div>
      </div>
      <div class="order-sidebar-summary">
        <div class="summary-list">
          <h4>Total</h4>
          <p
            class="price price--total"
          >{{ getPeopleAmount * dishPrice + getSelectedDrinks.length * drinkPrice }} kr.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      open: false,
      drinkPrice: 35,
      dishPrice: 155
    };
  },
  methods: {
    ...mapActions(["changeSidebarToggle"]),
    toggleSidebar() {
      this.open = !this.open;
      this.changeSidebarToggle(this.open);
    }
  },
  computed: {
    ...mapGetters([
      "getDrinks",
      "getSelectedDrinks",
      "getDish",
      "getPeopleAmount"
    ]),
    drinksSummary() {
      return this.getSelectedDrinks.reduce((acc, cur) => {
        const drink = this.getDrinks[cur - 1];
        const index = acc.findIndex(entry => entry.id === drink.id);

        if (index === -1) {
          acc.push({ id: drink.id, name: drink.name, amount: 1 });
        } else {
          acc[index].amount += 1;
        }

        return acc;
      }, []);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideInRight {
  0% {
    transform: translate(5rem, 0) rotateZ(50deg);
  }

  30% {
    transform: translate(5rem, 0) rotateZ(50deg);
  }

  100% {
    transform: translate(0, 0) rotateZ(0deg);
  }
}

.order-sidebar {
  position: fixed;
  width: 2.5rem;
  max-width: 2.5rem;
  display: grid;
  align-items: center;
  justify-content: right;
  padding: 0 0.7rem;
  top: 105px;
  right: 5px;
  height: 2.5rem;
  background: white;
  border-radius: 5px;
  animation: slideInRight 2.2s forwards;
  box-shadow: 3px 4px 4px rgba(22, 22, 22, 0.11);
  transform: translate(5rem, 0) rotateZ(50deg);
  transition: 0.3s ease-in-out;
  z-index: 190;
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  i {
    font-size: 15px;
    pointer-events: none;
    transition: 0.3s ease-in-out;
  }

  h3 {
    position: absolute;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 400;
    color: white;
    padding: 0 0.8rem;
    opacity: 0;
    transition: 0.7s ease-in;
  }

  &:hover {
    background: #007ddb;

    i {
      color: white !important;
    }
  }

  &--no-transition {
    transition: none !important;
  }

  &--open {
    background: white;
    box-shadow: none;
    align-items: right;
    border-radius: 0%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: calc(100% - 10px);
    max-width: none;
    right: 5px;
    justify-content: right;
    background: #007ddb;

    h3 {
      opacity: 1;
    }

    &:hover {
      i {
        color: white;
      }
    }
  }

  .order-sidebar-content {
    position: absolute;
    background: white;
    width: 100%;
    overflow: hidden;
    max-height: 0;
    z-index: 100;
    top: 2.5rem;
    transition: 0.5s ease-in-out;
    box-shadow: 0px 4px 5px rgba(22, 22, 22, 0.219);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    opacity: 0;
    padding: 0.7rem 0.3rem;

    .order-sidebar-dish {
      margin: 0 0 0.8rem 0;
      padding: 0 0.5rem;
    }

    .order-sidebar-drinks,
    .order-sidebar-summary {
      margin: 0.8rem 0;
      padding: 0 0.5rem;
    }

    h4 {
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 400;
      color: #007ddb;
      margin: 0.1rem 0;
    }

    &--show {
      max-height: 60vh;
      opacity: 1;
    }

    &--no-transition {
      transition: none !important;
    }
  }

  .dish-list,
  .summary-list,
  .drinks-list-entry {
    display: grid;
    grid-template-columns: 75% 25%;
    position: relative;
    height: 1.3rem;

    .price {
      text-align: right;
      width: 100%;
      font-size: 15px;
      font-weight: 100;
      color: rgb(36, 36, 36);

      &--total {
        font-weight: 400;
        font-size: 17px;
      }
    }

    p {
      position: absolute;
      span {
        font-size: 11px;
        font-weight: 100;
        color: rgb(36, 36, 36);
      }
    }
  }

  .drinks-list-entry {
    border-bottom: 1px solid rgba(211, 211, 211, 0.171);
    padding: 0.8rem;
    margin: 0.3rem 0;

    &:last-of-type {
      border-bottom: none;
    }
  }
}
@media (min-width: 630px) {
  .order-sidebar {
    top: 130px;

    &--open {
      max-width: 30rem;
    }
  }
}
</style>