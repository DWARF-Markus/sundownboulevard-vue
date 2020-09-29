<template>
	<div class="bookings-container">
		<div class="bookings-header px-1 m-1">
			<p>
				Your current bookings on
				<b>{{ getEmail }}</b>
			</p>
		</div>
		<div class="offline-bookings">
			<OfflineBookings @sent="onSent" />
		</div>
		<div v-for="booking in pageList" v-bind:key="booking.id">
			<Booking :data="booking" />
		</div>
		<div class="text-center pt-1 mt-1">
			<Button
				@click="loadList(page)"
				class="mx-1 px-1"
				:backBtn="page !== currentPage"
				v-for="page in numberOfPages"
				v-bind:key="page"
				>{{ page }}</Button
			>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import OfflineBookings from '@/components/OfflineBookings.vue';
import Booking from '@/components/Booking.vue';
import Button from '@/components/Button.vue';

export default {
	name: 'BookingDisplay',
	components: {
		OfflineBookings,
		Button,
		Booking,
	},
	data() {
		return {
			data: [],
			items: null,
			itemsPerPage: 10,
			currentPage: 1,
			numberOfPages: null,
			loading: true,
			pageList: [],
			offlineBookings: [],
		};
	},
	methods: {
		async onSent() {
			await fetch(
				`https://krh-sundown.dev.dwarf.dk/api/bookings?filter[email]=${this.getEmail}&include=drinks,dishes,drinks.drinkInfo&sort=startTime`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					this.pageList = data;
				});
		},
		loadList(e) {
			this.currentPage = e;
			let begin = (this.currentPage - 1) * this.itemsPerPage;
			let end = begin + this.itemsPerPage;

			this.pageList = this.getMultipleBookings.slice(begin, end);
		},
	},
	computed: {
		...mapGetters(['getMultipleBookings', 'getEmail']),
	},
	created() {
		this.items = this.getMultipleBookings.length;
		this.numberOfPages = Math.ceil(this.items / this.itemsPerPage);
		this.loadList(1);
	},
};
</script>

<style lang="scss" scoped>
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
