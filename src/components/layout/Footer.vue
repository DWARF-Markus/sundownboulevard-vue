<template>
	<footer className="black white-text">
		<div className="pt-2">
			<p className="footer-title mt-1">LINKS</p>
			<ul>
				<li>
					<a href="#!" className="footer-entry">
						BOOK
					</a>
				</li>
				<li>
					<a href="#!" className="footer-entry">
						NEWSLETTER
					</a>
				</li>
				<li>
					<a href="#!" className="footer-entry">
						PRODUCTS
					</a>
				</li>
				<li>
					<a href="#!" className="footer-entry">
						RESTUARANTS
					</a>
				</li>
			</ul>
		</div>
		<div className="footer-mid pt-2">
			<img
				className="mt-1"
				src="../../assets/beach-blackwhite.svg"
				alt="Sundown Boulevard logo"
			/>
			<p className="logo-text white-text">SUNDOWN BOULEVARD</p>
			<div className="mt-1">
				<p>
					Bernhard Bangs Allé 25 <br />
					Frederiksberg <br />
					Denmark
				</p>
			</div>
		</div>
		<div className="pt-2">
			<p className="footer-title mt-1">POLICIES</p>
			<ul>
				<li>
					<a href="#!" className="footer-text">
						PRIVACY
					</a>
				</li>
				<li>
					<a href="#!" className="footer-text">
						COOKIES
					</a>
				</li>
				<li>
					<a href="#!" className="footer-text">
						CONTACT
					</a>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
};
</script>

<style lang="scss" scoped>
footer {
	height: auto;
	display: grid;
	order: 1;
	grid-template-columns: 1fr;

	div {
		text-align: center;
		margin: 20px;

		ul {
			list-style: none;

			li {
				padding: 5px 0;
				a {
					color: rgb(255, 255, 255);
					font-weight: 400;
					transition: 0.2s ease;
					text-decoration: none;
				}

				a:hover {
					color: rgba(255, 255, 255, 0.555);
				}
			}
		}
	}
}

.footer-mid {
	order: -1;
	img {
		max-width: 50px;
	}
	div {
		p {
			font-weight: 100;
			color: white;
			font-size: 12px;
		}
	}
}

.footer-title {
	font-weight: 100;
	color: white;
	font-size: 10px;
	cursor: default;
}

@media (min-width: 630px) {
	footer {
		grid-template-columns: 1fr 1fr 1fr;
	}
	.footer-mid {
		order: 0;
	}
}
</style>
