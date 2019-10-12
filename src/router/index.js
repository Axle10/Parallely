import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Home from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'

Vue.use(Router)

const router = new Router({
  routes: [
    	{
			path: '/',
			name: 'Index',
			component: Home
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			meta: {
				requiresAuth: true
			}
		}
	],
	mode: 'history'
})

// Below code is not working

// router.beforeEach((to,from,next) => {
// 	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
// 	const isAuthenticated = firebase.auth().currentUser
// 	if(requiresAuth && !isAuthenticated)
// 	{
// 		next('/')
// 	}
// 	else
// 	{
// 		next()
// 	}
// })

export default router
