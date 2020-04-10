<template>
	<v-app class="content" v-on:onload="getAllFeaturedFriends()">
		<v-content>

		<v-row no-gutters>
			<v-col md="2" v-if="drawer">
				<div class="side-menu-bar" >
					<!-- Photo and name of the user -->
					<v-row>
						<v-col md="12">
							<div v-if="user.photoURL!='' && user.photoURL!=null"><img :src="user.photoURL" class="image"></div>
							<div v-else><img src="../../static/user.jpg" class="image"></div>
							<h3>{{ user.displayName }}</h3>
						</v-col>
					</v-row>
					<v-row>
						<!-- Side menus -->
						<v-col cols="10">
							<div class="side-menu-items" v-for="menu in menus" :key="menu.id">
								<div @click="setActiveMenu(menu)">
									<div class="side-menu-icon">{{ menu.icon }}</div>
									<div class="side-menu-title">{{ menu.title }}</div>
								</div>
							</div>
						</v-col>
					</v-row>
					<div class="logout-menu">
						<v-btn @click="logoutUser()" class="logout-menu-button"><i></i>Logout</v-btn>
					</div>
				</div>
			</v-col>
			<v-col :md="drawer ? 10 : 12">
				<v-toolbar class="toolbar">
					<div class="hamburger-menu-icon" @click="toggleDrawer()">
					<v-icon>menu</v-icon>
				</div>
				</v-toolbar>

				<div v-if="menus[0].active==true">
					<Featured />
				</div>

				<div v-if="menus[1].active==true">
					<v-row no-gutters>
						<div class="chat-toolbar">
							<h4>Chats</h4>
						</div>
					</v-row>
					<Chats />
				</div>

				<div v-if="menus[2].active==true">
					<Connections />
				</div>

				<div v-if="menus[3].active==true">

				</div>
			</v-col>

		</v-row>
		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'
import Header from '@/components/Header'
import Featured from '@/components/Dashboard/Featured'
import Chats from '@/components/Dashboard/Chats'
import Connections from '@/components/Dashboard/Connections'
export default {
	name: 'Dashboard',
	components: {
		Header,Featured,Chats,Connections
	},
	data() {
		return {
			drawer: true,
			menus: [
				{
					id: 1,
					title: 'Featured',
					icon : '',
					active: false
				},
				{
					id: 2,
					title: 'Chats',
					icon: '',
					active: false
				},
				{
					id: 3,
					title: 'Connections',
					icon: '',
					active: false
				},
				{
					id: 4,
					title: 'Profile',
					icon: '',
					active: false
				}
			]
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		...mapGetters('user',['isAuthenticated'])
	},
	methods: {
		...mapActions('chat',['getAllFeaturedFriends']),
		...mapActions('user',['callSetUser']),

		toggleDrawer() {
			this.drawer = !this.drawer;

		},
		setActiveMenu(menu) {
			for(var i=0;i<this.menus.length;i++) {
				if(this.menus[i].id!=menu.id) {
					this.menus[i].active= false;
				}
				else {
					this.menus[i].active=true;
				}
			}
		},
		logoutUser() {
			firebase.auth().signOut()
			.then(() => {
				this.$router.replace('/')
			});
			this.callSetUser({})
		},
	},
	created() {
		// console.log(this.isAuthenticated);
		// if(this.isAuthenticated === 0)
		// {
		// 	this.$router.replace('/')
		// }
	}
}
</script>

<style scoped>
.toolbar
{
	height: 15vh;
}
.hamburger-menu-icon
{
	float: left;
	padding-left: 10px;
	margin-top: 5px;
	cursor: pointer;
}
.image
{
    width:100px;
    height:100px;
    border-radius:50%;
    margin-top:5%;
	border: 1px solid purple
}
.side-menu-bar
{
	height: 100vh;
	width: auto;
	background-color: #c09fee;
	text-align: center;
	align-items: center;
	justify-content: center;
}
.side-menu-items
{
	cursor: pointer;
	border-radius: 10px;
	transition: 0.2s ease-in;
	margin-left: 5px;
}
.side-menu-icon
{
	margin: 5px;
}
.side-menu-title
{
	margin: 5px;
	font-size: 20px;
	color: white;
}
.side-menu-items:hover {
	background-color: #5b1ca3;
	box-sizing: border-box;
	box-shadow: 0px 2px 0px 0px black;
}
.side-menu-items:hover .side-menu-title {
	transform: translateX(5px);
}
.logout-menu {
	background-color: transparent;
	cursor: pointer;
	text-transform: uppercase;
	position: absolute;
	bottom: 5%;
	left: 5%;
	display: flex;
	justify-content: center;
	align-self: center;
	align-items: center;
}
.logout-menu-button {
	border-radius: 10px 0 10px 10px;
	background-color: transparent !important;
	color: #555555;
	transition: 0.2s ease-out;
}
.logout-menu-button:hover {
	/* transform: translateZ(-10px); */
	transition: 0.2s ease-in;
	background-color: #5b1ca3 !important;
	color: white;
}
.chat-toolbar {
	height: 2vh;
}
.chat-toolbar > h4 {
	padding-left: 60px;
	color:#5b1ca3;
	letter-spacing: 2px;
	text-transform: uppercase;
	padding-top: 10px;
}
.tab-items-title
{
	font-size: 20px;
	padding-left: 5%;
	padding-right: 5%;
	color: #5b1ca3;
}
</style>


