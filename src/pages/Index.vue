<template>
	<div>
		<v-row no-gutters>
			<v-col cols="10" sm="10" md="4" offset-md="1" class="component-login">
				<v-container>
					<LoginForm />
					<v-dialog v-model="signUpDialog" persisitent max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn dark v-on="on">Sign Up</v-btn>
						</template>
						<v-card>
							<v-card-text><SignupForm @success="success"/></v-card-text>
						</v-card>
					</v-dialog>
				</v-container>
			</v-col>
			<v-col cols="0" sm="0" md="5" offset-md="1" :class="hideOnMobile ? 'hide-on-mobile' : ''">
				<div><Banner /></div>
			</v-col>
		</v-row>
		<div v-if="snackbar==true"><Snackbar :message="snackbar_message" :snackbar="snackbar" /></div>
	</div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import Banner from '@/components/Banner'
import Snackbar from '@/components/Snackbar'
export default {
	name: 'Home',
	components: {
		LoginForm,SignupForm,Banner,Snackbar
	},
	data() {
		return {
			signUpDialog: '',
			snackbar_message: '',
			snackbar: false
		}
	},
	computed: {
		hideOnMobile() {
			if(this.$vuetify.breakpoint.smAndDown)
			{
				return true
			}
			else
			{
				return false
			}
		}
	},
	methods: {
		success(message) {
			this.snackbar_message = message
			this.snackbar = true
			this.signUpDialog = false
		}
	}
}
</script>

<style scoped>
.component-login
{
	margin-top: 10%;
}
.hide-on-mobile
{
	/* visibility: hidden; */
	display: none;
}
</style>
