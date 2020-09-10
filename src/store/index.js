import { createStore } from 'vuex';
import booking from './modules/booking';
import dish from './modules/dish';
import drinks from './modules/drinks';

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		booking,
		dish,
		drinks,
	},
});
