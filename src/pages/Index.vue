<template>
	<v-app >
		<v-container>
		<v-row no-gutters>
			<v-col cols="12" sm="12" md="4" offset-md="1" class="component-login">
				<div class="particles-js">
					<vue-particles
						color="#c09fee"
						:particleOpacity="0.7"
						:particlesNumber="80"
						shapeType="circle"
						:particleSize="4"
						linesColor="#c09fee"
						:linesWidth="1"
						:lineLinked="true"
						:lineOpacity="0.4"
						:linesDistance="150"
						:moveSpeed="3"
						:hoverEffect="true"
						hoverMode="grab"
						:clickEffect="true"
						clickMode="push"
					>
					</vue-particles>
				</div>
				<v-container>
					<LoginForm /><br>
					Don't have an account,
					<v-dialog v-model="signUpDialog" persistent max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn v-on="on" text color="#650cc9">Sign Up</v-btn>
						</template>
						<v-card>
							<v-card-text><SignupForm @success="success" @closeDialog="signUpDialog=false"/></v-card-text>
						</v-card>
					</v-dialog>
				</v-container>
			</v-col>
			<v-col cols="0" sm="0" md="7" :class="hideOnMobile ? 'logo-hide-on-mobile' : 'logo'">
				<Banner />
			</v-col>
		</v-row>
		<div v-if="snackbar==true"><Snackbar :message="snackbar_message" :snackbar="snackbar" /></div>
		</v-container>
	</v-app>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import Banner from '@/components/Banner'
import Snackbar from '@/components/Snackbar'
import { mapGetters } from 'vuex'
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
		...mapGetters('user',['isAuthenticated']),
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
	},
	created() {
		// console.log(this.isAuthenticated)
		// if(this.isAuthenticated==true)
		// {
		// 	this.$router.replace('/dashboard')
		// }
	}
}
</script>

<style scoped>
.particles-js
{
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.logo
{
	/* bottom: 50%; */
	/* right: 10%; */
	/* padding-bottom: 2px;
	padding-right: 20%;
	margin-right: 5%;
	width: 100%;
	height: 100%; */
}
.component-login
{
	margin-top: 10%;
}
.logo-hide-on-mobile
{
	display: none;
}
</style>
