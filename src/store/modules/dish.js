const state = {
	dish: {},
	loadingDish: false,
};

const getters = {
	getDish: (state) => state.dish,
	getDishLoading: (state) => state.loadingDish,
};

const actions = {
	async fetchDish({ commit }) {
		commit('setDishLoading', true);
		await fetch(
			'https://krh-sundown.dev.dwarf.dk/api/user/dishes?guestCount=1',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				const parsed = JSON.stringify(data[0].meals[0]);

				const id = data[0].meals[0].idMeal;

				if (localStorage.getItem(`dish-${id}`)) {
					localStorage.setItem(`dish-${id}`, [parsed]);
				} else {
					localStorage.setItem(`dish-${id}`, [parsed]);
				}

				setTimeout(() => {
					commit('setDish', data[0].meals[0]);
					commit('setDishLoading', false);
				}, 470);
			});
	},
	fetchLocalStorageDish({ commit }) {
		let localStorageDishes = [];

		for (let dish in localStorage) {
			if (dish.includes('dish-')) {
				localStorageDishes.push(dish);
			}
		}

		const localStorageDishesObjs = localStorageDishes.map((dish) => {
			return JSON.parse(localStorage.getItem(dish));
		});

		console.log(localStorageDishesObjs);

		commit(
			'setDish',
			localStorageDishesObjs[
				Math.floor(Math.random() * localStorageDishesObjs.length)
			]
		);
	},
	async changeDish({ commit }, id) {
		await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then((res) => res.json())
			.then((data) => {
				commit('setDish', data.meals[0]);
			});
	},
};

const mutations = {
	setDish: (state, payload) => (state.dish = payload),
	setDishLoading: (state, payload) => (state.loadingDish = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
