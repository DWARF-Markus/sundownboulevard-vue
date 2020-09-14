<template>
	<div class="home">
		<Slider />
		<EmailInput />
		<ContentBox />
	</div>
</template>

<script>
import Slider from '@/components/Slider.vue';
import EmailInput from '@/components/EmailInput.vue';
import ContentBox from '@/components/ContentBox.vue';

export default {
	name: 'Home',
	components: {
		Slider,
		EmailInput,
		ContentBox,
	},
	methods: {},
};
</script>
