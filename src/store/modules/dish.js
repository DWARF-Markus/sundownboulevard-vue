const state = {
	dish: {},
};

const getters = {
	getDish: (state) => state.dish,
};

const actions = {
	fetchDish({ commit }) {
		fetch('https://krh-sundown.dev.dwarf.dk/api/user/dishes?guestCount=1', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				commit('setDish', data[0].meals[0]);
			});
	},
};

const mutations = {
	setDish: (state, payload) => (state.dish = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
