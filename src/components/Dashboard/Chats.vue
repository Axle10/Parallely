<template>
<div>
	<v-container>
		<v-row class="hidden-sm-And-Down">
			<v-col md="4">
				<v-card
					width="256"
					class="mx-auto chat-card" flat
				>
					<v-navigation-drawer absolute permanent>
					<v-list
						dense
						nav
					>
						<v-list-item
							v-for="friend in friends"
							:key="friend.uid"
							@click.prevent="loadMessage(friend.uid)"
							:class="friend.uid == selectedContactId ? 'active-friend' : 'friend'"
						>
						<v-list-item-icon>
							<v-avatar><img :src="friend.photoURL"></v-avatar>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ friend.name }}</v-list-item-title>
						</v-list-item-content>
						</v-list-item>
					</v-list>
					</v-navigation-drawer>
				</v-card>
			</v-col>
			<v-col md="8" id="message-box">
				<v-card class="chat-card chat-history" flat id="chat-card">
					<v-card-text v-if="selectedContactId!=''">
						<v-row v-for="message in messages" :key="message.timestamp">
							<v-col v-if="message.from == user.uid" cols="12">
								<div class="message-sent">{{ message.text }}</div>
							</v-col>
							<v-col v-if="message.from != user.uid" cols="12">
								<div class="message-received">{{ message.text }}</div>
							</v-col>
						</v-row>
						<v-row class="message-form-textfield">
							<v-col md="12">
								<v-text-field outlined v-model="text" append-icon="send"
									placeholder="Type a message"
									color="#650cc9"
									@click:append="sendMessage(selectedContactId) "/>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
	name: 'Chats',
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
			friends: state => state.chat.friends
		}),
		...mapGetters('user', ['isAuthenticated'])
	},
	methods: {
		...mapActions('chat',['getAllFriends','getFriendPic','getFriendName']),
		initialize() {
			this.getAllFriends(this.user.uid)
		},
		loadMessage(uid) {
			this.selectedContactId = uid
			var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
			var msgRef = userRef.collection('messages').doc(uid)

			msgRef.onSnapshot((doc) => {
				this.messages = new Array()
				// this.messages.push(doc.data().messages)
				this.messages = doc.data().messages
			})
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
		this.initialize();
		var chatCard = document.getElementById('chat-card');
		var height = chatCard.scrollHeight;
		// chatCard.scrollTo = height;
		chatCard.scrollBy(0,height)
	}
}
</script>

<style scoped>
.chat-card
{
	height: 80vh;
	overflow-y: visible;
	background-color: #fef7ff;
	position: relative;
	overflow-y: scroll;
}
.chat-card::-webkit-scrollbar {
	color: red;
	position: absolute;
	bottom: 100;
}
.chat-history
{
	height: 65vh;
}
.active-friend
{
	background-color: #fef7ff;
}
.active-friend:hover
{
	background-color: #fce8ff;
}
.friend:hover
{
	background-color: #fce8ff;
}
.message-form
{
	padding-top: 35vh;
	/* width: 100%; */
	position: relative;
}
.message-form-textfield
{
	bottom: 30px;
	width: 50vw;
	position: fixed;
	border-radius: 20px;
}
.message-form-btn
{
	margin-top:50%;
	margin-left: 5px;
}
.message-sent
{
	float: right;
	background-color: #e8dbf7;
	width: 60%;
	min-height: 20px;
	border-radius: 20px;
	color: #320f5c;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 2px;
	padding-bottom: 2px;
}
.message-received
{
	float: left;
	background-color: #883cdf;
	width: 60%;
	min-height: 20px;
	border-radius: 20px;
	color: #e0e0e0;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 2px;
	padding-bottom: 2px;
}
</style>
