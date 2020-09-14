<template>
  <div class="order-container">
    <Timeline />
    <div class="order-display-container">
      <div v-if="getStep === 2">
        <DishDisplay />
      </div>
      <div v-if="getStep === 3">
        <DrinksDisplay />
      </div>
      <div v-if="getStep === 4">
        <ConfirmDisplay />
      </div>
      <div v-if="getStep === 5">
        <ReceiptDisplay />
      </div>
    </div>
    <div class="order-nav">
      <TimelineButtons />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Timeline from "@/components/Timeline/Timeline.vue";
import TimelineButtons from "@/components/Timeline/TimelineButtons.vue";
import DishDisplay from "@/components/DishDisplay.vue";
import DrinksDisplay from "@/components/DrinksDisplay.vue";
import ConfirmDisplay from "@/components/ConfirmDisplay.vue";
import ReceiptDisplay from "@/components/ReceiptDisplay.vue";

export default {
  name: "Order",
  components: {
    Timeline,
    DishDisplay,
    DrinksDisplay,
    ConfirmDisplay,
    ReceiptDisplay,
    TimelineButtons
  },
  computed: { ...mapGetters(["getStep"]) }
};
</script>
