<template>
	<div class="login">
		<v-card flat>
			<v-card-title>Parallely</v-card-title>
			<v-card-text>
				<v-form ref="login" id="login" method="post">
					<v-text-field type="email" label="Email" v-model="email" required></v-text-field>
					<v-text-field type="password" label="Password" v-model="password" required></v-text-field>
					<v-btn type="submit">Submit</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'Login'
}
</script>

<style scoped>
.login
{
	padding-bottom: 10%;
}
</style>
