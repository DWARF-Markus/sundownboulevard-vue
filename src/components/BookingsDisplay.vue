<template>
  <div class="bookings-container">
    <div class="bookings-header px-1 m-1">
      <p>
        Your current bookings on
        <b>{{ getEmail }}</b>
      </p>
    </div>
    <div v-for="booking in pageList" v-bind:key="booking.id">
      <Booking :data="booking" />
    </div>
    <div class="text-center">
      <Button
        @click="loadList(page)"
        class="mx-1 px-1"
        :backBtn="page !== currentPage"
        v-for="page in numberOfPages"
        v-bind:key="page"
      >{{ page }}</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Booking from "@/components/Booking.vue";
import Button from "@/components/Button.vue";

export default {
  name: "BookingDisplay",
  components: {
    Button,
    Booking
  },
  data() {
    return {
      data: [],
      items: null,
      itemsPerPage: 10,
      currentPage: 1,
      numberOfPages: null,
      loading: true,
      pageList: []
    };
  },
  methods: {
    loadList(e) {
      this.currentPage = e;
      let begin = (this.currentPage - 1) * this.itemsPerPage;
      let end = begin + this.itemsPerPage;

      console.log(begin);
      console.log(end);
      console.log(this.pageList);

      this.pageList = this.getMultipleBookings.slice(begin, end);
    }
  },
  computed: {
    ...mapGetters(["getMultipleBookings", "getEmail"])
  },
  created() {
    this.items = this.getMultipleBookings.length;
    this.numberOfPages = Math.ceil(this.items / this.itemsPerPage);
    this.loadList(1);
  }
};
</script>

<style lang="scss" scoped>
.bookings-container {
}

.bookings-header {
  background-color: #007ddb;
  padding: 1rem 1rem;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  p {
    color: white;
  }
}
</style>