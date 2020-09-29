<template>
	<div
		:class="{
			'error-container--disappear': disappear,
			'error-container--stay': stay,
			'error-container--blue': blue,
		}"
		class="error-container"
	>
		<p class="white-text"><i class="fa px-1" :class="icon" /> <slot></slot></p>
	</div>
</template>

<script>
export default {
	name: 'ErrorPopUp',
	props: {
		icon: { type: String },
		disappear: { type: Boolean, default: false },
		stay: { type: Boolean, default: false },
		blue: { type: Boolean, default: false },
	},
};
</script>

<style lang="scss" scoped>
@keyframes slidein {
	0% {
		transform: translateX(20rem);
	}
	100% {
		transform: translateX(0rem);
	}
}

@keyframes slideinout {
	0% {
		transform: translateX(20rem);
	}
	10% {
		transform: translateX(0rem);
	}
	90% {
		transform: translateX(0rem);
	}
	100% {
		transform: translateX(20rem);
	}
}

.error-container {
	position: fixed;
	display: flex;
	height: 4rem;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	bottom: 6rem;
	pointer-events: none;
	right: 0;
	align-items: center;
	width: auto;
	padding: 0 0.5rem;
	transform: translateX(20rem);
	background: #a12125ec;
	border-left: 5px solid #911a1e;
	z-index: 10000;
	transition: 0.3s ease;

	&--disappear {
		animation: slideinout 4s ease forwards !important;
	}

	&--stay {
		animation: slidein 0.3s ease forwards;
	}

	&--blue {
		background: #007ddb;
		border-left: 5px solid #00589b;
	}

	i {
		font-size: 18px;
	}

	p {
		font-size: 14px;
	}
}
</style>
