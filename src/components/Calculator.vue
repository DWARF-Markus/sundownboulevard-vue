<template>
	<div class="calculator">
		<p>{{ x }}</p>
		<p>+</p>
		<p>{{ y }}</p>
		<input v-model="guess" placeholder="What is the result?" />
		<button @click="random">refresh</button>
		<button @click="check">check</button>
		<p>{{ message }}</p>
	</div>
</template>

<script>
export default {
	name: 'Calculator',
	data() {
		return {
			x: null,
			y: null,
			guess: null,
			message: 'Take a guess!',
		};
	},
	methods: {
		check() {
			if (this.x + this.y === parseInt(this.guess)) {
				this.message = 'Correct!';
			} else {
				this.message = 'Wrong :(';
			}
		},
		random() {
			this.x = Math.ceil(Math.random() * 100);
			this.y = Math.ceil(Math.random() * 100);
		},
	},
	created() {
		this.x = Math.ceil(Math.random() * 100);
		this.y = Math.ceil(Math.random() * 100);
	},
};
</script>

<style lang="scss" scoped></style>
