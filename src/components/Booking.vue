<template>
	<div class="booking-entry m-1 p-1">
		<h4 class="booking-id blue-text mt-1">#{{ data.id }}</h4>
		<p class="mt-1 text-center">
			START
			<br />
			<span>{{ data.startTime }}</span>
		</p>
		<p class="mt-1 text-center">
			END
			<br />
			<span>{{ data.endTime }}</span>
		</p>
		<p class="mt-1 text-center">
			PEOPLE
			<br />
			<span>{{ data.numberOfPeople }}</span>
		</p>
		<div class="text-right">
			<Button @click="handleBookingSelect" class="mt-1">UPDATE</Button>
		</div>
	</div>
</template>

<script>
import Button from '@/components/Button.vue';
import { mapActions } from 'vuex';

export default {
	name: 'Booking',
	components: {
		Button,
	},
	props: {
		data: { type: Object },
	},
	methods: {
		...mapActions([
			'changeType',
			'changeDish',
			'changeSelectedDrinks',
			'changeDate',
			'changeTime',
			'changePeopleAmount',
			'changeBookingId',
			'changeStep',
		]),
		handleBookingSelect() {
			const drinksArray = this.data.drinks.map((drink) =>
				parseInt(drink.externalDrinkId)
			);

			this.changeDish(this.data.dishes[0].externalDishId);
			this.changeSelectedDrinks(drinksArray);
			this.changeDate(this.data.startTime.split(' ')[0]);
			this.changeTime(this.data.startTime.split(' ')[1]);
			this.changePeopleAmount(this.data.numberOfPeople);
			this.changeBookingId(this.data.id);

			this.changeStep(2);
			this.changeType('updateBooking');
			this.$router.push('/order/dish');
		},
	},
};
</script>

<style lang="scss" scoped>
.booking-entry {
	background-color: rgba(207, 207, 207, 0.253);
	display: grid;
	grid-template-columns: 1fr;
	h3 {
		color: #007ddb !important;
	}

	p {
		font-size: 9px;
		color: #007ddb;

		span {
			color: #343434;
			font-weight: 200;
			font-size: 15px;
		}
	}
}

@media (min-width: 650px) {
	.booking-entry {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
}
</style>
