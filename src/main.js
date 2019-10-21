// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import firebaseConfig from '../firebase/config'
import vuetify from '@/plugins/vuetify'
import vueParticles from 'vue-particles'
import store from '@/store/index'
import { mapActions } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(vueParticles)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store: store,
	router,
	vuetify,
	components: { App },
	template: '<App/>',
	created() {
		// Initialize firebase
		firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged((firebaseUser) => {
			if(firebaseUser!=null) {
				console.log('Current user')
				console.log(firebase.auth().currentUser)
				this.callSetUser(firebase.auth().currentUser)
			}
			else
			{
				this.callSetUser({})
			}
		})
	},
	methods: {
		...mapActions('user',['callSetUser'])
	}
})
