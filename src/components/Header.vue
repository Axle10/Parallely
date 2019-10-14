<template>
	<div>
		<v-app-bar app elevate-on-scroll color="deep-purple accent-4" dark>
			<v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>

			<v-toolbar-title>P A R A L L E L Y</v-toolbar-title>
			<v-row no-gutters>
				<v-col md="8" offset-md="1">
					<v-container>
						<v-form method="post" @submit.prevent="searchUser">
							<v-text-field
								append-icon="search"
								placeholder="Search an user"
								hide-details
								outlined
								class="hidden-sm-and-down"
							/>
							<!-- <v-btn inline icon><v-icon>search</v-icon></v-btn> -->
						</v-form>
					</v-container>
				</v-col>
			</v-row>
			<div class="user">
				<v-menu bottom offset-y>
					<template v-slot:activator="{ on }">
						<v-btn v-on="on" text class="user-btn">
							<v-icon v-if="user.photoURL==''">person</v-icon>
							<div v-if="user.photoURL!='' && user.photoURL != null" ><v-img :src="user.photoURL"></v-img></div>
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
				{ title: 'Logout', }
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
			console.log(this.user)
			console.log(firebase.auth().currentUser)
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
.user
{
	margin-right: 10%;
}
.user-btn:hover
{
	background-color: transparent;
	box-shadow: none;
}
</style>
