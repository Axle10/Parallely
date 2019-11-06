<template>
	<div>
		<v-app-bar app elevate-on-scroll class="toolbar" dark>
			<v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>

			<v-toolbar-title style="padding-top: 35px">
				<v-img src="/static/index_logo.png" height="150px" width="150px"></v-img>
			</v-toolbar-title>

			<v-spacer />
			<div class="user">
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on }">
						<v-btn v-on="on" text class="user-btn">
							<v-icon v-if="user.photoURL==''">mdi-account</v-icon>
							<div class="user-image">
								<div v-if="user.photoURL!='' && user.photoURL != null" ><v-img :src="user.photoURL" class="user-image"></v-img></div>
							</div>
							Welcome, <span> {{ user.displayName }} </span>
						</v-btn>
						<!-- <font-awesome-icon :icon="['fas', 'angle-down']"/> -->
					</template>
					<v-list>
						<v-list-item
							v-for="(item,index) in userItems"
							:key="index"
							:to="item.to!=null || item.to != undefined ? item.to : ''"
							@click="item.title=='Logout' ? logoutUser() : ''"
						>
							<v-list-item-title>{{ item.title }}</v-list-item-title>

						</v-list-item>
					</v-list>
				</v-menu>
			</div>

		</v-app-bar>

		<v-content v-if="user.emailVerified==false">
			<v-dialog v-model="emailNotVerifiedDialog" persistent max-width="600px">
				<v-card>
					<v-card-text>Verify your email to continue</v-card-text>
				</v-card>
			</v-dialog>
		</v-content>
	</div>
</template>

<script>
import { mapState, mapGetters,mapActions } from 'vuex'
import firebase from 'firebase'
export default {
	data() {
		return {
			emailNotVerifiedDialog: true,
			userItems: [
				{ title: 'Dashboard', to: '/dashboard'},
				{ title: 'Profile', to: '/profile'},
				{ title: 'Logout' }
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
		...mapActions('user',['callSetUser']),
		logoutUser() {
			firebase.auth().signOut()
			.then(() => {
				this.$router.replace('/')
			});
			this.callSetUser({})
		},
		searchUser() {
			console.log('Search user')
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
.toolbar
{
	background: linear-gradient(right,#c09fee,#650cc9)
	/* background-color: #650cc9; */
}
.user
{
	padding-bottom: 1%;
}
.user-btn:hover
{
	background-color: transparent;
	box-shadow: none;
}
.user-image
{
	margin-right: 5%;
	height: 50px;
	width: 50px;
}
.search-btn
{
	margin-top: 10%;
}
</style>
