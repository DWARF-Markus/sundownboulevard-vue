const state = {
	allDrinks: [],
	allDrinksLoaded: false,
	selectedDrinks: [],
};

const getters = {
	getDrinks: (state) => state.allDrinks,
	getDrinksLoaded: (state) => state.allDrinksLoaded,
	getSelectedDrinks: (state) => state.selectedDrinks,
};

const actions = {
	async fetchDrinks({ commit }) {
		commit('setDrinksLoaded', false);
		await fetch('https://krh-sundown.dev.dwarf.dk/api/user/all_drinks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				commit('setDrinks', data);

				const parsed = JSON.stringify(data);
				localStorage.setItem('drinks', parsed);

				setTimeout(() => {
					commit('setDrinksLoaded', true);
				}, 300);
			});
	},
	incrementDrink({ commit }, id, name) {
		commit('setIncrementDrink', parseInt(id), name);
	},

	decreaseDrink({ commit }, id) {
		commit('setDecreaseDrink', parseInt(id));
	},

	clearDrinks({ commit }) {
		commit('setClearDrinks');
	},

	changeSelectedDrinks({ commit }, arr) {
		commit('setSelectedDrinks', arr);
	},

	changeDrinks({ commit }, arr) {
		commit('setDrinks', arr);
		commit('setDrinksLoaded', true);
	},
};

const mutations = {
	setDrinks: (state, payload) => (state.allDrinks = payload),
	setIncrementDrink: (state, payload) =>
		(state.selectedDrinks = [...state.selectedDrinks, payload]),
	setDecreaseDrink: (state, payload) => {
		const index = state.selectedDrinks.indexOf(payload);

		state.selectedDrinks = [
			...state.selectedDrinks.slice(0, index),
			...state.selectedDrinks.slice(index + 1),
		];
	},
	setClearDrinks: (state) => (state.selectedDrinks = []),
	setSelectedDrinks: (state, payload) => (state.selectedDrinks = payload),
	setDrinksLoaded: (state, payload) => (state.allDrinksLoaded = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
