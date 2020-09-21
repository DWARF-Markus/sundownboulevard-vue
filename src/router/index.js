import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Bookings from '../views/Bookings.vue';
import Order from '../views/Order.vue';
import GlobalState from '../views/GlobalState.vue';
import NewTimeline from '../views/NewTimeline.vue';
import DishDisplay from '@/components/DishDisplay.vue';
import DrinksDisplay from '@/components/DrinksDisplay.vue';
import ConfirmDisplay from '@/components/ConfirmDisplay.vue';
import ReceiptDisplay from '@/components/ReceiptDisplay.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/bookings',
		name: 'Bookings',
		component: Bookings,
	},
	{
		path: '/order',
		name: 'Order',
		component: Order,
		children: [
			{
				path: 'dish',
				component: DishDisplay,
			},
			{
				path: 'drinks',
				component: DrinksDisplay,
			},
			{
				path: 'confirm',
				component: ConfirmDisplay,
			},
			{
				path: 'receipt',
				component: ReceiptDisplay,
			},
		],
	},
	{
		path: '/globalstate',
		name: 'GlobalState',
		component: GlobalState,
	},
	{
		path: '/newtimeline',
		name: 'NewTimeline',
		component: NewTimeline,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
