<template>
  <div class="m-2 email-container">
    <div class="email-desc mt-1">
      <h3 class="mt-1">Already booked?</h3>
      <p>
        In case you already have an active booking you can update the booking
        by entering your email.
      </p>
    </div>
    <div class="email-input-wrapper mt-1">
      <div class="input-pair">
        <InputLabel @input="validateEmail" inputType="email" text="Email" name="userEmail" />
        <Button v-bind="{ disabled : !emailValid }" @click="setUserEmail" secondary class="mt-1">GO</Button>
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
    ...mapActions(["changeEmail", "changeType", "changeStep"]),
    setUserEmail() {
      if (this.emailValid) {
        this.changeEmail(this.userEmail);
        this.changeStep(2);
        this.changeType("updateBooking");
        this.$router.push("/order");
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