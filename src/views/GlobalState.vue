<template>
  <div class="mt-2">
    <h3 class="logo-text">GLOBAL STATE</h3>
    <div class="divider" />
    <p class="pt-1">
      BookingType:
      <b>{{ getBookingType }}</b>
    </p>
    <p class="pt-1">
      Email:
      <b>{{ getEmail }}</b>
    </p>
    <p class="pt-1">
      Step:
      <b>{{ getStep }}</b>
    </p>
    <p class="pt-1">
      Dish:
      <b>#{{ getDish.idMeal }}</b> Name:
      <b>{{ getDish.strMeal }}</b>
    </p>
    <p class="pt-1">
      Drinks count:
      <b>{{ getDrinks.length }}</b>
    </p>
    <p class="pt-1">
      Drinks selected:
      <b>{{ getSelectedDrinks }}</b>
    </p>
    <p class="pt-1">
      Drink names selected:
      <b>{{ getSelectedDrinkNames }}</b>
    </p>
    <p class="pt-1">
      Date selected:
      <b>{{ getDate }}</b>
    </p>
    <p class="pt-1">
      Time selected:
      <b>{{ getTime }}</b>
    </p>
    <p class="pt-1">
      People count selected:
      <b>{{ getPeopleAmount }}</b>
    </p>
    <p class="pt-1">
      Bookings:
      <b>{{ getMultipleBookings }}</b>
    </p>
    <p class="pt-1">
      Internet connection:
      <b>{{ getInternetStatus }}</b>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GlobalState",
  computed: {
    ...mapGetters([
      "getBookingType",
      "getEmail",
      "getStep",
      "getDish",
      "getDrinks",
      "getSelectedDrinks",
      "getDate",
      "getTime",
      "getPeopleAmount",
      "getSelectedDrinkNames",
      "getMultipleBookings",
      "getInternetStatus"
    ])
  },
  watch: {
    getBookingType(value, prev) {
      console.log(value, prev);
    }
  }
};
</script>

<style lang="scss" scoped></style>
