<template>
	<div class="receipt-container">
		<div class="receipt">
			<h3 class="mt-1 logo-text blue-text">RECEIPT</h3>
			<div class="order-items">
				<p>
					{{ getPeopleAmount }} x
					<span>{{ getDish.strMeal }}</span>
				</p>
				<p v-for="(value, key) in drinksSummary" v-bind:key="key">
					{{ value }} x
					<span>{{ key }}</span>
				</p>
			</div>
			<div class="divider"></div>
			<div class="order-details">
				<p>
					Email
					<span>{{ getEmail }}</span>
				</p>
				<p>
					Date and time
					<span>{{ getDate }} @ {{ getTime }}</span>
				</p>
				<p>
					Guests
					<span>{{ getPeopleAmount }}</span>
				</p>
			</div>
			<Button @click="handleHomeClick" rightIcon icon="fa-home" class="mt-2" big
				>HOME</Button
			>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/Button.vue';

export default {
	name: 'ReceiptDisplay',
	components: {
		Button,
	},
	methods: {
		...mapActions(['changeStep']),
		handleHomeClick() {
			this.$router.push('/');
		},
	},
	computed: {
		...mapGetters([
			'getDish',
			'getSelectedDrinks',
			'getEmail',
			'getPeopleAmount',
			'getDate',
			'getTime',
			'getDrinks',
		]),
		drinksSummary() {
			const drinkNames = [];

			const drinksToOutput = {};

			this.getSelectedDrinks.map((drink) => {
				drinkNames.push(this.getDrinks[drink - 1].name);
			});

			for (let i = 0; i < drinkNames.length; ++i) {
				if (!drinksToOutput[drinkNames[i]]) {
					drinksToOutput[drinkNames[i]] = 0;
					++drinksToOutput[drinkNames[i]];
				} else {
					++drinksToOutput[drinkNames[i]];
				}
			}

			return drinksToOutput;
		},
	},
	created() {
		if (this.getSelectedDrinks.length === 0) {
			this.$emit('error', 'Please choose at least one drink');
			this.$router.push('/order/drinks');
		}

		if (this.getDish.idMeal === undefined) {
			this.$emit('error', 'Please choose a dish');
			this.$router.push('/order/dish');
		}

		this.changeStep(5);
	},
	updated() {
		console.log(this.getDrinks);
	},
};
</script>

<style lang="scss" scoped>
.receipt-container {
	padding: 50px 10px 0px;
	text-align: center;
	align-items: center;
	justify-content: center;
	min-height: 46rem;
}

@keyframes fadein {
	0% {
		transform: translateY(-50px);
		opacity: 0;
	}
	20% {
		opacity: 1;
	}
	100% {
		transform: translateY(0px);
	}
}

.receipt {
	margin: 20px 0;
	box-shadow: 0 4px 6px rgba(32, 32, 32, 0.178);
	max-width: 570px;
	background-color: white;
	width: 100%;
	padding: 25px;
	border-radius: 5px;
	display: grid;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	animation-name: fadein;
	animation-duration: 2s;

	h3 {
		font-size: 22px;
		font-weight: 800;
	}

	p {
		margin: 5px;
		font-size: 17px;
		font-weight: 100;
		text-align: left;
		// font-style: italic;
		color: #007ddb;
		span {
			padding-left: 0px;
			font-weight: 400;
			font-size: 13px;
			color: #343434;
		}
	}
}
</style>
