<template>
	<v-app>
		<!-- Profile page<br>
		{{user}}
		<div v-if="user.emailVerified">Email Verified</div>
		<div v-else>Email not Verified</div> -->
		<Header />
	</v-app>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import Header from '@/components/Header'
export default {
	name: 'Profile',
	components: {
		Header
	},
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
