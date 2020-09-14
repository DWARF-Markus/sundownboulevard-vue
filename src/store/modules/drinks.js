const state = {
	allDrinks: [],
	selectedDrinks: [],
};

const getters = {
	getDrinks: (state) => state.allDrinks,
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
};

const mutations = {
	setDrinks: (state, payload) => (state.allDrinks = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
