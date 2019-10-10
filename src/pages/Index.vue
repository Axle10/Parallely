<template>
	<div>
		<v-row no-gutters>
			<v-col cols="10" sm="10" md="4" offset-md="1" class="component-login">
				<v-container>
					<LoginForm />
					<v-dialog v-model="signUpDialog" persisitent max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn flat dark v-on="on">Sign Up</v-btn>
						</template>
						<v-card>
							<v-card-text><SignupForm /></v-card-text>
						</v-card>
					</v-dialog>
				</v-container>
			</v-col>
			<v-col cols="0" sm="0" md="5" offset-md="1" class="hidden-sm-And-Down">
				<Banner />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import Banner from '@/components/Banner'
export default {
	name: 'Home',
	components: {
		LoginForm,SignupForm,Banner
	},
	data() {
		return {
			signUpDialog: ''
		}
	}
}
</script>

<style scoped>
.component-login
{
	margin-top: 10%;
}
</style>
