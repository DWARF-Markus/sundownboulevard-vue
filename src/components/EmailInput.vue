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
        <InputLabel @input="setUserEmail" inputType="email" text="Email" name="userEmail" />
        <ButtonPrimary secondary class="mt-1">GO</ButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script>
import InputLabel from "@/components/InputLabel.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import { mapActions } from "vuex";

export default {
  name: "EmailInput",
  components: {
    InputLabel,
    ButtonPrimary
  },
  data() {
    return {
      userEmail: ""
    };
  },
  methods: {
    ...mapActions(["changeEmail"]),
    setUserEmail(e) {
      this.changeEmail(e.target.value);
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