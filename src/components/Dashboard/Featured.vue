<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="12" md="3" v-for="i in 10" :key="i">
				<v-card outlined tile class="featured-chat-card" height="300px" fixed>
					<v-card-text>


					</v-card-text>
					<v-card-actions class="message-form">
						<v-form method="post">
							<v-row no-gutters>
								<v-col cols="11">
									<v-text-field v-model="message"
										outlined placeholder="Type a message"
										class="message-form-textfield"
									/>
								</v-col>
								<v-col cols="1">
									<v-btn icon type="submit" class="message-form-btn">
										<v-icon></v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Featured'
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
}
.message-form-btn
{
	margin-top:50%;
	margin-left: 5px;
}
</style>
