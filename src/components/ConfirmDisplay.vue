<template>
  <div>
    <div v-if="!loading" class="confirm-display-wrapper">
      <div class="confirm-display-container opacity-animation p-2">
        <div class="input-pair" :class="{ disabled: getBookingType === 'updateBooking' }">
          <InputLabel
            @input="validateEmail"
            :value="email"
            inputType="email"
            text="Email"
            name="email"
          />
        </div>
        <div class="hours-container mt-1">
          <p class="hours-title">OPENING HOURS ARE</p>
          <div class="hours-wrapper p-1">
            <ul class="left">
              <li>MONDAY</li>
              <li>TUESDAY</li>
              <li>WEDNESDAY</li>
              <li>THURSDAY</li>
              <li>FRIDAY</li>
              <li>SATURDAY</li>
              <li>SUNDAY</li>
            </ul>
            <ul class="right">
              <li>18:00 - 22:00</li>
              <li>18:00 - 22:00</li>
              <li>18:00 - 22:00</li>
              <li>18:00 - 22:00</li>
              <li>18:00 - 22:00</li>
              <li>CLOSED</li>
              <li>CLOSED</li>
            </ul>
          </div>
        </div>
        <div class="input-pair confirm-container">
          <label v-if="showDateTimeError" class="blue-text">Please select a valid time for visiting</label>
        </div>
        <div class="datetime-container">
          <div class="input-pair">
            <label for="booking-date">DATE</label>
            <input
              type="date"
              @change="validateDate"
              name="booking-date"
              v-model="date"
              :defaultValue="today"
              min="2020-09-15"
              max="2020-12-31"
            />
          </div>
          <div class="input-pair">
            <label for="booking-time">TIME</label>
            <select @change="validateTime" v-model="time">
              <option
                v-for="option in timeOptions"
                :key="option"
                :value="option.value"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>
        <div class="input-pair mt-1">
          <label for="peopleAmount">AMOUNT OF PEOPLE</label>
          <div>
            <select v-model="peopleAmount" @change="validatePeopleAmount" class="peopleAmount">
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
        </div>
        <Button
          v-if="!emailValid || !dateValid || !timeValid"
          disabled
          big
          rightIcon
          icon="fa-check"
        >
          <slot v-if="getBookingType === 'updateBooking'">UPDATE</slot>
          <slot v-else>CONFIRM</slot>
        </Button>
        <Button @click="handleNewBooking" v-else big rightIcon icon="fa-check">
          <slot v-if="getBookingType === 'updateBooking'">UPDATE</slot>
          <slot v-else>CONFIRM</slot>
        </Button>
      </div>
    </div>
    <p class="loader-text" v-else>
      <i class="fa fa-spinner blue-text"></i>
      <br />
      <span>Creating your booking</span>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputLabel from "@/components/InputLabel.vue";
import Button from "@/components/Button.vue";

export default {
  name: "ConfirmDisplay",
  components: {
    InputLabel,
    Button
  },
  methods: {
    ...mapActions([
      "changeEmail",
      "changeDate",
      "changeTime",
      "changePeopleAmount",
      "changeStep"
    ]),
    validateEmail(e) {
      const input = e.target.value;

      this.email = input;

      if (this.regex.test(input)) {
        this.changeEmail(input);
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
    },
    validateDate(e) {
      const day = new Date(e.target.value).getDay();

      if (day === 6 || day === 0) {
        console.log("Throw error: We're closed in the weekend!");
        this.dateValid = false;
        this.showDateTimeError = true;
      } else {
        this.changeDate(this.date);
        this.dateValid = true;
        this.showDateTimeError = false;
      }
    },
    validateTime() {
      this.timeValid = true;
      this.changeTime(this.time);
    },
    validatePeopleAmount(e) {
      const amount = e.target.value;

      this.changePeopleAmount(amount);
    },
    async handleNewBooking() {
      this.loading = true;
      if (this.getBookingType === "newBooking") {
        this.loading = true;
        await fetch("https://krh-sundown.dev.dwarf.dk/api/user/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
          },
          body: JSON.stringify({
            startTime: `${this.date} ${this.time}`,
            numberOfPeople: this.peopleAmount,
            email: this.email
          })
        })
          .then(res => res.json())
          .then(data => this.handleBookingDetails(data.bookingId));
      } else {
        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${this.getBookingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            },
            body: JSON.stringify({
              startTime: `${this.date} ${this.time}`,
              numberOfPeople: this.peopleAmount,
              email: this.email
            })
          }
        )
          .then(res => res.json())
          .then(() => this.handleBookingDetails(this.getBookingId));
      }
    },
    async handleBookingDetails(id) {
      const drinksToPost = this.getSelectedDrinks
        .map((drink, index) => `drinks[${index}][drinkId]=${drink}`)
        .join("&");

      if (this.getBookingType === "newBooking") {
        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/dishes?dishes[0][dishId]=${this.getDish.idMeal}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        );

        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${drinksToPost}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        );
        setTimeout(() => {
          this.loading = false;
          this.$router.push("/order/receipt");
          this.changeStep(5);
        }, 800);
      } else {
        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/dishes?dishes[0][dishId]=${this.getDish.idMeal}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        );
        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/user/bookings/${id}/drinks?${drinksToPost}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        );
        setTimeout(() => {
          this.loading = false;
          this.$router.push("/order/receipt");
          this.changeStep(5);
        }, 800);
      }
    }
  },
  data() {
    return {
      email: "",
      emailValid: false,
      date: null,
      dateValid: false,
      time: null,
      timeValid: false,
      timeOptions: [
        { text: "18:00", value: "18:00:00" },
        { text: "18:20", value: "18:20:00" },
        { text: "18:40", value: "18:40:00" },
        { text: "19:00", value: "19:00:00" },
        { text: "19:20", value: "19:20:00" },
        { text: "19:40", value: "19:40:00" },
        { text: "20:00", value: "20:00:00" }
      ],
      showDateTimeError: false,
      loading: false,
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      peopleAmount: 2
    };
  },
  computed: {
    ...mapGetters([
      "getDate",
      "getTime",
      "getBookingType",
      "getSelectedDrinks",
      "getDish",
      "getPeopleAmount",
      "getEmail",
      "getBookingId"
    ]),
    today() {
      const date = new Date();
      return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
    }
  },
  created() {
    this.changeStep(4);
    if (this.getBookingType === "updateBooking") {
      this.email = this.getEmail;
      this.emailValid = true;
      this.date = this.getDate;
      this.dateValid = true;
      this.time = this.getTime;
      this.timeValid = true;

      this.peopleAmount = this.getPeopleAmount;
    }
  }
};
</script>

<style lang="scss" scoped>
.loader-text {
  position: absolute;
  font-size: 25px;
  width: 100%;
  text-align: center;
  left: 0;
  opacity: 1;
  top: 50vh;
  color: #007ddb;
  transition: 0.15s ease-in-out;

  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  i {
    margin-top: 10px;
    transition: 10s;
    animation: spin-animation 0.8s infinite;
    animation-timing-function: linear;
  }
}

.confirm-display-wrapper {
  margin: 0 auto;
  text-align: center;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 70px 0;
  width: 100%;
  min-height: calc(100vh - 90px);
}

.confirm-display-container {
  width: 100%;
  max-width: 490px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.hours-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;

  ul {
    list-style: none;

    li {
      font-weight: 100;
      font-size: 12px;
      margin: 3px 0;
    }
  }

  .left {
    text-align: left;
    border-left: 2px solid #007ddb;
    padding: 0 8px;
  }

  .right {
    text-align: right;
  }
}

.hours-title {
  text-align: left;
  font-size: 10px;
  font-weight: 800;
}

.confirm-loader img {
  width: 60px;
  padding: 50px 0;
}

.confirm-container {
  min-height: 1.5rem;
}

.datetime-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  min-height: 60px;
}

@keyframes spin {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.loader-animation {
  animation-name: spin;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

select {
  width: 100%;
  padding: 4px;
}

.peopleAmount {
  margin-top: 4px;
}

@media (min-width: 630px) {
  .confirm-display-wrapper {
    padding: 30px 0;
    min-height: 0px !important;
  }
}
</style>
