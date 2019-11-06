<template>
	<v-container v-on:onload="initialize">
		<v-row>
			<v-col cols="12" sm="12" md="3" v-for="(featuredFriend,index) in featuredFriends" :key="featuredFriend.uid">
				<v-card outlined tile class="featured-chat-card" height="400px" fixed>
					<v-card-title >
						<v-avatar><img :src="featuredFriend.photoURL"></v-avatar>
						<v-spacer />
						<span>{{ featuredFriend.name }}</span>
					</v-card-title>
					<v-card-text >
						<!-- {{ getFeaturedMessages }} -->

						<v-row v-for="msg in getFeaturedMessages[index]" :key="msg">
							<v-col v-if="msg.from == user.uid" cols="12">
								<div class="message-sent">{{ msg.text }}</div>
							</v-col>
							<v-col v-if="msg.from != user.uid" cols="12">
								<div class="message-received">{{ msg.text }}</div>
							</v-col>
						</v-row>
					</v-card-text>
					<v-card-actions class="message-form">
						<v-row no-gutters>
							<v-col cols="12" sm="12" md="12">
								<v-text-field outlined v-model="text" append-icon="send"
									class="message-form-textfield"
									placeholder="Type a message"
									@click:append="sendMessage(featuredFriend.uid,index) "/>
							</v-col>
						</v-row>

					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
			text: '',
			test: []
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user,
			friends: state => state.chat.friends,
			featuredFriends: state => state.chat.featuredFriends,
			featuredMessages: state => state.chat.featuredMessages
		}),
		...mapGetters({
			getFeaturedMessages: "chat/getFeaturedMessages"
		})
	},
	watch: {
		featuredMessages: function() {
			console.log('updated')
			this.test = featuredMessages
		}
	},
	methods: {
		...mapActions('chat',['getAllFriends','getAllFeaturedFriends','getFriendPic','getFriendName','loadMessage']),
		initialize() {
			this.getAllFeaturedFriends();
			console.log(this.featuredMessages)
		},

		sendMessage(uid,index) {
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
			// this.loadMessage({ uid: uid,index: index })
			// msgRef.onSnapshot((doc) => {
			// 	this.messages[index] = new Array()
			// 	this.messages[index].push(doc.data().messages)
			// 	// commit('SET_FEATURED_MESSAGES',{index: payload.index,messages: doc.data().messages})
			// })
			this.text = ''
		}
	},
	created () {
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
