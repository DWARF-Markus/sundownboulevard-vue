<template>
  <button
    class="button"
    :class="{'button--small': small , 'button--disabled':disabled, 'button--big' : big, 'button--secondary' : secondary, 'button--backBtn' : backBtn}"
  >
    <i v-if="leftIcon" class="fa blue-text" :class="icon" />
    <slot></slot>
    <i v-if="rightIcon" class="fa" :class="icon" />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    backBtn: { type: Boolean, default: false },
    big: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    icon: { type: String },
    leftIcon: { type: Boolean, default: false },
    rightIcon: { type: Boolean, default: false },
    secondary: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  }
};
</script>

<style lang="scss" scoped>
.button {
  opacity: 0.9;
  background-color: #007ddb;
  // box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09), 0 4px 6px rgba(0, 0, 0, 0.13);
  border: none;
  border-radius: 4px;
  color: white;
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 800;
  outline: none;
  padding: 9px 20px;
  transition: 0.12s ease;

  &--small {
    padding: 5px 10px;
  }

  &--big {
    padding: 12px 30px !important;
  }

  &--disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  &--secondary {
    background-color: #ba2329;
  }

  &--backBtn {
    background-color: white;
    border: none;
    border-radius: 4px;
    color: #007ddb;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: 800;
    margin: 5px 0;
    outline: none;
    padding: 7px 2px;
    transition: 0.12s ease;
    i {
      margin: 0 4px;
      transition: 0.12s ease;
    }
    :hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.19), 0 4px 6px rgba(0, 0, 0, 0.23);
      transform: scale(1.03);
    }
    :active {
      transform: scale(0.97);
      box-shadow: none;
    }
    @media (min-width: 630px) {
      font-size: 12px;
      padding: 7px 20px;
    }
  }

  i {
    padding-left: 4px;
  }
}

.button:hover {
  opacity: 1;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.19), 0 4px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
}
</style>