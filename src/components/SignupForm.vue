<template>
	<div>
		<v-form method="post" ref="signup" id="signup" @submit.prevent="signupUser">
			<v-text-field v-model="email" type="email" label="Email" placeholder="Enter your email"></v-text-field>
			<v-text-field v-model="password" type="password" label="Password" placeholder="Enter your password"></v-text-field>
			<v-text-field v-model="name" type="text" label="Name" placeholder="Enter your name"></v-text-field>
			<v-btn type="submit">Submit</v-btn>
		</v-form>
		<span v-if="message!=''">{{ message }}</span>
	</div>
</template>

<script>
import firebase from 'firebase'
export default {
	data() {
		return {
			email: '',
			password: '',
			name: '',
			message: ''
		}
	},
	methods: {
		signupUser() {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
			.then((result) => {
				result.user.sendEmailVerification()
				.then(() => {})
				.catch((err) => console.log(err));
				result.user.updateProfile({
					displayName: this.name
				})
				.then(() => {
					this.$emit('success','Successfully registered')
				})
				.catch((err) => console.log(err))
			})
			.catch((err) => {
				this.message = err.message
				console.log(err)
			})
		}
	}
}
</script>

<style>

</style>
