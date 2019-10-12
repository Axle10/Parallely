<template>
	<div>
		Profile page<br>
		{{user}}
		<div v-if="user.emailVerified">Email Verified</div>
		<div v-else>Email not Verified</div>
	</div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
	name: 'Profile',
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		...mapGetters('user',['isAuthenticated'])
	},
	mounted() {
		// if(this.isAuthenticated===false)
		// {
		// 	this.$router.replace('/')
		// }
	}
}
</script>

<style>

</style>
