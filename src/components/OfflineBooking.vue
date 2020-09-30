<template>
  <div
    :class="{
			'offline-booking-entry--loading': loading,
			'offline-booking-entry--sent': sent,
      'offline-booking-entry--dark' : getDarkMode
		}"
    class="offline-booking-entry"
  >
    <p class="text-left">
      {{ data.numberOfPeople }} x {{ data.dishName }}
      <br />
      {{ data.drinksCount }} x drinks
    </p>
    <p class="text-center">
      {{ data.email }}
      <br />
      <b>{{ data.numberOfPeople }} people</b>
      <br />
      {{ data.startTime }}
      <br />
    </p>
    <div class="text-right">
      <Button
        v-if="!loading && !sent"
        :darkMode="getDarkMode"
        rightIcon
        icon="fa-envelope"
        @click="sendOfflineBooking"
        big
        secondary
      >SEND</Button>
      <Button green v-if="sent" rightIcon icon="fa-check" @click="sendOfflineBooking" big>SENT</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "OfflineBooking",
  components: {
    Button
  },
  props: {
    data: { type: Object }
  },
  data() {
    return {
      sent: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters(["getDarkMode"])
  },
  methods: {
    ...mapActions(["changeMultipleBookings"]),
    async sendOrderDetails(id) {
      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/dishes?dishes[0][dishId]=${this.data.dish}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
          }
        }
      );

      await fetch(
        `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${this.data.drinks}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
          }
        }
      );

      setTimeout(() => {
        this.sent = true;
        this.loading = false;
      }, 850);

      setTimeout(() => {
        const arr = JSON.parse(localStorage.getItem("offlineBookings"));

        const newArr = arr.filter(booking => booking.id !== this.data.id);

        localStorage.setItem("offlineBookings", JSON.stringify(newArr));

        this.$emit("sent");
      }, 2000);
    },
    async sendOfflineBooking() {
      this.loading = true;
      await fetch("https://krh-sundown.dev.dwarf.dk/api/user/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          startTime: this.data.startTime,
          numberOfPeople: this.data.numberOfPeople,
          email: this.data.email
        })
      })
        .then(res => res.json())
        .then(data => {
          this.sendOrderDetails(data.bookingId);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.offline-booking-entry {
  padding: 30px;
  background-color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.12);
  border-left: 5px solid #ba2329;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  transition: 0.3s ease;

  &--dark {
    background-color: #393939;
  }

  p {
    font-size: 14px;
    color: #474747;
  }

  &--sent {
    opacity: 0.5;
    border-left: 5px solid rgb(26, 151, 26);
  }

  &--loading {
    transform: scale(0.95);
  }
}

@media (min-width: 650px) {
  .offline-booking-entry {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
