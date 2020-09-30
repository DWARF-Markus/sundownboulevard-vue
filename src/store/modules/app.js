const state = {
	darkMode: false,
	error: false,
	loading: false,
	internetStatus: true,
	sidebarActive: false,
	step: 2,
};

const getters = {
	getStep: (state) => state.step,
	getInternetStatus: (state) => state.internetStatus,
	getSidebarActive: (state) => state.sidebarActive,
	getDarkMode: (state) => state.darkMode,
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
	changeDarkMode({ commit }, value) {
		commit('setDarkMode', value);
	},
};

const mutations = {
	setStep: (state, payload) => (state.step = payload),
	setInternetConnection: (state, payload) => (state.internetStatus = payload),
	setSidebarActive: (state, payload) => (state.sidebarActive = payload),
	setDarkMode: (state, payload) => (state.darkMode = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
