<template>
	<div :class="$vuetify.breakpoint.smAndDown ? 'login' : ''">
		<!-- <v-card flat>
			<v-card-text> -->
				<v-form ref="login" id="login" method="post" @submit.prevent="loginUser">
					<v-text-field
						prepend-icon="person" placeholder=" " autocomplete="off"
						type="email" label="Email" v-model="email" required
						:rules="[rules.required,rules.emailValid]"
					></v-text-field>
					<v-text-field
						prepend-icon="lock"
						placeholder=" "
						:append-icon="show ? 'visibility' : 'visibility_off'"
						:type="show ? 'text' : 'password'"
						hint="At least 8 characters"
						autocomplete="off"
						@click:append="show = !show"
						:rules="[rules.required,rules.min]"
						label="Password" v-model="password" required>
					</v-text-field>
					<span v-if="message!=''" color="red">{{ message }}</span><br>
					<v-btn type="submit" rounded color="#650cc9"
						 form="login" dark>Login</v-btn>
				</v-form><br>
				<v-btn color="blue" class="white--text" rounded @click.prevent="loginUserWithFacebook">
					Login with Facebook<v-icon right>mdi-facebook</v-icon>
				</v-btn><br><br>

				<v-btn color="red" class="white--text" rounded @click.prevent="loginUserWithGoogle">
					Login With Google<v-icon right>mdi-google</v-icon>
				</v-btn>
			<!-- </v-card-text>
		</v-card> -->
	</div>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
			message: '',
			show: false,
			rules: {
				required: v => !!v || 'Required.',
				min: v => v.length >= 8 || 'Min 8 characters',
				emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
			},
		}
	},
	methods: {
		...mapActions('user',['callSetUser','checkUserExistence']),
		loginUser() {
			firebase.auth().signInWithEmailAndPassword(this.email,this.password)
			.then((result) => {
				this.callSetUser(result.user)
				this.$router.push('/dashboard')
			})
			.catch((err) => {
				this.message = err.message
			})
		},
		loginUserWithGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithPopup(provider)
			.then((result) => {
				this.callSetUser(firebase.auth().currentUser)
				this.checkUserExistence(firebase.auth().currentUser)
				this.$router.push('/dashboard')
			})
			.catch((err) => {
				this.message = err.message
			})
		},
		loginUserWithFacebook() {
			const provider = new firebase.auth.FacebookAuthProvider()
			provider.addScope('user_birthday')
			firebase.auth().signInWithPopup(provider)
			.then((result) => {
				result.user.updateProfile({
					emailVerified: true
				})
				.then(() => {
					this.callSetUser(firebase.auth().currentUser)
					this.checkUserExistence(firebase.auth().currentUser)
					this.$router.push('/dashboard')
				})
				.catch((err) => console.log(err))
			})
			.catch((err) => {
				this.message = err.message
			})
		}
	}
}
</script>

<style scoped>
.login
{
	margin-top: 20%;
}
.login-btn
{
	background-color: purple;
}
</style>
