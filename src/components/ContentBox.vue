<template>
	<div class="content-box-container pt-3">
		<div class="col m-2">
			<i class="fa fa-paper-plane red-text"></i>
			<h4 class="mt-1">Book table</h4>
			<p>
				Have a lovely dining experience at our beautiful location in Copenhagen.
			</p>
		</div>
		<div class="col m-2">
			<i class="fa fa-comment red-text"></i>
			<h4 class="mt-1">Choose drinks and dish</h4>
			<p>
				We have probably the largest menu on the planet. Choose a random dish
				from our massive menu and one of our freshly brewed beers.
			</p>
		</div>
		<div class="col m-2">
			<i class="fa fa-heart red-text"></i>
			<h4 class="mt-1">Enjoy!</h4>
			<p>
				Finally, enjoy a very nice time at Sundown Boulevard! We look forward to
				welcoming you!
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContentBox',
};
</script>

<style lang="scss" scoped>
.content-box-container {
	position: relative;
	text-align: center;
	display: grid;
	grid-template-columns: 1fr;

	i {
		font-size: 38px;
	}

	h4 {
		font-weight: 400;
		text-transform: uppercase;
		font-size: 11px !important;
	}

	p {
		font-size: 14px;
	}

	.small-text {
		font-style: italic;
		font-size: 11px;
		padding: 5px;
	}
}

.content-box-container:before {
	content: '';
	position: absolute;
	z-index: -1;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: url('../assets/food-image4.jpg');
	background-repeat: no-repeat;
	background-position: center;
	object-fit: cover;

	opacity: 0.15;
}

@media (min-width: 860px) {
	.content-box-container {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>
