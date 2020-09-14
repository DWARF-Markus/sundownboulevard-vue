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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GlobalState",
  computed: { ...mapGetters(["getBookingType", "getEmail", "getStep"]) },
  watch: {
    getBookingType(value, prev) {
      console.log(value, prev);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>