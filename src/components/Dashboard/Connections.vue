<template>
<div class="connections-div">
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
							<v-spacer></v-spacer>

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
							<v-btn rounded @click.prevent="messageUser(connectedUser.uid)">Message</v-btn><br><br>

							<!-- Add to featured button -->
							<v-btn  rounded @click.prevent="toggleFeatured(connectedUser.uid)">Add to Featured</v-btn>

							<!-- Unfeature button -->
							<!-- <v-btn v-if="checkFeatured(connectedUser.uid)==true" rounded @click.prevent="toggleFeatured(connectedUser.uid)">Unfeature</v-btn> -->

						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-container>
</div>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import firebase from 'firebase'
// import { FireSQL } from 'firesql'
import { mapActions } from 'vuex'
// import { connect } from 'http2';
// import * as admin from 'firebase-admin'
export default {
	name: 'Connections',
	components: {
		MenuIcon
	},
	data() {
		return {
			username: '',
			searchedUsers: [],
			connectedUsers: []
		}
	},
	mounted(){
		this.initialize()
	},
	methods: {
		...mapActions('chat',['toggleFeatured','checkFeatured']),
		initialize() {
			// this.connectedUsers = new Array()
			var usersRef = firebase.firestore().collection('users')
			usersRef.doc(`${firebase.auth().currentUser.uid}`).get()
			.then((doc) => {
				doc.data().connections.forEach((connection) => {
					console.log(connection.uid)
					usersRef.doc(`${connection.uid}`).get().then((result) => {
						console.log(result.data())
						this.connectedUsers.push(result.data())
						console.log(this.connectedUsers)
					})
				})
			})
		},
		checkConnection(searchedUser) {
			if(this.connectedUsers.filter((connectedUser) => {
				return connectedUser.uid == searchedUser.uid
			}).length==0)
			{
				return false
			}
			else
			{
				return true
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
				newConnections.push({uid: uid, featured: false, message: false })
				user1Ref.update({ connections: newConnections})
			})
			user2Ref.get().then((doc) => {
				var newConnections = doc.data().connections
				newConnections.push({ uid: firebase.auth().currentUser.uid, featured: false, message: false})
				user2Ref.update({ connections: newConnections})
			})
			this.initialize()
			this.searchedUsers = new Array()
			// this.connectedUsers.push(newConnections)
			this.username = ''
		},
		messageUser(uid) {
			var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
			userRef.get().then((doc) => {
				var updatedConnection = doc.data().connections.map( (connection) => {
					return {
						featured: connection.featured,
						message: connection.uid == uid ?  true : connection.message,
						uid: connection.uid
					}
				});

				userRef.update({
					bio: doc.data().bio,
					email: doc.data().email,
					photoURL: doc.data().photoURL,
					uid: doc.data().uid,
					connections: updatedConnection
				})
			})
		}
	}
}
</script>

<style scoped>
.connections-div {
	height: 85vh;
	overflow-y: visible;
	position: relative;
	background-color: #fef7ff;

	overflow-y: scroll;
}

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
