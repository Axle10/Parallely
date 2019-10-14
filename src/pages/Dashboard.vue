<template>
	<!-- <div>
		{{user}}
		<div v-if="user.emailVerified">Email Verified</div>
		<div v-else>Email not Verified</div>
	</div> -->
	<v-app class="content">
		<Header />
		<v-content v-if="user.emailVerified">
			<!-- <div v-if="user.emailVerified==false">Verify your email first to continue</div> -->
			<!-- <div v-else -->
			email Verified
			{{ user }}<br>

		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from 'firebase'
import Header from '@/components/Header'
export default {
	name: 'Dashboard',
	components: {
		Header
	},
	data() {
		return {
			test: ''
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		...mapGetters('user',['isAuthenticated'])
	},
	methods: {

	},
	mounted() {
		// if(this.isAuthenticated===false)
		// {
		// 	this.$router.replace('/')
		// }
	}
}
</script>

<style scoped>

</style>>

