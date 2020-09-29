<template>
	<div class="timeline-banner-container">
		<div class="mobile-timeline-banner blue px-1">
			<div class="back-button">
				<Button @click="handleHomeClick">
					<i class="fa fa-chevron-left"></i>
				</Button>
			</div>
			<h4 class="white-text text-center">
				{{ data[getStep - 1].bannerTitle }}
			</h4>
			<h4 class="current-step-number white-text">
				<span>{{ getStep }}</span> /
				<span>5</span>
			</h4>
		</div>
		<div class="desktop-wrapper">
			<div class="timeline-container">
				<transition name="fade">
					<div class="timeline">
						<div
							class="timeline-wrapper"
							:class="{ 'timeline-wrapper--disabled': getStep === 5 }"
						>
							<div :style="{ width: getWidth + '%' }" class="bar"></div>
							<div class="icons">
								<div
									class="timeline-entry"
									:class="{
										'timeline-entry--active':
											getStep === entry.step && getStep !== 5,
										'timeline-entry--done':
											getStep >= entry.step || getStep === 5,
									}"
									@click="handleNewStep(entry.step)"
									v-for="entry in data"
									v-bind:key="entry.step"
								>
									<div class="icon">
										<transition name="slide" mode="out-in" appear>
											<i
												:class="[
													getStep > entry.step || getStep === 5
														? 'fa fa-check blue-text done'
														: getStep === entry.step
														? 'fa fa-circle blue-text'
														: 'fa fa-circle blue-text',
												]"
											></i>
										</transition>
									</div>
									<div class="title">
										<span>{{ entry.timelineTitle }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<div class="banner-wrapper">
				<h4
					class="headline-timeline mt-1 white-text"
					:class="{ 'headline-timeline--loading': loading }"
				>
					{{ title }}
				</h4>
				<p
					class="banner-text mt-1 white-text"
					:class="{ 'banner-text--loading': loading }"
				>
					{{ desc }}
				</p>
			</div>
		</div>
	</div>
	<p
		v-if="getBookingType === 'updateBooking'"
		class="blue-text text-center mt-1 fadein-anim"
	>
		You are currently updating a booking by {{ getEmail }}
	</p>
</template>

<script>
import data from './Timeline/timeline-data.json';
import Button from './Button';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'TimelineTwo',
	components: {
		Button,
	},
	data() {
		return {
			data: data,
			width: null,
			barWidth: this.getWidth,
			showLine: false,
			title: null,
			desc: null,
			loading: false,
			style: {
				width: this.getWidth,
			},
		};
	},
	computed: {
		...mapGetters(['getStep', 'getSelectedDrinks']),
		getWidth() {
			return (this.getStep - 1) * 25;
		},
	},
	created() {
		this.width = window.innerWidth;
		this.style.width = this.getStep * 20;
		this.title = this.data[this.getStep - 1].bannerTitle;
		this.desc = this.data[this.getStep - 1].bannerDesc;
	},
	methods: {
		...mapActions(['changeStep']),
		handleNewStep(e) {
			if (e === 1 || e === 5) {
				this.$emit('error', 'You cannot skip to this step');
			} else if (e === 4 && this.getSelectedDrinks.length === 0) {
				this.$emit('error', 'Please choose at least one drink');
				this.$router.push('/order/drinks');
			} else {
				this.loading = true;

				setTimeout(() => {
					this.title = this.data[this.getStep - 1].bannerTitle;
					this.desc = this.data[this.getStep - 1].bannerDesc;
					this.loading = false;
				}, 450);
				this.changeStep(e);
				this.$router.push(this.data[e - 1].url);
			}
		},
	},
	watch: {
		getStep() {
			this.loading = true;
			setTimeout(() => {
				this.title = this.data[this.getStep - 1].bannerTitle;
				this.desc = this.data[this.getStep - 1].bannerDesc;
				this.loading = false;
			}, 450);
		},
	},
};
</script>

<style lang="scss" scoped>
$green: rgb(17, 139, 17);
$blue: #007ddb;

.fade {
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.1s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
}

.slide {
	&-enter-active,
	&-leave-active {
		transition: opacity 0.1s ease;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}

.timeline-entry {
	background-color: white;
	text-align: center;
	cursor: pointer;

	.icon {
		i {
			color: lightblue !important;
		}
	}

	.title {
		span {
			color: lightblue !important;
			transition: 0.2s ease;
			-webkit-user-select: none; /* Safari */
			-moz-user-select: none; /* Firefox */
			-ms-user-select: none; /* IE10+/Edge */
			user-select: none; /* Standard */
		}
	}

	&--done {
		.icon {
			i {
				color: lightblue !important;
			}
		}

		.title {
			span {
				color: lightblue !important;
			}
		}
	}

	&--active {
		.icon {
			i {
				color: $blue !important;
			}
		}
		.title {
			span {
				color: $blue !important;
				transform: translateX(10px);
			}
		}
	}

	&:hover {
		opacity: 1;
		.icon {
			i {
				color: $blue !important;
			}
		}

		.title {
			span {
				color: $blue !important;
				transition: 0.2s ease;
			}
		}
	}
}

.timeline-entry:first-of-type,
.timeline-entry:last-of-type {
	// pointer-events: none;
	span {
		margin-top: 4px !important;
		color: black;
	}

	&:hover {
		cursor: default !important;
		transform: none !important;

		.title {
			span {
				color: lightblue !important;
			}
		}

		.icon {
			i {
				color: lightblue !important;
			}
		}
	}
}

.timeline {
	display: flex;
	position: relative;
	width: 300px;

	.icons {
		position: absolute;
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin: 0;
		padding: 0;
	}

	.bar {
		border-bottom: 1px solid lightblue;
		z-index: -1;
		margin-top: 9.5px;
		position: absolute;
		transition: 0.6s ease-in-out;
	}

	.icon {
		i {
			transition: 0.2s;
			font-size: 12px;
		}

		.done {
			background-color: white;
		}
	}
	.title {
		text-align: center;

		span {
			font-size: 8px;
			color: #007ddb;
		}
	}
}

.mobile-timeline-banner {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
	height: 50px;
	align-items: center;

	h4 {
		font-size: 10px;
	}
}

.timeline-banner-container {
	position: fixed;
	width: 100%;
	z-index: 100;
	top: 50px;
}

.current-step-text {
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	opacity: 1;
	transition: 0.3s ease;
}

.current-step-text.loading {
	opacity: 0;
}

.banner-text {
	opacity: 1;
	transition: 0.25s ease;
	&--loading {
		opacity: 0;
	}
}

.headline-timeline {
	opacity: 1;
	transform: translateY(0px);
	transition: 0.4s ease;

	&--loading {
		opacity: 0;
		// transform: rotate3d(1, 0, 0, 90deg);
		transform: translateX(6px);
		// transform: translateY(6px);
	}
}

.current-step-number {
	text-align: right;
	text-transform: uppercase;
	font-size: 18px !important;
	font-weight: 100;
	span {
		font-weight: 600;
	}
}

@keyframes slidein {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.banner-wrapper {
	background: rgb(255, 255, 255);
	background: radial-gradient(
		circle,
		rgba(255, 255, 255, 0.7763480392156863) 0%,
		rgba(0, 125, 219, 0.8463760504201681) 0%,
		rgba(0, 171, 205, 0.76234243697479) 130%
	);
	text-align: center;
	margin-top: -20px;
	opacity: 1;
	animation-name: fadein;
	animation-duration: 1.2s;

	p {
		font-size: 12px;
		font-weight: 100;
		padding: 0 10%;
	}
}

@keyframes opacityInAnim {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.fadein-anim {
	animation-name: opacityInAnim;
	animation-duration: 2s;
}

.desktop-wrapper {
	display: none;
}

@keyframes slidein {
	0% {
		margin-top: -50px;
	}
	15% {
		margin-top: -50px;
	}
	100% {
		margin-top: 17px;
	}
}

.timeline-container {
	display: grid;
	justify-content: center;
	position: fixed;
	left: 0;
	right: 0;
	height: 58px;
	margin-top: 16px;
	padding-top: 11px;
	background-color: white;
	z-index: 1000;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.137);
	animation-name: slidein;
	animation-duration: 1.7s;
}

.timeline-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	max-width: 400px !important;

	&--disabled {
		pointer-events: none;
		opacity: 0.8;
	}
}

.timeline-wrapper:first-of-type(div)::before {
	content: '';
	border-bottom: 0px !important;
	z-index: 1000;
}

.timeline-entry:first-of-type::before {
	content: '';
	border-bottom: 0px;
	background-color: none;
	width: 0px;
}

@media (min-width: 300px) {
	.current-step-text {
		font-size: 14px;
	}

	.current-step-number {
		font-size: 24px;
	}
}

@media (min-width: 630px) {
	.mobile-timeline-banner {
		display: none;
	}

	.timeline-banner-container {
		position: relative;
		top: 0px;
	}

	.desktop-wrapper {
		display: block;
	}

	.banner-wrapper {
		min-height: 180px;
		max-height: 180px;
		padding: 78px 30px 0px 30px;

		h4 {
			font-weight: 600;
			font-size: 22px;
		}
	}
}
</style>
