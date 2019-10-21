<template>
	<!-- <div>
		{{user}}
		<div v-if="user.emailVerified">Email Verified</div>
		<div v-else>Email not Verified</div>
	</div> -->
	<v-app class="content">
		<Header />
		<v-content v-if="user.emailVerified">
			<v-card flat>
				<v-tabs
					v-model="tab"

					centered
					center-active
				>
					<v-tabs-slider></v-tabs-slider>

					<v-tab v-for="tabItem in tabItems" :key="tabItem" :href="tabItem.to" class="tab-items-title">
						{{ tabItem.text }}
					</v-tab>

				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item
						v-for="i in 3"
						:key="i"
						:value="'tab-' + i"
					>
						<v-container>
							<v-card flat>
								<v-card-text>
									<div v-if="i==1"><Featured /></div>
									<div v-if="i==2"><Chats /></div>
									<div v-if="i==3"><Connections /></div>
								</v-card-text>
							</v-card>
						</v-container>
					</v-tab-item>
				</v-tabs-items>
			</v-card>

		</v-content>
	</v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
			tabItems: [
				{ text: 'Featured' , to: '#tab-1'},
				{ text: 'Chats' , to: '#tab-2'},
				{ text: 'Connections' , to: '#tab-3'}
			],
			tab: null
		}
	},
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		...mapGetters('user',['isAuthenticated'])
	},
	methods: {

	},
	mounted() {
		// if(this.isAuthenticated===false)
		// {
		// 	this.$router.replace('/')
		// }
	}
}
</script>

<style scoped>
.tab-items-title
{
	font-size: 20px;
	padding-left: 5%;
	padding-right: 5%;
}
</style>>

