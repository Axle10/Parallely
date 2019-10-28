<template>
<div>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12" md="6" offset-md="3">
				<v-form>
					<v-text-field label="Search user" outlined rounded color="primary"
						v-model="username"
						append-icon="search"
						@click:append="searchUser"
					></v-text-field>
				</v-form>
			</v-col>
		</v-row>
		<div v-if="searchedUsers.length!=0">
			<v-row>
				<v-col cols="12" sm="12" md="3" v-for="searchedUser in searchedUsers" :key="searchedUser.uid">
					<v-card tile outlined class="users-card">
						<v-card-text>
							<center>
								<v-img  :src="searchedUser.photoURL" class="user-image"></v-img>
							</center>
							<br>
							<h2>{{ searchedUser.name}}</h2>
							<h3>{{ searchedUser.email }}</h3>
							<br>

							<!-- Message button -->
							<v-btn v-if="checkConnection(searchedUser)">Message</v-btn>

							<!-- Connect button -->
							<v-btn v-else rounded @click.prevent="connectUser(searchedUser.uid)">Connect</v-btn>

						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>

		<div v-else>
			<v-row>
				<v-col cols="12" sm="12" md="3" v-for="connectedUser in connectedUsers" :key="connectedUser.uid">
					<v-card tile outlined class="users-card">
						<v-card-text>
							<center>
								<v-img  :src="connectedUser.photoURL" class="user-image"></v-img>
							</center>
							<br>
							<h2>{{ connectedUser.name}}</h2>
							<h3>{{ connectedUser.email }}</h3>
							<br>

							<!-- Message button -->
							<v-btn rounded>Message</v-btn>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-container>
</div>
</template>

<script>
import firebase from 'firebase'
import { FireSQL } from 'firesql'
// import * as admin from 'firebase-admin'
export default {
	data() {
		return {
			username: '',
			searchedUsers: [],
			connectedUsers: []
		}
	},
	mounted(){
		var usersRef = firebase.firestore().collection('users')
		usersRef.doc(`${firebase.auth().currentUser.uid}`).get()
		.then((doc) => {
			doc.data().connections.forEach((connection) => {
				usersRef.doc(`${connection}`).get().then((result) => {
					this.connectedUsers.push(result.data())
				})
			})
		})
	},
	methods: {
		checkConnection(searchedUser) {
			if(this.connectedUsers.filter((connectedUser) => {
				return connectedUser.uid == searchedUser.uid
			}).length==0)
			{
				return true
			}
			else
			{
				return false
			}
		},
		searchUser() {
			var usersRef = firebase.firestore().collection('users')
			this.searchedUsers = new Array()
			if(this.username.includes('@'))
			{
				// Searching by email
				usersRef.where("email","==",this.username).get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						this.searchedUsers.push(doc.data())
					})
				})
			}
			else
			{
				// Searching by display name
				usersRef.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						if(doc.data().name!=null)
						{
							if(doc.data().name.toLowerCase().includes(this.username))
							{
								this.searchedUsers.push(doc.data())
							}
						}
					})
				})
			}
		},
		connectUser(uid) {
			var user1Ref = firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}`)
			var user2Ref = firebase.firestore().doc(`users/${uid}`)
			user1Ref.get().then((doc) => {
				var newConnections = doc.data().connections
				newConnections.push(uid)
				user1Ref.update({ connections: newConnections})
			})
			user2Ref.get().then((doc) => {
				var newConnections = doc.data().connections
				newConnections.push(firebase.auth().currentUser.uid)
				user2Ref.update({ connections: newConnections})
			})
		}
	}
}
</script>

<style scoped>
.users-card
{
	border-radius: 20px;
}
.user-image
{
	width:100px;
	height: 100px;
	border-radius: 50%;
}
</style>
