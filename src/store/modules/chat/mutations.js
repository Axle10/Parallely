import state from './state'

export default {
	SET_FRIENDS({}, payload) {
		state.friends = payload
	}
}
