<template>
  <footer
    class="footer white-text"
    :class="{ 'padding-bottom' : getStep !== 1, 'footer--dark' : getDarkMode }"
  >
    <div class="pt-2">
      <p class="footer-title mt-1">LINKS</p>
      <ul>
        <li>
          <a href="#!" class="footer-entry">BOOK</a>
        </li>
        <li>
          <a href="#!" class="footer-entry">NEWSLETTER</a>
        </li>
        <li>
          <a href="#!" class="footer-entry">PRODUCTS</a>
        </li>
        <li>
          <a href="#!" class="footer-entry">RESTUARANTS</a>
        </li>
      </ul>
    </div>
    <div class="footer-mid pt-2">
      <img class="mt-1" src="../../assets/beach-blackwhite.svg" alt="Sundown Boulevard logo" />
      <p class="logo-text white-text">SUNDOWN BOULEVARD</p>
      <div class="mt-1">
        <p>
          Bernhard Bangs Allé 25
          <br />Frederiksberg
          <br />Denmark
        </p>
      </div>
    </div>
    <div class="pt-2">
      <p class="footer-title mt-1">POLICIES</p>
      <ul>
        <li>
          <a href="#!" class="footer-text">PRIVACY</a>
        </li>
        <li>
          <a href="#!" class="footer-text">COOKIES</a>
        </li>
        <li>
          <a href="#!" class="footer-text">CONTACT</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["getStep", "getDarkMode"])
  }
};
</script>

<style lang="scss" scoped>
.padding-bottom {
  padding-bottom: 80px;
}

.footer {
  background-color: #393939;
  height: auto;
  display: grid;
  order: 1;
  grid-template-columns: 1fr;

  div {
    text-align: center;
    margin: 20px;

    ul {
      list-style: none;

      li {
        padding: 5px 0;
        a {
          color: rgb(255, 255, 255);
          font-weight: 400;
          transition: 0.2s ease;
          text-decoration: none;
        }

        a:hover {
          color: rgba(255, 255, 255, 0.555);
        }
      }
    }
  }

  &--dark {
    background-color: #222222;
  }
}

.footer-mid {
  order: -1;
  img {
    max-width: 50px;
  }
  div {
    p {
      font-weight: 100;
      color: white;
      font-size: 12px;
    }
  }
}

.footer-title {
  font-weight: 100;
  color: white;
  font-size: 10px;
  cursor: default;
}

@media (min-width: 630px) {
  footer {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .footer-mid {
    order: 0;
  }
}
</style>
