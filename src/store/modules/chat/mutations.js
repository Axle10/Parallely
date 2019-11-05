import state from './state'

export default {
	SET_FRIENDS({}, payload) {
		state.friends = payload
	},
	SET_FEATUREDFRIENDS({},payload) {
		state.featuredFriends = payload
	}
}
