import firebase from 'firebase'
export default {
	callSetUser({commit},payload) {
		commit('setUser',payload)
	},
	checkUserExistence({ commit,dispatch }, payload) {
		firebase.database().ref('users/' + payload.uid).once("value" , snapshot => {
			if(snapshot.exists())
			{
				//
			}
			else
			{
				dispatch('createUserInDb',payload)
			}
		})
	},
	createUserInDb({ commit }, payload) {
		firebase.database().ref('users/' + payload.uid).set({
			uid: payload.uid,
			email: payload.email,
			name: payload.displayName,
			connections: [],
			bio: ''
		})
	}
}
