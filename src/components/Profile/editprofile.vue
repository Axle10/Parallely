<template>
    <div>
		<v-container>
			<v-card rounded class="editprofile-card-outer">
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
						<v-col cols="4" sm="4" md="4" offset-md="4" >
							<v-btn rounded v-if="editPhoneMode==false" @click.prevent="editPhoneMode=true">Edit</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded>Update</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded @click.prevent="editPhoneMode=false">Cancel</v-btn>
						</v-col>
					</v-row>
					<hr>
					<v-row>
						<v-col cols="8" sm="8" md="4">
							Phone Number:
							<span v-if="user.phoneNumber!=null && editPhoneMode==false">{{ user.phoneNumber }}</span>
							<span v-if="user.phoneNumber==null && editPhoneMode==false">No number given</span>
							<div v-if="editPhoneMode">
								<v-form method="post">
									<v-text-field v-model="phoneNumber" outlined
										:value="`${user.phoneNumber}`" class="edit-textfield">
									</v-text-field>
								</v-form>
							</div>
						</v-col>
						<v-col cols="4" sm="4" md="4" offset-md="4" >
							<v-btn rounded v-if="editPhoneMode==false" @click.prevent="editPhoneMode=true">Edit</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded>Update</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded @click.prevent="editPhoneMode=false">Cancel</v-btn>
						</v-col>
					</v-row>
					<hr>
					<v-row>
						<v-col cols="8" sm="8" md="4">
							Phone Number:
							<span v-if="user.phoneNumber!=null && editPhoneMode==false">{{ user.phoneNumber }}</span>
							<span v-if="user.phoneNumber==null && editPhoneMode==false">No number given</span>
							<div v-if="editPhoneMode">
								<v-form method="post">
									<v-text-field v-model="phoneNumber" outlined
										:value="`${user.phoneNumber}`" class="edit-textfield">
									</v-text-field>
								</v-form>
							</div>
						</v-col>
						<v-col cols="4" sm="4" md="4" offset-md="4" >
							<v-btn rounded v-if="editPhoneMode==false" @click.prevent="editPhoneMode=true">Edit</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded>Update</v-btn>
							<v-btn v-if="editPhoneMode==true" rounded @click.prevent="editPhoneMode=false">Cancel</v-btn>
						</v-col>
					</v-row>
					<hr>
				</v-container>
			</v-card>
		</v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'
export default {
	name: 'editProfile',
	data() {
		return {
			editPhoneMode: false,
			editNameMode: false,
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		})
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
	border-radius: 20%;
}
.editprofile-component
{
	height: 33%;
}
</style>
