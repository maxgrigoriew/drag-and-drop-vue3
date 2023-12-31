import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from './pages/HomePage.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: HomePage,
		meta: {
			layout: 'Layout',
		},
	},
];

export const router = new VueRouter({
	routes,
	mode: 'history',
});
