import state from './state'
export default  {
	isAuthenticated({}) {
		return state.user !== null && state.user !== undefined && state.user!=={}
	}
}
