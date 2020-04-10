import state from './state'
export default  {
	isAuthenticated({}) {
		console.log(state.user);
		return (state.user !== null || state.user !== undefined || state.user!=={}) ? 0 : 1;
	}
}
