<template>
  <div id="nav">
    <nav class="navbar-container white">
      <div class="navbar-wrapper">
        <div class="navbar-logo">
          <img src="../../assets/beach.svg" />
          <p class="logo-text">SUNDOWN BOULEVARD</p>
        </div>
        <div class="navbar-mobile-menu">
          <div
            v-bind:class="{ 'nav-active': active }"
            class="nav-mobile-bars"
            v-on:click="toggleNav"
          >
            <div class="bar1" />
            <div class="bar2" />
            <div class="bar3" />
          </div>
        </div>
        <div class="nav-links">
          <ul>
            <li class="nav-entry nav-active pt-1 mx-1">
              <router-link to="/">BOOK</router-link>
            </li>
            <li class="nav-entry pt-1">
              <a class="black-text mx-1" href="#!">
                <router-link to="/globalstate">NEWSLETTER</router-link>
              </a>
            </li>
            <li class="nav-entry pt-1">
              <a class="black-text mx-1" href="#!">PRODUCTS</a>
            </li>
            <li class="nav-entry pt-1">
              <a class="black-text mx-1" href="#!">RESTAURANTS</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-bind:class="{ 'nav-active': active }" class="nav-mobile-links white px-1">
        <h1 class="logo-text mt-1">SUNDOWN BOULEVARD</h1>
        <ul v-on:click="toggleNav">
          <li class="nav-mobile-entry nav-active pt-1">
            <router-link to="/">BOOK</router-link>
          </li>
          <li class="nav-mobile-entry pt-1">
            <a class="black-text" href="#!">
              <router-link to="/globalstate">NEWSLETTER</router-link>
            </a>
          </li>
          <li class="nav-mobile-entry pt-1">
            <a class="black-text" href="#!">PRODUCTS</a>
          </li>
          <li class="nav-mobile-entry pt-1">
            <a class="black-text" href="#!">RESTAURANTS</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggleNav() {
      this.active = !this.active;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-container {
  align-items: center;
  justify-content: center;
  height: 50px;
  position: fixed;
  width: 100%;
  z-index: 200;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.137);
}

.nav-links {
  display: none;
}

.navbar-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  max-width: 1220px;
  margin: 0 auto;
}

.navbar-logo {
  display: flex;
  padding: auto;

  p {
    display: grid;
    align-items: center;
    padding-left: 4px;
    font-size: 10px !important;
  }
}

.navbar-logo img {
  width: 23px;
  margin-top: 3px;
}

.navbar-mobile-menu {
  text-align: right;
  justify-items: right;
  align-items: center;
  display: grid;
}

.nav-mobile-bars {
  .bar1,
  .bar2,
  .bar3 {
    background-color: #393939;
    width: 20px;
    height: 3px;
    margin: 3px 0 0;
    transition: 0.15s ease;
  }
}

.nav-mobile-bars.nav-active {
  .bar1 {
    background-color: #ba2329;
    transform: translateY(6px) rotate(45deg);
    -webkit-transform: translateY(6px) rotate(45deg);
  }
  .bar2 {
    opacity: 0;
  }
  .bar3 {
    background-color: #ba2329;
    transform: translateY(-6px) rotate(-45deg);
    -webkit-transform: translateY(-6px) rotate(-45deg);
  }
}

.nav-mobile-bars:before {
  content: none;
}
.nav-mobile-entry:before {
  content: none;
}

.nav-mobile-links {
  max-height: 0px;
  margin-top: -4px;
  overflow: hidden;
  text-align: center;
  transition: 0.55s;
  opacity: 1;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.2);
}

.nav-mobile-links ul,
.nav-links ul {
  list-style: none;
}

.nav-mobile-links.nav-active {
  max-height: 100vh;
}

.nav-mobile-entry {
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 200;
  font-size: 14px;
  text-align: left;
  a {
    text-decoration: none;
    color: black;
  }
}

.nav-mobile-entry.nav-active {
  font-weight: 800;
  font-size: 14px;
}

@media (min-width: 630px) {
  .nav-mobile-links,
  .navbar-mobile-menu {
    display: none;
  }

  .navbar-container {
    height: 70px;
  }

  .nav-links {
    display: block;
  }

  .nav-links ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: right;
    align-items: center;
  }

  .nav-entry {
    font-family: "Helvetica Neue", sans-serif;
    font-weight: 200;
    font-size: 14px;
    a {
      text-decoration: none;
    }
  }

  .nav-entry.nav-active {
    font-weight: 800;
    a {
      color: #ba2329 !important;
    }
  }

  .navbar-logo img {
    width: 50px;
    margin-top: 0px;
  }
}
</style>
