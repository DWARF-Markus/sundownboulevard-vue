<template>
  <div class="m-2 email-container">
    <div class="email-desc mt-1">
      <h3 class="mt-1">Already booked?</h3>
      <p>
        In case you already have an active booking you can update the booking by
        entering your email.
      </p>
    </div>
    <div class="email-input-wrapper mt-1">
      <div class="input-pair">
        <InputLabel @input="validateEmail" inputType="email" text="Email" name="userEmail" />
        <Button
          v-bind="{ disabled: !emailValid }"
          @click="handleBookingUpdate"
          secondary
          class="mt-1"
        >GO</Button>
      </div>
    </div>
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import Button from "@/components/Button.vue";
import { mapActions } from "vuex";

export default {
  name: "EmailInput",
  components: {
    InputLabel,
    Button
  },
  data() {
    return {
      userEmail: "",
      emailValid: false,
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },
  methods: {
    ...mapActions([
      "changeDish",
      "changeSelectedDrinks",
      "changeEmail",
      "changeType",
      "changeStep",
      "changeDate",
      "changeTime",
      "changePeopleAmount",
      "changeBookingId",
      "changeMultipleBookings"
    ]),
    async handleBookingUpdate() {
      if (this.emailValid) {
        await fetch(
          `https://krh-sundown.dev.dwarf.dk/api/bookings?filter[email]=${this.userEmail}&include=drinks,dishes,drinks.drinkInfo&sort=startTime`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);

            if (data.length > 1) {
              console.log("this user has more than 1 booking");
              this.changeMultipleBookings(data);
              this.changeEmail(data[0].email);
              this.$router.push("/bookings");
            } else if (data.length === 1) {
              const drinksArray = data[0].drinks.map(drink =>
                parseInt(drink.externalDrinkId)
              );

              this.changeDish(data[0].dishes[0].externalDishId);
              this.changeSelectedDrinks(drinksArray);
              this.changeEmail(data[0].email);
              this.changeDate(data[0].startTime.split(" ")[0]);
              this.changeTime(data[0].startTime.split(" ")[1]);
              this.changePeopleAmount(data[0].numberOfPeople);
              this.changeBookingId(data[0].id);

              this.changeStep(2);
              this.changeType("updateBooking");
              this.$router.push("/order/dish");
            }
          });
      }
    },
    validateEmail(e) {
      const input = e.target.value;

      this.userEmail = input;

      if (this.regex.test(input)) {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.email-container {
  display: grid;
  grid-template-columns: 1fr;
}

.email-input {
  text-align: center;
}

@media (min-width: 630px) {
  .email-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .email-input {
    display: flex;
    text-align: right;
    width: 60%;
    align-self: center;
  }

  .email-input-wrapper {
    .input-pair {
      float: right;
      min-width: 250px;
    }
  }

  .email-input-wrapper a button {
    float: right;
  }
}
</style>
