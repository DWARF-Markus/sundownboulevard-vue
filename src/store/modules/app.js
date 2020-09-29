const state = {
	step: 2,
	loading: false,
	error: false,
	internetStatus: true,
};

const getters = {
	getStep: (state) => state.step,
	getInternetStatus: (state) => state.internetStatus,
};

const actions = {
	changeStep({ commit }, value) {
		commit('setStep', value);
	},
	changeInternetStatus({ commit }, value) {
		commit('setInternetConnection', value);
	},
};

const mutations = {
	setStep: (state, payload) => (state.step = payload),
	setInternetConnection: (state, payload) => (state.internetStatus = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
