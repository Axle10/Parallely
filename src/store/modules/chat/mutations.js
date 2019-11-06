import state from './state'

export default {
	SET_FRIENDS({}, payload) {
		state.friends = payload
	},
	SET_FEATURED_FRIENDS({},payload) {
		state.featuredFriends = payload
	},
	SET_FEATURED_MESSAGES({},payload) {
		state.featuredMessages[payload.index] = new Array()
		state.featuredMessages[payload.index]= payload.messages
	}
}
