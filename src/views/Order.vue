<template>
	<div class="order-container">
		<TimelineTwo @error="throwError" />
		<div class="order-display-container">
			<router-view @error="throwError" />
			<ErrorPopUp disappear v-if="active" icon="fa-lightbulb" blue>{{
				errorText
			}}</ErrorPopUp>
		</div>
		<div class="order-nav">
			<TimelineButtons />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TimelineTwo from '@/components/TimelineTwo.vue';
import TimelineButtons from '@/components/Timeline/TimelineButtons.vue';
import ErrorPopUp from '@/components/ErrorPopUp.vue';

export default {
	name: 'Order',
	components: {
		TimelineTwo,
		TimelineButtons,
		ErrorPopUp,
	},
	data() {
		return {
			errorText: '',
			active: false,
		};
	},
	methods: {
		throwError(text) {
			this.errorText = text;
			this.active = true;

			setTimeout(() => {
				this.active = false;
			}, 4000);
		},
	},
	computed: { ...mapGetters(['getStep']) },
};
</script>

<style lang="scss" scoped>
.order-display-container {
	min-height: 37rem;
	display: grid;
	align-items: center;
}
</style>
