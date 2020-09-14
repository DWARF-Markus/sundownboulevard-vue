const state = {
	step: 2,
	loading: false,
	error: false,
};

const getters = {
	getStep: (state) => state.step,
};

const actions = {
	changeStep({ commit }, value) {
		commit('setStep', value);
	},
};

const mutations = {
	setStep: (state, payload) => (state.step = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
