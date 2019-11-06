import firebase from 'firebase'
export default {
	callSetUser({commit},payload) {
		commit('setUser',payload)
	},
	callSetPhonenumber({ commit }, payload) {
		commit('SET_PHONE_NUMBER',payload)
	},
	callSetName({ commit }, payload) {
		commit('SET_NAME',payload)
	},
	checkUserExistence({ commit,dispatch }, payload) {
		var firestore = firebase.firestore();
		var userDocRef = firestore.doc(`users/${payload.uid}`)
		userDocRef.get().then((doc) => {
			if(!doc.exists)
			{
				dispatch('createUserInDb',payload)
			}
		})
	},
	createUserInDb({ commit }, payload) {
		var firestore = firebase.firestore();
		var userRef = firestore.collection('users')
		userRef.doc(`${payload.uid}`).set({
			uid: payload.uid,
			email: payload.email,
			name: payload.displayName,
			connections: new Array(),
			bio: '',
			photoURL: payload.photoURL
		}).then(() => {}).catch((err) => console.log(err))
	}
}
