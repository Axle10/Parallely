import state from './state'
export default {
	setUser({},payload) {
		if(payload!=null && payload!=undefined && payload != {})
		{
			state.user.provider = payload.providerData[0].providerId
			state.user.email = payload.email
			if(state.user.provider=="facebook.com")
			{
				state.user.emailVerified=true
			}
			else
			{
				state.user.emailVerified = payload.emailVerified
			}
			state.user.displayName = payload.displayName
			state.user.photoURL = payload.photoURL
			state.user.phoneNumber = payload.phoneNumber
			state.user.uid = payload.uid
		}
	}
}
