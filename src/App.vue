<template>
	<div id="app">
		<Navbar />
		<div class="page-wrapper">
			<transition name="page" mode="out-in" appear>
				<router-view />
			</transition>
			<ErrorPopUp v-if="!getInternetStatus" stay icon="fa-exclamation-triangle"
				>No internet detected!</ErrorPopUp
			>
		</div>
		<Footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/layout/Navbar.vue';
import ErrorPopUp from '@/components/ErrorPopUp.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
	name: 'App',
	components: {
		Navbar,
		ErrorPopUp,
		Footer,
	},
	computed: {
		...mapGetters(['getInternetStatus']),
	},
	methods: {
		...mapActions(['changeInternetStatus']),
		updateOnlineStatus(e) {
			const { type } = e;

			if (type === 'online') {
				this.changeInternetStatus(true);
			} else {
				this.changeInternetStatus(false);
			}
		},
	},
	mounted() {
		window.addEventListener('online', this.updateOnlineStatus);
		window.addEventListener('offline', this.updateOnlineStatus);
	},
	beforeUnmount() {
		window.removeEventListener('online', this.updateOnlineStatus);
		window.removeEventListener('offline', this.updateOnlineStatus);
	},
};
</script>

<style lang="scss">
// BASIC STYLING
$black: #393939;
$red: #ba2329;
$blue: #007ddb;
$dark-gray: #e1e1e1;
$light-gray: #f3f3f3;
$white: #ffffff;

*,
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
}

.page-wrapper {
	padding-top: 50px;
	max-width: 1220px;
	margin: 0 auto;
}

// TRANSITIONS

.page {
	&-enter-active,
	&-leave-active {
		transition: opacity 0.5s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}

// FONTS

.logo-text {
	font-family: 'Helvetica Neue', sans-serif;
	font-weight: 200;
	font-size: 14px;
	color: $red;
	opacity: 0.8;
}

html,
body {
	font-family: 'Helvetica Neue', sans-serif;
}

p {
	color: $black;
	font-weight: 200;
	font-size: 15px;
}

h1 {
	color: $black;
	font-weight: 800;
}

h3 {
	color: $black;
	font-size: 22px;
}

h4 {
	color: $black;
}

// COLORS

.black {
	background-color: $black;
}

.red {
	background-color: $red !important;
}

.blue {
	background-color: $blue;
}

.dark-gray {
	background-color: $dark-gray;
}

.light-gray {
	background-color: $light-gray;
}

.white {
	background-color: $white;
}

.black-text {
	color: $black !important;
}

.red-text {
	color: $red !important;
}

.blue-text {
	color: $blue !important;
}

.dark-gray-text {
	color: $dark-gray;
}

.light-gray-text {
	color: $light-gray;
}

.white-text {
	color: $white;
}

// MARGINS & PADDINGS

.m-1 {
	margin: 1rem;
}

.m-2 {
	margin: 2rem;
}

.mt-1 {
	margin: 1rem 0;
}

.mt-2 {
	margin: 2rem 0;
}

.mx-1 {
	margin: 0 1rem;
}

.p-1 {
	padding: 1rem;
}

.p-2 {
	padding: 1rem;
}

.pt-1 {
	padding: 1rem 0;
}

.pt-2 {
	padding: 2rem 0;
}

.pt-3 {
	padding: 3rem 0;
}

.px-1 {
	padding: 0 1rem;
}

.px-2 {
	padding: 0 2rem;
}

.px-3 {
	padding: 0 3rem;
}

.divider {
	width: 100%;
	border-bottom: 1px solid rgba(184, 180, 180, 0.226);
	margin: 20px 0;
}

.text-right {
	text-align: right;
}

.text-left {
	text-align: left;
}

.text-center {
	text-align: center;
}

// CHANGES FOR IPAD AND DESKTOP

@media (min-width: 630px) {
	.page-wrapper {
		padding: 70px 0px 0 0px;
	}
}
</style>
