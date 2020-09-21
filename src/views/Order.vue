<template>
	<div class="order-container">
		<TimelineTwo />
		<div class="order-display-container">
			<router-view />
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

export default {
	name: 'Order',
	components: {
		TimelineTwo,
		TimelineButtons,
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
