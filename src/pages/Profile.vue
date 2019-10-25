<template>
	<v-app>
		<!-- Profile page<br>
		{{user}}
		<div v-if="user.emailVerified">Email Verified</div>
		<div v-else>Email not Verified</div> -->
		<Header />
		<v-content>
			<v-row no-gutters>
				<v-col cols="12" sm="12" md="4">
					<Details />
				</v-col>
				<v-col cols="12" sm="12" md="8" >
					<editprofile />
				</v-col>
			</v-row>
		</v-content>
	</v-app>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import Header from '@/components/Header'
import editprofile from '@/components/Profile/editprofile'
import Details from '@/components/Profile/Details'
export default {
	name: 'Profile',
	components: {
		Header,editprofile,Details
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
