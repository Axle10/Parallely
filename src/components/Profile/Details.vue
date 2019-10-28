<template>
<div>
	<v-container>
	<v-card rounded class="details-card-outer">
    <v-container>
		<img :src="user.photoURL" class="image">
		<br>
		<br>
		<h2>{{ user.displayName }}</h2>

		<h3>{{ user.email }}</h3>
		<br>
		<v-dialog v-model="pictureChangeDialog" persistent max-width="700px">
			<template v-slot:activator="{ on }">
				<v-btn rounded v-on="on">Change Picture</v-btn>
			</template>
			<v-card>
				<v-toolbar dark>
					<v-toolbar-title>Add Picture</v-toolbar-title>
				</v-toolbar>
				<v-form method="post" @submit.prevent="updateProfilePic">
					<v-container>
						<v-row>
							<v-col cols="12" sm="12" md="6">
								<input type="file" accept="image/*" ref="fileInput" @change="onFilePicked">
							</v-col>
							<v-col cols="12" sm="12" md="6">
								<v-btn type="submit" rounded>Submit</v-btn>
								<v-btn rounded @click.prevent="closePictureChangeDialog()">Cancel</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-form>
				<div v-if="imageUrl!=''">
					<img :src="imageUrl" width="100%" height="100%">
				</div>
			</v-card>
		</v-dialog>
    </v-container>
	</v-card>
	</v-container>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'
export default {
	name: 'Details',
	data() {
		return {
			pictureChangeDialog: false,
			imageUrl: '',
			imageFile: null
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		})
	},
	methods: {
		...mapActions('user',['callSetUser']),
		closePictureChangeDialog() {
			this.pictureChangeDialog = false
			this.imageUrl = ''
			this.imageFile = null
		},
		onFilePicked(event){
			const files=event.target.files
			let filename=files[0].name;
			if (filename.lastIndexOf('.')<=0)
			{
				return alert('please add a valid file')
			}
			const fileReader=new FileReader()
			fileReader.addEventListener ('load',() => {
				this.imageUrl=fileReader.result
			})
			fileReader.readAsDataURL(files[0])
			this.imageFile=event.target.files[0]
		},
		updateProfilePic() {
			var storageRef = firebase.storage().ref();
			var userId = this.user.uid
			var today = new Date()
			var fileName = today.getFullYear()+today.getMonth()+today.getDate()+'_'+ today.getHours()+today.getMinutes()
			var ref = storageRef.child(`/${userId}/${fileName}`)
			var user={photoURL : `https://firebasestorage.googleapis.com/v0/b/parallely-652a6.appspot.com/o/${userId}%2F${fileName}?alt=media`}
			ref.put(this.imageFile)
				.then((snapshot) => console.log(snapshot) )
				.catch((err) => console.log(err));
			firebase.auth().currentUser.updateProfile({
				photoURL: user.photoURL
			}).then(() => {})
			.catch((err) => console.log(err));
			var firestore = firebase.firestore();
			var userDocRef = firestore.doc(`users/${firebase.auth().currentUser.uid}`)
			userDocRef.get().then((doc) => {
				userDocRef.update(user)
			})
			// this.callSetUser(user)
			this.pictureChangeDialog =false
		}
	}
}
</script>

<style scoped>
.details-card-outer
{
	height: auto;
	border-radius: 5%;
}
 .image
{
    width:250px;
    height:250px;
    border-radius:50%;
    margin-top:5%;
}
.file-input
{
	width: 250px;
}
</style>
