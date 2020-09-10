const state = {
	datetime: '',
	email: '',
	id: '',
	peopleAmount: 2,
	type: 'newBooking',
};

const getters = {
	getBookingType: (state) => state.type,
	getEmail: (state) => state.email,
};

const actions = {
	changeType({ commit }, value) {
		commit('setType', value);
	},
	changeEmail({ commit }, value) {
		commit('setEmail', value);
	},
};

const mutations = {
	setType: (state, payload) => (state.type = payload),
	setEmail: (state, payload) => (state.email = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
