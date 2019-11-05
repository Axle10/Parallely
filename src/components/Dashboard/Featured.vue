<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12" md="3" v-for="(featuredFriend,index) in featuredFriends" :key="featuredFriend.uid">
				<!-- {{ loadMessage(featuredFriend.uid,index) }} -->
				<v-card outlined tile class="featured-chat-card" height="400px" fixed>
					<!-- {{ messages[index] }} -->
					<v-card-title >
						<v-avatar><img :src="featuredFriend.photoURL"></v-avatar>
						<v-spacer />
						<span>{{ featuredFriend.name }}</span>
					</v-card-title>
					<v-card-text >

						<div v-for="message in messages[index]" :key="message">
							<!-- <span v-for="msg in message" :key="msg.text">{{ msg.text }}</span> -->
							<v-row v-for="msg in message" :key="msg.timestamp">
								<v-col v-if="msg.from == user.uid" cols="12">
									<div class="message-sent">{{ msg.text }}</div>
								</v-col>
								<v-col v-if="msg.from != user.uid" cols="12">
									<div class="message-received">{{ msg.text }}</div>
								</v-col>
							</v-row>
						</div>

					</v-card-text>
					<v-card-actions class="message-form">
						<v-row no-gutters>
							<v-col cols="12" sm="12" md="12">
								<v-text-field outlined v-model="text" append-icon="send"
									class="message-form-textfield"
									placeholder="Type a message"
									@click:append="sendMessage(selectedContactId) "/>
							</v-col>
						</v-row>

					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import firebase from 'firebase'
export default {
	name: 'Featured',
	props: {
		drawer: {
			type: Boolean,
			required: false
		}
	},
	data () {
		return {
			selectedContactId: '',
			messages: [],
			text: ''
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user,
			friends: state => state.chat.friends,
			featuredFriends: state => state.chat.featuredFriends
		})
	},
	methods: {
		...mapActions('chat',['getAllFeaturedFriends','getFriendPic','getFriendName']),
		async initialize() {
			this.getAllFeaturedFriends().then(() => {
				console.log(this.featuredFriends)
				console.log(this.featuredFriends.length)
				for(var i=0;i<this.featuredFriends.length;i++)
				{
					console.log(this.featuredFriends[i])
					// this.loadMessage(featuredFriends[i].uid,i)
				}
			})
		},
		loadMessage(uid,index) {
			this.selectedContactId = uid
			var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
			var msgRef = userRef.collection('messages').doc(uid)

			msgRef.onSnapshot((doc) => {
				this.messages[index] = new Array()
				this.messages[index].push(doc.data().messages)
			})
			console.log(this.messages)
		},
		sendMessage(uid) {
			var userRef1 = firebase.firestore().collection('users').doc(this.user.uid)
			var messageRef1 = userRef1.collection('messages').doc(uid)
			var newMessage = {
				from: this.user.uid,
				to: uid,
				text: this.text,
				timestamp: Date.now()
			}
			messageRef1.get().then((snapshot) => {
				if(snapshot.exists)
				{
					var messages = snapshot.data().messages
					messages.push(newMessage)
					messageRef1.update({ messages: messages})
				}
				else
				{
					messageRef1.set({
						messages: [
							newMessage
						]
					})
				}
			})

			var userRef2 = firebase.firestore().collection('users').doc(uid)
			var messageRef2 = userRef2.collection('messages').doc(this.user.uid)

			messageRef2.get().then((snapshot) => {
				if(snapshot.exists)
				{
					var messages = snapshot.data().messages
					messages.push(newMessage)
					messageRef2.update({ messages: messages})
				}
				else
				{
					messageRef2.set({
						messages: [
							newMessage
						]
					})
				}
			})
			this.text = ''
		}
	},
	mounted () {
		this.initialize()
	}
}
</script>

<style scoped>
.featured-chat-card
{
	border-radius: 20px;
}
.message-form
{
	bottom: -10%;
	position: absolute;
}
.message-form-textfield
{
	border-radius: 20px;
	margin-bottom: 10px;
}
.message-sent
{
	float: right;
	background-color: #9999ff;
	width: 60%;
	min-height: 20px;
	border-radius: 20px;
}
.message-received
{
	float: left;
	background-color: grey;
	width: 60%;
	min-height: 20px;
	border-radius: 20px;
}
</style>
