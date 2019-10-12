import state from './state'
export default {
	setUser({},payload) {
		state.user.email = payload.email
		state.user.emailVerified = payload.emailVerified
		state.user.displayName = payload.displayName
		state.user.photoURL = payload.photoURL
		state.user.phoneNumber = payload.phoneNumber
		state.user.uid = payload.uid
	}
}
