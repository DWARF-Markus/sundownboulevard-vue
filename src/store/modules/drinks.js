const state = {
	allDrinks: [],
	selectedDrinks: [],
};

const getters = {
	getDrinks: (state) => state.allDrinks,
	getSelectedDrinks: (state) => state.selectedDrinks,
};

const actions = {
	async fetchDrinks({ commit }) {
		await fetch('https://krh-sundown.dev.dwarf.dk/api/user/all_drinks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((data) => commit('setDrinks', data));
	},
	incrementDrink({ commit }, id) {
		commit('setIncrementDrink', parseInt(id));
	},

	decreaseDrink({ commit }, id) {
		commit('setDecreaseDrink', parseInt(id));
	},

	clearDrinks({ commit }) {
		commit('setClearDrinks');
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
};

export default {
	state,
	getters,
	actions,
	mutations,
};
