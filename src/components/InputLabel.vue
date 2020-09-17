<template>
	<div class="text-left">
		<label :v-model="value" v-bind:for="name">{{ text }}</label>
		<input
			v-model="value"
			@input="updateValue"
			:id="name"
			:name="name"
			:type="inputType"
		/>
	</div>
</template>

<script>
export default {
	name: 'InputLabel',
	props: {
		inputType: String,
		text: String,
		name: String,
	},
	methods: {
		updateValue() {
			this.$emit(this.value);
		},
	},
};
</script>

<style lang="scss">
.input-pair {
	display: grid;
}

.input-pair label {
	text-transform: uppercase;
	font-size: 10px;
	text-align: left;
	font-weight: 600;
	color: #343434;
	margin: 4px 1px;
}

.input-pair input {
	border: 1px solid darkgray;
	border-radius: 3px;
	padding: 5px;
	width: 100%;
	transition: 0.14s ease;
	margin-top: 5px;
}

.input-pair.disabled label {
	color: #343434;
	pointer-events: none;
	opacity: 0.6;
}

.input-pair.disabled input {
	border: 1px solid darkgray;
	pointer-events: none;
	opacity: 0.6;
}

input:focus {
	outline: none;
}

.input-pair input:focus {
	border: 1px solid #343434;
}
</style>
