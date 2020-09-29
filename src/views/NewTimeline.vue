<template>
	<div class="timeline-test-container mt-2 text-center">
		<TimelineTwo />
		<Calculator />
	</div>
</template>

<script>
import TimelineTwo from '@/components/TimelineTwo.vue';
import Calculator from '@/components/Calculator.vue';

export default {
	name: 'NewTimeline',
	components: {
		TimelineTwo,
		Calculator,
	},
};
</script>

<style lang="scss" scoped></style>
