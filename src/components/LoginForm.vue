<template>
	<div class="login">
		<v-card flat>
			<v-card-title>Parallely</v-card-title>
			<v-card-text>
				<v-form ref="login" id="login" method="post" @submit.prevent="loginUser">
					<v-text-field type="email" label="Email" v-model="email" required></v-text-field>
					<v-text-field type="password" label="Password" v-model="password" required></v-text-field>
					<v-btn type="submit">Login</v-btn>
				</v-form>
				<span v-if="message!=''">{{ message }}</span>
			</v-card-text>
		</v-card>
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
			message: ''
		}
	},
	methods: {
		...mapActions('user',['callSetUser']),
		loginUser() {
			firebase.auth().signInWithEmailAndPassword(this.email,this.password)
			.then((result) => {
				this.callSetUser(firebase.auth().currentUser)
				this.$router.push('/dashboard')
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
	padding-bottom: 10%;
}
</style>
