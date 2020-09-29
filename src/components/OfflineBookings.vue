<template>
	<div v-if="hasOfflineBookings" class="offline-booking-container mx-1">
		<p class="red-text">
			<i class="fa fa-exclamation-triangle px-1"></i>You have incomplete
			bookings!
		</p>
		<div class="offline-bookings p-1">
			<div
				class="mt-1"
				v-for="booking in offlineBookings"
				v-bind:key="booking.id"
			>
				<OfflineBooking @sent="onSent" :data="booking" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import OfflineBooking from '@/components/OfflineBooking.vue';

export default {
	name: 'OfflineBookings',
	components: {
		OfflineBooking,
	},
	data() {
		return {
			offlineBookings: [],
			hasOfflineBookings: false,
		};
	},
	created() {
		if (localStorage.getItem('offlineBookings') == null) {
			this.hasOfflineBookings = false;
		} else {
			const bookingsToOutput = JSON.parse(
				localStorage.getItem('offlineBookings')
			);

			this.offlineBookings = bookingsToOutput.filter(
				(booking) => booking.email === this.getEmail
			);

			if (this.offlineBookings.length > 0) {
				this.hasOfflineBookings = true;
			}
		}
	},
	methods: {
		onSent() {
			this.$emit('sent');

			setTimeout(() => {
				const bookingsToOutput = JSON.parse(
					localStorage.getItem('offlineBookings')
				);

				this.offlineBookings = bookingsToOutput.filter(
					(booking) => booking.email === this.getEmail
				);

				if (this.offlineBookings.length > 0) {
					this.hasOfflineBookings = true;
				}
			}, 500);
		},
	},
	computed: {
		...mapGetters(['getEmail']),
	},
	watch: {
		offlineBookings(value) {
			if (value.length === 0) {
				this.hasOfflineBookings = false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.offline-booking-container {
	margin: 0 0 1rem 0;
}
</style>
