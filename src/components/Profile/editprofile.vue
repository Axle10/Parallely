<template>
    <div>
		<v-container>
			<v-card rounded class="editprofile-card-outer" flat>
				<v-container>
					<v-row>
						<v-col cols="8" sm="8" md="4" class="editprofile-component">
							Phone Number:
							<div>
								<span v-if="user.phoneNumber!=null && editPhoneMode==false">{{ user.phoneNumber }}</span>
								<span v-if="user.phoneNumber==null && editPhoneMode==false">No number given</span>
							</div>
							<div v-if="editPhoneMode">
								<v-form method="post">
									<v-text-field v-model="phoneNumber" outlined
										:value="`${user.phoneNumber}`" class="edit-textfield">
									</v-text-field>
								</v-form>
							</div>
						</v-col>
						<v-col cols="4" sm="4" md="4" offset-md="4" class="editprofile-component">
							<v-btn rounded v-if="editPhoneMode==false" @click.prevent="editPhoneMode=true">Edit</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded @click.prevent="updatePhoneNumber">Update</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded @click.prevent="editPhoneMode=false">Cancel</v-btn>
						</v-col>
					</v-row>
					<hr>
					<v-row>
						<v-col cols="8" sm="8" md="4" class="editprofile-component">
							Name:
							<div>
								<span v-if="user.displayName!=null && editNameMode==false">{{ user.displayName }}</span>
								<span v-if="user.displayName==null && editNameMode==false">No name given</span>
							</div>
							<div v-if="editNameMode">
								<v-form method="post">
									<v-text-field v-model="name" outlined
										:value="`${user.displayName}`" class="edit-textfield">
									</v-text-field>
								</v-form>
							</div>
						</v-col>
						<v-col cols="4" sm="4" md="4" offset-md="4" >
							<v-btn rounded v-if="editNameMode==false" @click.prevent="editNameMode=true">Edit</v-btn>
							<v-btn v-if="editNameMode==true" rounded @click.prevent="updateName">Update</v-btn>
							<v-btn v-if="editNameMode==true" rounded @click.prevent="editNameMode=false">Cancel</v-btn>
						</v-col>
					</v-row>
					<hr>
					<v-row>
						<v-col cols="8" sm="8" md="4">
							Update Password:
						</v-col>
						<v-col cols="4" sm="4" md="4" offset-md="4" >
							<v-dialog v-model="passwordDialog" persistent max-width="600px">
								<template v-slot:activator="{ on }">
									<v-btn rounded v-on="on" >Edit</v-btn>
								</template>
								<v-card>
									<v-container>
									<v-form method="post" @submit.prevent="updatePassword()">
										<v-text-field v-model="password" label="New Password"
											placeholder="Enter your new password"
											prepend-icon="lock"
											:append-icon="show1 ? 'visibility' : 'visibility_off'"
											:type="show1 ? 'text' : 'password'"
											hint="At least 8 characters"
											autocomplete="off"
											@click:append="show1 = !show1"
											:rules="[rules.required,rules.min]"
											required
										></v-text-field>

										<v-text-field v-model="cnfpassword" label="Confirm Password"
											placeholder="Confirm your new password"
											prepend-icon="lock"
											:append-icon="show2 ? 'visibility' : 'visibility_off'"
											:type="show2 ? 'text' : 'password'"
											hint="At least 8 characters"
											autocomplete="off"
											@click:append="show2 = !show2"
											:rules="[rules.required,rules.min]"
											required
										></v-text-field>
										<br>
										<v-btn type="submit" :disabled="disableButton" outlined rounded color="#650cc9">Submit</v-btn>
										<v-btn color="red" rounded dark @click.prevent="passwordDialog=false">Cancel</v-btn>
									</v-form>
									</v-container>
								</v-card>
							</v-dialog>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'editProfile',
	data() {
		return {
			editPhoneMode: false,
			editNameMode: false,
			passwordDialog: false,
			show1: false,
			show2: false,
			name: '',
			phoneNumber: '',
			rules: {
				required: v => !!v || 'Required.',
				min: v => v.length >= 8 || 'Min 8 characters',
				emailValid : v=> /.+@.+/.test(v) || 'E-mail must be valid'
			},
			password: '',
			cnfpassword: ''
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		disableButton () {
			return this.password == this.cnfpassword && this.password!='' ? false : true
		}
	},
	methods: {
		...mapActions('user',['callSetPhonenumber','callSetName']),
		updatePhoneNumber() {
			// console.log(firebase.auth().currentUser)
			firebase.auth().currentUser.updateProfile({
				phoneNumber: this.phoneNumber
			}).then(() => {
				this.editPhoneMode=false
				this.callSetPhonenumber(this.phoneNumber)
			}).catch((err) => console.log(err))
		},
		updateName() {
			firebase.auth().currentUser.updateProfile({
				displayName: this.name
			}).then(() => {
				this.editNameMode = false;
				this.callSetName(this.name)
			});

		},
		updateBio() {

		},
		updatePassword() {
			firebase.auth().currentUser.updatePassword(this.password)
			.then(() => {
				this.passwordDialog = false
			})
			.catch((err) => console.log(err))
		}
	}
}
</script>

<style scoped>
.editprofile-card-outer
{
	border-radius: 5%;
}
.edit-textfield
{
	/* border-radius: 20%; */
	/* padding-top: 20%; */
	width: 500px;
}
.editprofile-component
{
	height: 200px;
}
</style>
