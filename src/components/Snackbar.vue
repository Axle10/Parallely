<template>
	<v-snackbar
		v-model="snackbar"
		:timeout="timeout"
		top
		vertical
	>
		{{ message }}
		<v-btn
			color="pink"
			flat
			@click="snackbar = false"
		>
			Close
		</v-btn>
	</v-snackbar>

</template>

<script>
export default {
	props: {
		snackbar: {
			type: Boolean,
			required: true
		},
		message: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			timeout: 3000
		}
	}
}
</script>

<style>

</style>
