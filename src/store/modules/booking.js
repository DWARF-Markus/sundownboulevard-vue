const state = {
	date: '',
	time: '',
	email: '',
	id: '',
	peopleAmount: 2,
	type: 'newBooking',
	bookings: [],
};

const getters = {
	getBookingType: (state) => state.type,
	getDate: (state) => state.date,
	getEmail: (state) => state.email,
	getTime: (state) => state.time,
	getPeopleAmount: (state) => state.peopleAmount,
	getBookingId: (state) => state.id,
	getMultipleBookings: (state) => state.bookings,
};

const actions = {
	changeType({ commit }, value) {
		commit('setType', value);
	},
	changeEmail({ commit }, value) {
		commit('setEmail', value);
	},
	changeDate({ commit }, value) {
		commit('setDate', value);
	},
	changeTime({ commit }, value) {
		commit('setTime', value);
	},
	changePeopleAmount({ commit }, value) {
		commit('setPeopleAmount', value);
	},
	changeBookingId({ commit }, value) {
		commit('setBookingId', value);
	},
	changeMultipleBookings({ commit }, value) {
		commit('setMultipleBookings', value);
	},
};

const mutations = {
	setType: (state, payload) => (state.type = payload),
	setEmail: (state, payload) => (state.email = payload),
	setDate: (state, payload) => (state.date = payload),
	setTime: (state, payload) => (state.time = payload),
	setPeopleAmount: (state, payload) => (state.peopleAmount = payload),
	setBookingId: (state, payload) => (state.id = payload),
	setMultipleBookings: (state, payload) => (state.bookings = payload),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
