<template>
	<div id="app">
		<Navbar />
		<div class="page-wrapper">
			<transition name="page" mode="out-in" appear>
				<router-view />
			</transition>
		</div>
		<Footer />
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
	name: 'App',
	components: {
		Navbar,
		Footer,
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
	background-color: $red;
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

// CHANGES FOR IPAD AND DESKTOP

@media (min-width: 630px) {
	.page-wrapper {
		padding: 70px 10px 0 10px;
	}
}
</style>
