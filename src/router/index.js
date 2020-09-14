import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import GlobalState from '../views/GlobalState.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/order',
		name: 'Order',
		component: Order,
	},
	{
		path: '/globalstate',
		name: 'GlobalState',
		component: GlobalState,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
