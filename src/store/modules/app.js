const state = {
	step: 2,
	loading: false,
	error: false,
	internetStatus: true,
	sidebarActive: false,
};

const getters = {
	getStep: (state) => state.step,
	getInternetStatus: (state) => state.internetStatus,
	getSidebarActive: (state) => state.sidebarActive,
};

const actions = {
	changeStep({ commit }, value) {
		commit('setStep', value);
	},
	changeInternetStatus({ commit }, value) {
		commit('setInternetConnection', value);
	},
	changeSidebarToggle({ commit }, value) {
		commit('setSidebarActive', value);
	},
};

const mutations = {
	setStep: (state, payload) => (state.step = payload),
	setInternetConnection: (state, payload) => (state.internetStatus = payload),
	setSidebarActive: (state, payload) => (state.sidebarActive = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
