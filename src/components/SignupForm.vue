<template>
	<v-container>
		<v-form method="post" ref="signup" id="signup" @submit.prevent="signupUser">
			<v-text-field
				v-model="email" type="email" label="Email" placeholder="Enter your email"
				prepend-icon="email" autocomplete="off"
				required :rules="[rules.required,rules.emailValid]"
			></v-text-field>
			<v-text-field v-model="password" label="Password"
				placeholder="Enter your password"
				prepend-icon="lock"
				:append-icon="show ? 'visibility' : 'visibility_off'"
				:type="show ? 'text' : 'password'"
				hint="At least 8 characters"
				autocomplete="off"
				@click:append="show = !show"
				:rules="[rules.required,rules.min]"
				required

			></v-text-field>
			<v-text-field v-model="name" type="text" label="Name" placeholder="Enter your name"
				:rules="[rules.required]" prepend-icon="person"
			></v-text-field>
			<v-btn type="submit" rounded color="#650cc9" dark>Submit</v-btn>
			<v-btn rounded color="red" dark @click.prevent="$emit('closeDialog')">Cancel</v-btn>
		</v-form>
		<span v-if="message!=''">{{ message }}</span>
	</v-container>
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
	data() {
		return {
			email: '',
			password: '',
			name: '',
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
		...mapActions('user',['createUserInDb']),
		signupUser() {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
			.then((result) => {
				result.user.sendEmailVerification()
				.then(() => {})
				.catch((err) => console.log(err));
				this.createUserInDb({uid: result.user.uid, email: result.user.email, displayName: this.name, photoURL: ''});
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
